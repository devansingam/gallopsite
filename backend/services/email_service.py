import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_host = os.environ.get('SMTP_HOST')
        self.smtp_port = int(os.environ.get('SMTP_PORT', 587))
        self.smtp_user = os.environ.get('SMTP_USER')
        self.smtp_password = os.environ.get('SMTP_PASSWORD')
        self.smtp_from = os.environ.get('SMTP_FROM')
        self.demo_request_email = os.environ.get('DEMO_REQUEST_EMAIL', 'dev@gallop.my')

    async def send_demo_request_email(self, request_data: dict, request_id: str):
        """
        Send demo request notification email
        """
        try:
            # Create email content
            subject = f"New Demo Request - {request_data.get('companyName', 'Unknown Company')}"
            
            # Build email body
            body = self._build_email_body(request_data, request_id)
            
            # Create message
            message = MIMEMultipart('alternative')
            message['Subject'] = subject
            message['From'] = self.smtp_from
            message['To'] = self.demo_request_email
            
            # Attach plain text and HTML versions
            text_part = MIMEText(body, 'plain')
            html_part = MIMEText(self._build_html_body(request_data, request_id), 'html')
            
            message.attach(text_part)
            message.attach(html_part)
            
            # Send email
            await aiosmtplib.send(
                message,
                hostname=self.smtp_host,
                port=self.smtp_port,
                username=self.smtp_user,
                password=self.smtp_password,
                start_tls=True
            )
            
            logger.info(f"Demo request email sent successfully to {self.demo_request_email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send demo request email: {str(e)}")
            raise Exception(f"Email delivery failed: {str(e)}")

    def _build_email_body(self, data: dict, request_id: str) -> str:
        """
        Build plain text email body
        """
        timestamp = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')
        
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
Submitted on: {timestamp}
Request ID: {request_id}
"""
        return body

    def _build_html_body(self, data: dict, request_id: str) -> str:
        """
        Build HTML email body
        """
        timestamp = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')
        
        html = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #10B893 0%, #114C4A 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
        .content {{ background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; }}
        .section {{ margin-bottom: 25px; }}
        .section-title {{ color: #42045B; font-weight: 600; margin-bottom: 10px; font-size: 16px; }}
        .info-row {{ margin: 8px 0; }}
        .label {{ font-weight: 600; color: #666; }}
        .value {{ color: #333; }}
        .message-box {{ background: white; padding: 15px; border-left: 4px solid #10B893; margin-top: 10px; }}
        .footer {{ background: #0D1323; color: rgba(255,255,255,0.7); padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; text-align: center; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="margin: 0; font-size: 24px;">🐎 New Demo Request</h2>
        </div>
        
        <div class="content">
            <div class="section">
                <div class="section-title">Contact Information</div>
                <div class="info-row"><span class="label">Name:</span> <span class="value">{data.get('fullName', 'N/A')}</span></div>
                <div class="info-row"><span class="label">Email:</span> <span class="value">{data.get('workEmail', 'N/A')}</span></div>
                <div class="info-row"><span class="label">Company:</span> <span class="value">{data.get('companyName', 'N/A')}</span></div>
                <div class="info-row"><span class="label">Industry:</span> <span class="value">{data.get('industry', 'N/A')}</span></div>
            </div>
            
            <div class="section">
                <div class="section-title">Additional Details</div>
                <div class="info-row"><span class="label">Number of Outlets:</span> <span class="value">{data.get('outletCount', 'Not specified')}</span></div>
                <div class="info-row"><span class="label">Phone:</span> <span class="value">{data.get('phone', 'Not provided')}</span></div>
                <div class="info-row"><span class="label">Preferred Contact Time:</span> <span class="value">{data.get('preferredTime', 'Not specified')}</span></div>
            </div>
            
            <div class="section">
                <div class="section-title">Message</div>
                <div class="message-box">{data.get('message', 'No message provided')}</div>
            </div>
        </div>
        
        <div class="footer">
            Submitted on: {timestamp} | Request ID: {request_id}
        </div>
    </div>
</body>
</html>
"""
        return html

email_service = EmailService()