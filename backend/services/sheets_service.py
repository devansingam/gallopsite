import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os
import json
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class GoogleSheetsService:
    def __init__(self):
        # Get credentials from environment variable (JSON string)
        creds_json = os.environ.get('GOOGLE_SHEETS_CREDENTIALS')
        
        if not creds_json:
            logger.warning("Google Sheets credentials not configured")
            self.client = None
            self.sheet = None
            return
        
        try:
            # Parse JSON credentials
            creds_dict = json.loads(creds_json)
            
            # Define the scope
            scope = [
                'https://spreadsheets.google.com/feeds',
                'https://www.googleapis.com/auth/drive'
            ]
            
            # Authorize with credentials
            credentials = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
            self.client = gspread.authorize(credentials)
            
            # Get or create the spreadsheet
            sheet_name = os.environ.get('GOOGLE_SHEET_NAME', 'Gallop Demo Leads')
            try:
                self.spreadsheet = self.client.open(sheet_name)
                self.sheet = self.spreadsheet.sheet1
            except gspread.exceptions.SpreadsheetNotFound:
                # Create new spreadsheet if it doesn't exist
                self.spreadsheet = self.client.create(sheet_name)
                self.sheet = self.spreadsheet.sheet1
                # Set up headers
                self.sheet.append_row([
                    'Timestamp',
                    'Full Name',
                    'Work Email',
                    'Company Name',
                    'Industry',
                    'Number of Outlets',
                    'Phone',
                    'Preferred Contact Time',
                    'Message',
                    'Request ID'
                ])
                logger.info(f"Created new spreadsheet: {sheet_name}")
            
            logger.info(f"Connected to Google Sheet: {sheet_name}")
            
        except Exception as e:
            logger.error(f"Failed to initialize Google Sheets: {str(e)}")
            self.client = None
            self.sheet = None
    
    async def add_demo_request(self, data: dict, request_id: str):
        """
        Add a demo request to Google Sheets
        """
        if not self.sheet:
            logger.warning("Google Sheets not configured, skipping")
            return False
        
        try:
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
            
            self.sheet.append_row(row)
            logger.info(f"Demo request added to Google Sheet: {request_id}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to add demo request to Google Sheet: {str(e)}")
            return False

# Initialize service
sheets_service = GoogleSheetsService()
