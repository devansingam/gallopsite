# Gallop Landing Site - Deployment Guide

## 🚀 Deployment Architecture

**Frontend (React)** → Vercel  
**Backend (FastAPI + MongoDB)** → Emergent Platform

---

## 📋 Prerequisites

1. GitHub account
2. Vercel account (free tier is sufficient)
3. Emergent account with deployed backend

---

## 🔧 Step 1: Push to GitHub

### Using Emergent's Save to GitHub Feature:

1. In your Emergent workspace, click **"Save to GitHub"**
2. Connect your GitHub account if not already connected
3. Create a new repository named `gallop-landing-site`
4. Push your code

### Manual Git Push (Alternative):

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Gallop landing site"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/gallop-landing-site.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Deploy Frontend to Vercel

### 2.1 Connect GitHub to Vercel:

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your `gallop-landing-site` repository
4. Select the **frontend** folder as the root directory

### 2.2 Configure Build Settings:

- **Framework Preset:** Create React App
- **Root Directory:** `frontend`
- **Build Command:** `yarn build`
- **Output Directory:** `build`
- **Install Command:** `yarn install`

### 2.3 Set Environment Variables:

In Vercel Dashboard → Settings → Environment Variables, add:

```
REACT_APP_BACKEND_URL=<YOUR_EMERGENT_BACKEND_URL>
```

**To get your Emergent backend URL:**
1. Go to your Emergent workspace
2. Check the deployment URL (usually shown in the workspace)
3. Copy the full URL (e.g., `https://your-app.emergent.sh`)

### 2.4 Deploy:

1. Click **"Deploy"**
2. Wait for deployment to complete (~2-3 minutes)
3. Your frontend will be live at: `https://your-project.vercel.app`

---

## ⚙️ Step 3: Update Backend Configuration

### 3.1 Update CORS in Backend:

The backend CORS is already configured to accept requests from:
- `https://*.vercel.app` (Vercel deployments)
- `https://gallop.my` (your production domain)
- `https://www.gallop.my`

### 3.2 Verify Backend is Running:

1. Check Emergent dashboard to ensure backend is deployed
2. Test backend API: `curl <YOUR_EMERGENT_BACKEND_URL>/api/`
3. Should return: `{"message": "Hello World"}`

---

## 🧪 Step 4: Test Deployment

### 4.1 Test Frontend:

1. Visit your Vercel URL
2. Navigate through all pages:
   - Landing page: `/`
   - Demo page: `/demo`
   - Thank you page: `/thank-you`

### 4.2 Test Form Submission:

1. Go to `/demo` page
2. Fill out the demo request form
3. Submit and verify:
   - Redirects to `/thank-you` page
   - Email sent to `dev@gallop.my`
   - Data saved in MongoDB

### 4.3 Check Backend Logs:

In Emergent:
1. Go to your workspace
2. Check backend logs for form submission
3. Verify email was sent successfully

---

## 🔒 Step 5: Environment Variables Summary

### Frontend (Vercel):
```
REACT_APP_BACKEND_URL=<your-emergent-backend-url>
```

### Backend (Emergent - Already Configured):
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=dvnsingam@gmail.com
SMTP_PASSWORD=<configured>
SMTP_FROM=dvnsingam@gmail.com
DEMO_REQUEST_EMAIL=dev@gallop.my
```

---

## 🌐 Step 6: Custom Domain (Optional)

### Add gallop.my to Vercel:

1. In Vercel Dashboard → Settings → Domains
2. Add custom domain: `gallop.my` and `www.gallop.my`
3. Follow Vercel's DNS configuration instructions
4. Update your domain registrar's DNS settings

### DNS Records to Add:
```
A Record:     @        →  76.76.21.21 (Vercel IP)
CNAME Record: www      →  cname.vercel-dns.com
```

---

## 🐛 Troubleshooting

### Issue: Form submission fails

**Solution:**
1. Check `REACT_APP_BACKEND_URL` is set correctly in Vercel
2. Verify backend is running on Emergent
3. Check CORS configuration in backend
4. Check browser console for errors

### Issue: Email not sending

**Solution:**
1. Check backend logs in Emergent
2. Verify Gmail SMTP credentials are correct
3. Ensure Gmail app password is valid
4. Check spam folder in dev@gallop.my

### Issue: 404 errors on page refresh

**Solution:**
- Already handled by `vercel.json` rewrites configuration
- If still occurring, verify `vercel.json` is in frontend root

---

## 📊 Monitoring

### Vercel Analytics:
- Automatic in Vercel dashboard
- View page views, performance metrics

### Backend Monitoring:
- Use Emergent dashboard logs
- Monitor API requests and errors

### Database:
- MongoDB running on Emergent
- Access via Emergent workspace

---

## 🔄 Updating Your Deployment

### Frontend Updates:
1. Push changes to GitHub main branch
2. Vercel auto-deploys on push
3. Preview deployments for branches

### Backend Updates:
1. Make changes in Emergent workspace
2. Backend auto-reloads with hot reload
3. For major changes, restart backend via supervisor

---

## 💰 Cost Summary

- **Vercel:** Free tier (sufficient for most use cases)
- **Emergent:** 50 credits/month for backend deployment
- **Total:** Minimal cost, scales as needed

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created and connected
- [ ] `REACT_APP_BACKEND_URL` set in Vercel
- [ ] Frontend deployed successfully
- [ ] Backend running on Emergent
- [ ] CORS configured correctly
- [ ] Form submission tested
- [ ] Email delivery verified
- [ ] Custom domain added (optional)
- [ ] DNS configured (if using custom domain)

---

## 📞 Support

- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Emergent Support:** Check Emergent documentation
- **GitHub Issues:** Create issues in your repository

---

## 🎉 You're Live!

Your Gallop landing site is now deployed with:
- ⚡ Fast frontend on Vercel CDN
- 🔧 Managed backend on Emergent
- 📧 Email notifications working
- 💾 MongoDB data persistence
- 🌐 Ready for custom domain

**Next Steps:**
- Monitor form submissions
- Add custom domain
- Optimize performance
- Scale as needed
