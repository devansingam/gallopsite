from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import os
import logging
from typing import Optional
import uuid
from datetime import datetime

# Simple in-memory email service for Vercel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class DemoRequestCreate(BaseModel):
    fullName: str
    workEmail: EmailStr
    companyName: str
    industry: str
    outletCount: Optional[str] = None
    phone: Optional[str] = None
    preferredTime: Optional[str] = None
    message: Optional[str] = None
    consent: bool

class DemoRequestResponse(BaseModel):
    success: bool
    message: str
    requestId: str

# Simple email function
def send_email(data: dict, request_id: str):
    try:
        smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
        smtp_port = int(os.environ.get('SMTP_PORT', 587))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        smtp_from = os.environ.get('SMTP_FROM')
        demo_email = os.environ.get('DEMO_REQUEST_EMAIL', 'dev@gallop.my')
        
        if not all([smtp_user, smtp_password]):
            logging.warning("SMTP credentials not configured")
            return False
        
        subject = f"New Demo Request - {data.get('companyName', 'Unknown')}"
        
        body = f"""
New Demo Request from Gallop Website
=====================================

Contact Information:
-------------------
Name: {data.get('fullName', 'N/A')}
Email: {data.get('workEmail', 'N/A')}
Company: {data.get('companyName', 'N/A')}
Industry: {data.get('industry', 'N/A')}
Outlets: {data.get('outletCount', 'Not specified')}
Phone: {data.get('phone', 'Not provided')}
Preferred Contact Time: {data.get('preferredTime', 'Not specified')}

Message:
--------
{data.get('message', 'No message provided')}

---
Submitted on: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}
Request ID: {request_id}
"""
        
        msg = MIMEMultipart()
        msg['Subject'] = subject
        msg['From'] = smtp_from
        msg['To'] = demo_email
        msg.attach(MIMEText(body, 'plain'))
        
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        logging.info(f"Email sent successfully to {demo_email}")
        return True
        
    except Exception as e:
        logging.error(f"Email failed: {str(e)}")
        return False

# Simple Google Sheets function
def add_to_sheets(data: dict, request_id: str):
    try:
        import gspread
        from oauth2client.service_account import ServiceAccountCredentials
        import json
        
        creds_json = os.environ.get('GOOGLE_SHEETS_CREDENTIALS')
        if not creds_json:
            logging.warning("Google Sheets not configured")
            return False
        
        creds_dict = json.loads(creds_json)
        scope = [
            'https://spreadsheets.google.com/feeds',
            'https://www.googleapis.com/auth/drive'
        ]
        
        credentials = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
        client = gspread.authorize(credentials)
        
        sheet_name = os.environ.get('GOOGLE_SHEET_NAME', 'Gallop Demo Leads')
        try:
            spreadsheet = client.open(sheet_name)
            sheet = spreadsheet.sheet1
        except:
            spreadsheet = client.create(sheet_name)
            sheet = spreadsheet.sheet1
            sheet.append_row([
                'Timestamp', 'Full Name', 'Work Email', 'Company Name',
                'Industry', 'Number of Outlets', 'Phone', 'Preferred Contact Time',
                'Message', 'Request ID'
            ])
        
        timestamp = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')
        row = [
            timestamp,
            data.get('fullName', ''),
            data.get('workEmail', ''),
            data.get('companyName', ''),
            data.get('industry', ''),
            data.get('outletCount', ''),
            data.get('phone', ''),
            data.get('preferredTime', ''),
            data.get('message', ''),
            request_id
        ]
        
        sheet.append_row(row)
        logging.info(f"Added to Google Sheets: {request_id}")
        return True
        
    except Exception as e:
        logging.error(f"Google Sheets failed: {str(e)}")
        return False

@app.get("/api")
async def root():
    return {"message": "Hello World"}

@app.post("/api/demo-request", response_model=DemoRequestResponse)
async def create_demo_request(demo_data: DemoRequestCreate, request: Request):
    try:
        if not demo_data.consent:
            raise HTTPException(status_code=400, detail="Consent is required")
        
        request_id = str(uuid.uuid4())
        
        # Try to save to Google Sheets
        try:
            add_to_sheets(demo_data.dict(), request_id)
        except Exception as e:
            logging.error(f"Sheets error: {e}")
        
        # Try to send email
        try:
            send_email(demo_data.dict(), request_id)
        except Exception as e:
            logging.error(f"Email error: {e}")
        
        return DemoRequestResponse(
            success=True,
            message="Demo request received! We'll get in touch soon.",
            requestId=request_id
        )
        
    except HTTPException as he:
        raise he
    except Exception as e:
        logging.error(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process demo request")

# Vercel serverless handler
handler = app
