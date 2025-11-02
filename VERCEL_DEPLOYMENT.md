# Gallop - Full Vercel Deployment Guide

## 🚀 Deploying Complete Stack to Vercel

This guide will help you deploy the entire Gallop application (Frontend + Backend + Database) to Vercel.

---

## 📋 Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas Account** - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
3. **GitHub Account** - For code repository
4. **Gmail App Password** - Already configured (dvnsingam@gmail.com)

---

## Step 1: Set Up MongoDB Atlas (Cloud Database)

### 1.1 Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up / Log in
3. Click **"Build a Database"**
4. Choose **"M0 FREE"** tier
5. Select **Singapore** as region (closest to Malaysia)
6. Click **"Create"**

### 1.2 Configure Database Access

1. Go to **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Create username: `gallop_user`
4. Set a strong password (save it!)
5. Set privileges to **"Read and write to any database"**
6. Click **"Add User"**

### 1.3 Configure Network Access

1. Go to **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### 1.4 Get Connection String

1. Go to **"Database"** in left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://gallop_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name at the end: `/gallop_db`
   
   Final format:
   ```
   mongodb+srv://gallop_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/gallop_db?retryWrites=true&w=majority
   ```

---

## Step 2: Push Code to GitHub

### 2.1 Using Emergent's "Save to GitHub"

1. In your Emergent workspace, click **"Save to GitHub"**
2. Connect your GitHub account if not connected
3. Create new repository: `gallop-landing-site`
4. Make it **Private** (recommended)
5. Click **"Save"**

### 2.2 Manual Git Push (Alternative)

```bash
git init
git add .
git commit -m "Initial commit: Gallop landing site for Vercel"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gallop-landing-site.git
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### 3.1 Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your `gallop-landing-site` repository
4. Click **"Import"**

### 3.2 Configure Build Settings

Vercel should auto-detect the settings, but verify:

- **Framework Preset:** Other
- **Root Directory:** `./` (leave as root)
- **Build Command:** `cd frontend && yarn install && yarn build`
- **Output Directory:** `frontend/build`
- **Install Command:** `yarn install`

### 3.3 Configure Environment Variables

In the Vercel deployment screen, add these environment variables:

#### Required Variables:

```env
MONGO_URL=mongodb+srv://gallop_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/gallop_db?retryWrites=true&w=majority
DB_NAME=gallop_db
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=dvnsingam@gmail.com
SMTP_PASSWORD=srawbrcellhqqidi
SMTP_FROM=dvnsingam@gmail.com
DEMO_REQUEST_EMAIL=dev@gallop.my
REACT_APP_BACKEND_URL=https://your-project.vercel.app
```

**Important:** 
- Replace `YOUR_PASSWORD` in MONGO_URL with your MongoDB Atlas password
- Replace `your-project.vercel.app` with your actual Vercel domain (you'll get this after first deployment, then update it)

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. You'll get a URL like: `https://gallop-landing-site.vercel.app`

---

## Step 4: Update Backend URL

After first deployment:

1. Copy your Vercel URL (e.g., `https://gallop-landing-site.vercel.app`)
2. Go to **Vercel Dashboard → Settings → Environment Variables**
3. Update `REACT_APP_BACKEND_URL` to your Vercel URL
4. Click **"Save"**
5. Go to **Deployments** tab
6. Click **"Redeploy"** on latest deployment

---

## Step 5: Test Your Deployment

### 5.1 Test Landing Page
- Visit: `https://your-project.vercel.app`
- Check all sections load correctly
- Verify images display properly

### 5.2 Test Demo Form
- Go to: `https://your-project.vercel.app/demo`
- Fill out the form
- Submit and check:
  - Redirects to Thank You page
  - Email arrives at dev@gallop.my
  - Data saved in MongoDB Atlas (check Atlas dashboard)

### 5.3 Test API Endpoint
```bash
curl https://your-project.vercel.app/api/
# Should return: {"message": "Hello World"}
```

---

## Step 6: Configure Custom Domain (Optional)

### 6.1 Add Domain in Vercel

