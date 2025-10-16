# Gallop Landing Site - Frontend-Backend Integration Contracts

## Overview
This document outlines the API contracts and integration points between the Gallop frontend and backend.

## Current Implementation Status
- ✅ **Frontend**: Complete with mock data
- 🔄 **Backend**: To be implemented
- 🔄 **Email Integration**: To be implemented (send to dev@gallop.my)

---

## API Endpoints

### 1. Demo Request Submission

**Endpoint**: `POST /api/demo-request`

**Purpose**: Submit demo request form and send email notification to dev@gallop.my

**Request Body**:
```json
{
  "fullName": "string (required)",
  "workEmail": "string (required, email format)",
  "companyName": "string (required)",
  "industry": "string (required)",
  "outletCount": "string (optional)",
  "phone": "string (optional)",
  "preferredTime": "string (optional)",
  "message": "string (optional)",
  "consent": "boolean (required, must be true)"
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "Demo request received! We'll get in touch soon.",
  "requestId": "uuid"
}
```

**Response (Error - 400)**:
```json
{
  "success": false,
  "error": "Validation error message"
}
```

**Response (Error - 500)**:
```json
{
  "success": false,
  "error": "Server error message"
}
```

---

## Email Requirements

### Demo Request Email Template

**To**: dev@gallop.my  
**From**: noreply@gallop.my  
**Subject**: New Demo Request - {Company Name}

**Email Body**:
```
New Demo Request from Gallop Website
=====================================

Contact Information:
-------------------
Name: {fullName}
Email: {workEmail}
Company: {companyName}
Industry: {industry}
Outlets: {outletCount}
Phone: {phone}
Preferred Contact Time: {preferredTime}

Message:
--------
{message}

---
Submitted on: {timestamp}
Request ID: {requestId}
```

---

## Mock Data Currently Used (Frontend)

### File: `/app/frontend/src/utils/mockData.js`

**Mocked Data**:
- Industries list
- Features list
- Workflow steps
- Testimonials
- Partners
- Form dropdown options (industryOptions, outletOptions, contactTimeOptions)

**Integration Note**: All mock data is static and stored in mockData.js. No backend replacement needed for these as they are content/CMS data.

---

## Form Validation Rules

### Frontend Validation (Already Implemented)
- **Full Name**: Required, non-empty string
- **Work Email**: Required, valid email format
- **Company Name**: Required, non-empty string
- **Industry**: Required, must select from dropdown
- **Consent**: Required, must be checked

### Backend Validation (To Implement)
- Validate all required fields
- Validate email format
- Check for SQL injection / XSS attempts
- Rate limiting (prevent spam)
- Duplicate submission check (same email within 5 minutes)

---

## Database Schema

### Collection: `demo_requests`

```javascript
{
  _id: ObjectId,
  requestId: String (UUID),
  fullName: String,
  workEmail: String,
  companyName: String,
  industry: String,
  outletCount: String (optional),
  phone: String (optional),
  preferredTime: String (optional),
  message: String (optional),
  consent: Boolean,
  submittedAt: DateTime,
  ipAddress: String (optional, for spam prevention),
  emailSent: Boolean,
  emailSentAt: DateTime (optional)
}
```

---

## Integration Steps

### Step 1: Backend Implementation
1. Create `/api/demo-request` endpoint in FastAPI
2. Add MongoDB model for demo_requests
3. Implement email sending functionality
4. Add validation and error handling

### Step 2: Frontend Integration
1. Update DemoPage.jsx to use actual API endpoint
2. Remove mock setTimeout in handleSubmit
3. Handle real API responses
4. Implement proper error messages

### Step 3: Testing
1. Test form submission with valid data
2. Test form validation with invalid data
3. Verify email delivery to dev@gallop.my
4. Test error handling scenarios

---

## Frontend Files to Update

- `/app/frontend/src/pages/DemoPage.jsx`
  - Line ~66: Replace mock API call with real axios call
  - Remove: `await new Promise(resolve => setTimeout(resolve, 1500));`
  - Add: `const response = await axios.post(\`\${API}/demo-request\`, formData);`

---

## Environment Variables Needed

### Backend `.env`
```
MONGO_URL=<already configured>
DB_NAME=<already configured>
SMTP_HOST=<email server host>
SMTP_PORT=<email server port>
SMTP_USER=<email username>
SMTP_PASSWORD=<email password>
SMTP_FROM=noreply@gallop.my
DEMO_REQUEST_EMAIL=dev@gallop.my
```

---

## Error Handling

### Frontend Error Messages
- Network error: "Unable to connect. Please check your internet connection."
- Server error: "Something went wrong. Please try again or email hello@gallop.my."
- Validation error: Display specific field errors from backend response

### Backend Error Responses
- 400: Bad request (validation errors)
- 429: Too many requests (rate limiting)
- 500: Internal server error
- 503: Email service unavailable

---

## Success Flow

1. User fills out form on `/demo` page
2. Frontend validates form data
3. Frontend sends POST request to `/api/demo-request`
4. Backend validates data
5. Backend saves to MongoDB
6. Backend sends email to dev@gallop.my
7. Backend returns success response
8. Frontend navigates to `/thank-you` page
9. User sees success message

---

## Notes

- **No Google Sheets integration** (as per requirements)
- **No webhook integration** (as per requirements)
- Email is the primary notification method
- Form data is stored in MongoDB for record-keeping
- Toast notifications used for user feedback

---

## Ready for Implementation ✓
All contracts defined. Backend implementation can proceed.
