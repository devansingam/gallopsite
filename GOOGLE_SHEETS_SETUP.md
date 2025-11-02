# Google Sheets Setup Guide for Gallop

## 🎯 Overview

Your demo form submissions will automatically go to a Google Sheet. This guide shows you how to set it up.

---

## Step 1: Create Google Cloud Project & Enable API

### 1.1 Go to Google Cloud Console

1. Visit: [console.cloud.google.com](https://console.cloud.google.com)
2. Sign in with your Google account
3. Click **"Select a project"** at the top
4. Click **"New Project"**
5. Name it: **"Gallop Demo Leads"**
6. Click **"Create"**

### 1.2 Enable Google Sheets API

1. In the search bar at top, type: **"Google Sheets API"**
2. Click on **"Google Sheets API"** in results
3. Click the blue **"Enable"** button
4. Wait for it to enable (~10 seconds)

### 1.3 Enable Google Drive API

1. In the search bar, type: **"Google Drive API"**
2. Click on **"Google Drive API"** in results
3. Click the blue **"Enable"** button

---

## Step 2: Create Service Account

### 2.1 Navigate to Service Accounts

1. Click the hamburger menu (☰) at top left
2. Go to **"IAM & Admin"** → **"Service Accounts"**
3. Click **"+ Create Service Account"** at top

### 2.2 Create Service Account

1. **Service account name:** `gallop-sheets-service`
2. **Service account ID:** (auto-generated)
3. Click **"Create and Continue"**
4. **Role:** Select **"Editor"** (or skip this step)
5. Click **"Continue"**
6. Click **"Done"**

### 2.3 Create JSON Key

1. Find your new service account in the list
2. Click on it to open details
3. Go to **"Keys"** tab
4. Click **"Add Key"** → **"Create new key"**
5. Choose **"JSON"**
6. Click **"Create"**
7. A JSON file will download - **SAVE THIS FILE!**

The file will look like:
```json
{
  "type": "service_account",
  "project_id": "gallop-demo-leads-xxxxx",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "gallop-sheets-service@gallop-demo-leads-xxxxx.iam.gserviceaccount.com",
  ...
}
```

---

## Step 3: Create Google Sheet

### 3.1 Create New Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **"+ Blank"** to create new sheet
3. Name it: **"Gallop Demo Leads"** (click title at top)

### 3.2 Share Sheet with Service Account

**IMPORTANT:** You must share the sheet with the service account email!

1. Click the **"Share"** button (top right)
2. Copy the **"client_email"** from your downloaded JSON file
   - It looks like: `gallop-sheets-service@gallop-demo-leads-xxxxx.iam.gserviceaccount.com`
3. Paste it in the "Add people and groups" field
4. Change permission to **"Editor"**
5. **UNCHECK** "Notify people"
6. Click **"Share"**

---

## Step 4: Add to Vercel Environment Variables

### 4.1 Prepare JSON for Vercel

1. Open the downloaded JSON file in a text editor
2. Copy the **entire contents** (all the JSON)
3. **Minify it** - remove all line breaks and extra spaces
   - Or use: [jsonformatter.org/json-minify](https://jsonformatter.org/json-minify)
4. Result should be one long line like:
   ```
   {"type":"service_account","project_id":"gallop-demo-leads-xxxxx","private_key_id":"..."}
   ```

### 4.2 Add to Vercel

1. Go to Vercel Dashboard → Your Project
2. Click **"Settings"** → **"Environment Variables"**
3. Add **two** new variables:

**Variable 1:**
- **Key:** `GOOGLE_SHEETS_CREDENTIALS`
- **Value:** Paste the minified JSON from step 4.1
- **Environments:** All (Production, Preview, Development)

**Variable 2:**
- **Key:** `GOOGLE_SHEET_NAME`
- **Value:** `Gallop Demo Leads`
- **Environments:** All

4. Click **"Save"** for each

### 4.3 Update Other Variables

Also make sure you have these (from earlier):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=dvnsingam@gmail.com
SMTP_PASSWORD=srawbrcellhqqidi
SMTP_FROM=dvnsingam@gmail.com
DEMO_REQUEST_EMAIL=dev@gallop.my
REACT_APP_BACKEND_URL=https://your-project.vercel.app
```

---

## Step 5: Deploy & Test

### 5.1 Redeploy

1. Go to **"Deployments"** tab in Vercel
2. Click **"Redeploy"** on latest deployment
3. Wait for deployment to complete

### 5.2 Test Form Submission

1. Go to your deployed site: `https://your-project.vercel.app/demo`
2. Fill out the form completely
3. Click **"Request Demo"**
4. Should redirect to Thank You page

### 5.3 Check Google Sheet

1. Go to your Google Sheet: "Gallop Demo Leads"
2. You should see a new row with:
   - Timestamp
   - Full Name
   - Work Email
   - Company Name
   - Industry
   - Number of Outlets
   - Phone
   - Preferred Contact Time
   - Message
   - Request ID

### 5.4 Check Email

- Email should also arrive at: dev@gallop.my

---

## 📊 Your Google Sheet Structure

The sheet will have these columns (created automatically on first submission):

| Column | Description |
|--------|-------------|
| Timestamp | When form was submitted (UTC) |
| Full Name | Contact's full name |
| Work Email | Business email address |
| Company Name | Company/organization name |
| Industry | Industry sector |
| Number of Outlets | How many locations they manage |
| Phone | Contact phone number |
| Preferred Contact Time | When they prefer to be contacted |
| Message | Their message/requirements |
| Request ID | Unique identifier for tracking |

---

## 🔧 Troubleshooting

### Issue: Form submits but no data in sheet

**Solutions:**
1. Check if sheet is shared with service account email
2. Verify `GOOGLE_SHEETS_CREDENTIALS` in Vercel is correct (minified JSON)
3. Check Vercel function logs for errors
4. Make sure sheet name matches `GOOGLE_SHEET_NAME` exactly

### Issue: "Permission denied" error

**Solution:**
- Sheet must be shared with the service account email
- Give "Editor" permissions, not just "Viewer"

### Issue: Can't find service account email

**Solution:**
- Look in the downloaded JSON file for `"client_email"`
- Format: `service-name@project-id.iam.gserviceaccount.com`

### Issue: JSON credentials invalid

**Solution:**
- Make sure entire JSON is copied (starts with `{` ends with `}`)
- Minify it (remove line breaks)
- No extra quotes or escaping needed
- Test JSON validity at jsonlint.com

---

## 🎉 Success!

Once set up, every form submission will:
1. ✅ Appear as a new row in your Google Sheet
2. ✅ Send email to dev@gallop.my
3. ✅ Redirect user to Thank You page

You can:
- Share the sheet with your team
- Export to Excel anytime
- Use Google Sheets formulas for analysis
- Set up email notifications in Google Sheets

**No database setup required!** 🚀

---

## 📝 Quick Reference

**Google Cloud Console:** [console.cloud.google.com](https://console.cloud.google.com)  
**Your Sheet:** [sheets.google.com](https://sheets.google.com)  
**JSON Minifier:** [jsonformatter.org/json-minify](https://jsonformatter.org/json-minify)  
**Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)

---

## ⚠️ Security Note

- Keep your JSON credentials file secure
- Don't commit it to Git
- Don't share it publicly
- Vercel environment variables are encrypted
- Only share the Google Sheet with trusted people

---

Need help? The form will still work and send emails even if Google Sheets isn't set up yet!
