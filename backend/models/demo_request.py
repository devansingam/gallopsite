from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class DemoRequestCreate(BaseModel):
    fullName: str = Field(..., min_length=1, max_length=200)
    workEmail: EmailStr
    companyName: str = Field(..., min_length=1, max_length=200)
    industry: str = Field(..., min_length=1)
    outletCount: Optional[str] = None
    phone: Optional[str] = None
    preferredTime: Optional[str] = None
    message: Optional[str] = None
    consent: bool = Field(..., description="User must consent to be contacted")

class DemoRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    requestId: str = Field(default_factory=lambda: str(uuid.uuid4()))
    fullName: str
    workEmail: str
    companyName: str
    industry: str
    outletCount: Optional[str] = None
    phone: Optional[str] = None
    preferredTime: Optional[str] = None
    message: Optional[str] = None
    consent: bool
    submittedAt: datetime = Field(default_factory=datetime.utcnow)
    emailSent: bool = False
    emailSentAt: Optional[datetime] = None
    ipAddress: Optional[str] = None