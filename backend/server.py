from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

# Import demo request models and services
from models.demo_request import DemoRequest, DemoRequestCreate
from services.email_service import EmailService
from services.sheets_service import sheets_service


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Initialize email service after loading environment variables
email_service = EmailService()

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class DemoRequestResponse(BaseModel):
    success: bool
    message: str
    requestId: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/demo-request", response_model=DemoRequestResponse)
async def create_demo_request(demo_data: DemoRequestCreate, request: Request):
    """
    Handle demo request submissions
    - Validate input
    - Save to database
    - Send email notification
    """
    try:
        # Validate consent
        if not demo_data.consent:
            raise HTTPException(status_code=400, detail="Consent is required to submit demo request")
        
        # Create demo request object
        demo_request = DemoRequest(
            **demo_data.model_dump(),
            ipAddress=request.client.host if request.client else None
        )
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = demo_request.model_dump()
        doc['submittedAt'] = doc['submittedAt'].isoformat()
        if doc.get('emailSentAt'):
            doc['emailSentAt'] = doc['emailSentAt'].isoformat()
        
        # Save to database
        await db.demo_requests.insert_one(doc)
        
        # Send email notification
        try:
            await email_service.send_demo_request_email(
                demo_data.model_dump(),
                demo_request.requestId
            )
            
            # Update email sent status
            await db.demo_requests.update_one(
                {"requestId": demo_request.requestId},
                {"$set": {"emailSent": True, "emailSentAt": datetime.now(timezone.utc).isoformat()}}
            )
            
        except Exception as email_error:
            logging.error(f"Email sending failed: {str(email_error)}")
            # Don't fail the request if email fails, just log it
            # The data is still saved in database
        
        return DemoRequestResponse(
            success=True,
            message="Demo request received! We'll get in touch soon.",
            requestId=demo_request.requestId
        )
        
    except HTTPException as he:
        raise he
    except Exception as e:
        logging.error(f"Error processing demo request: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process demo request")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[
        "*",  # Allow all origins for development
        "https://*.vercel.app",  # Allow Vercel preview deployments
        "https://*.emergent.host",  # Allow Emergent production domain
        "https://gallop.my",  # Production domain
        "https://www.gallop.my"  # Production domain with www
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()