1. Go to **Vercel Dashboard → Settings → Domains**
2. Click **"Add Domain"**
3. Enter: `gallop.my` and `www.gallop.my`
4. Vercel will provide DNS records

### 6.2 Update DNS Settings

In your domain registrar (where you bought gallop.my):

```
Type    Name    Value                           TTL
A       @       76.76.21.21                     3600
CNAME   www     cname.vercel-dns.com           3600
```

### 6.3 Wait for Propagation

- DNS propagation takes 1-24 hours
- Check status in Vercel dashboard
- SSL certificate auto-generated by Vercel

---

## 📊 Monitoring & Maintenance

### Check MongoDB Atlas Usage
- Go to MongoDB Atlas Dashboard
- Monitor **Metrics** tab for database usage
- Free tier: 512MB storage

### Check Vercel Analytics
- Go to Vercel Dashboard → Analytics
- View page views, performance metrics
- Monitor API requests

### Check Email Delivery
- Test demo form regularly
- Monitor Gmail SMTP usage
- Check spam folder if emails not arriving

---

## 🐛 Troubleshooting

### Issue: Form submission fails

**Solution:**
1. Check `REACT_APP_BACKEND_URL` in Vercel env vars
2. Verify API endpoint: `https://your-site.vercel.app/api/`
3. Check browser console for CORS errors
4. Verify MongoDB Atlas connection string

### Issue: Email not sending

**Solution:**
1. Verify `SMTP_PASSWORD` in Vercel env vars
2. Check Gmail app password is valid
3. Look at Vercel function logs for errors
4. Check spam folder

### Issue: Database connection fails

**Solution:**
1. Verify MongoDB Atlas connection string
2. Check Network Access allows 0.0.0.0/0
3. Verify database user credentials
4. Test connection string with MongoDB Compass

### Issue: 404 errors on page refresh

**Solution:**
- Already handled by `vercel.json` routes configuration
- If issue persists, verify `vercel.json` is in root directory

---

## 💰 Cost Summary

- **Vercel:** Free tier (sufficient for most use cases)
  - Unlimited bandwidth
  - Automatic HTTPS
  - 100GB-hours of serverless function execution/month
  
- **MongoDB Atlas:** Free tier (M0)
  - 512MB storage
  - Shared CPU
  - Sufficient for 10,000+ form submissions
  
- **Gmail SMTP:** Free
  - 500 emails/day limit
  
**Total:** $0/month (free tier) 🎉

---

## 🔄 Updating Your Deployment

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Update feature X"
git push origin main
```

Vercel will:
- Automatically detect changes
- Build and deploy
- Takes ~2-3 minutes

### Manual Redeploy

1. Go to Vercel Dashboard
2. Click **"Deployments"**
3. Click **"Redeploy"** on any deployment

---

## ✅ Deployment Checklist

Before going live:

- [ ] MongoDB Atlas cluster created and configured
- [ ] Database connection string added to Vercel env vars
- [ ] Code pushed to GitHub
- [ ] Vercel project imported from GitHub
- [ ] All environment variables configured in Vercel
- [ ] Initial deployment successful
- [ ] REACT_APP_BACKEND_URL updated with Vercel domain
- [ ] Redeployed after URL update
- [ ] Landing page loads correctly
- [ ] Demo form submission works
- [ ] Email delivered to dev@gallop.my
- [ ] Data saved in MongoDB Atlas
- [ ] Custom domain configured (optional)
- [ ] DNS propagated (if using custom domain)

---

## 🆘 Need Help?

- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **MongoDB Atlas Support:** [mongodb.com/support](https://www.mongodb.com/support)
- **GitHub Issues:** Create issue in your repository

---

## 🎉 You're Live!

Once deployed, your Gallop landing site will be available at:
- **Vercel URL:** `https://your-project.vercel.app`
- **Custom Domain:** `https://gallop.my` (if configured)

All with:
- ⚡ Fast global CDN
- 🔒 Automatic HTTPS
- 📧 Email notifications working
- 💾 Cloud database
- 🚀 Automatic deployments from GitHub

**Congratulations on deploying Gallop! 🐎**
