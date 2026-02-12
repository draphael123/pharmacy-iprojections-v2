# 🔧 Fixing Vercel Deployment Error

You're seeing "Error Loading Data" because Vercel only hosts your **frontend**, but your app needs a **backend** to serve data.

---

## 🎯 The Problem

- ✅ Frontend deployed to Vercel successfully
- ❌ Backend (Flask API) not running
- ❌ No `processed_data.json` file available

**Vercel is a frontend hosting platform** - it doesn't run Python/Flask backends by default.

---

## ✅ Solution: Deploy Backend Separately

### **Option 1: Render.com (Recommended - Free Tier)**

#### Step 1: Sign up for Render
Go to [render.com](https://render.com) and sign up (free tier available)

#### Step 2: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `https://github.com/draphael123/pharmacy-iprojections-v2`
3. Configure:
   - **Name**: `pharmacy-api`
   - **Environment**: `Python 3`
   - **Build Command**: 
     ```bash
     pip install -r backend/requirements.txt && cd backend && python data_processor.py
     ```
   - **Start Command**: 
     ```bash
     cd backend && gunicorn api:app
     ```
   - **Select Free tier**

#### Step 3: Add Environment Variables (in Render dashboard)
- `PYTHON_VERSION` = `3.11.0`
- `PORT` = `5000`

#### Step 4: Deploy
Click "Create Web Service" - it will deploy automatically!

#### Step 5: Get Your Backend URL
After deployment, Render will give you a URL like:
```
https://pharmacy-api.onrender.com
```

#### Step 6: Update Vercel Environment Variable
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://pharmacy-api.onrender.com/api`
   - **Environment**: Production

#### Step 7: Redeploy Vercel
1. Go to Deployments tab
2. Click the "..." menu on latest deployment
3. Click "Redeploy"

**Done!** Your app should now work! 🎉

---

### **Option 2: Railway.app (Also Free Tier)**

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose `pharmacy-iprojections-v2`
5. Add build command:
   ```bash
   pip install -r backend/requirements.txt && cd backend && python data_processor.py
   ```
6. Add start command:
   ```bash
   cd backend && gunicorn api:app
   ```
7. Set port to `5000`
8. Deploy!
9. Copy the Railway URL
10. Add to Vercel environment variables as `VITE_API_URL`

---

### **Option 3: PythonAnywhere ($5/month)**

1. Sign up at [pythonanywhere.com](https://www.pythonanywhere.com)
2. Go to "Web" tab → "Add a new web app"
3. Choose Flask
4. Upload your code:
   ```bash
   git clone https://github.com/draphael123/pharmacy-iprojections-v2.git
   ```
5. Configure WSGI file to point to `backend/api.py`
6. Add to Vercel as `VITE_API_URL`

---

## 📊 Handling Data Files

### Important: Your data files are NOT in GitHub!

Your `.gitignore` excludes:
- Raw data folders (December/, January/, etc.)
- `processed_data.json`

**Solutions:**

### Solution A: Manual Upload (Quick)
1. Process data locally: `npm run process-data`
2. Upload `backend/processed_data.json` to your hosting service
   - **Render**: Use the "Shell" tab to upload
   - **Railway**: Use the file browser
   - **PythonAnywhere**: Use the files interface

### Solution B: Cloud Storage (Production)
1. Upload raw data to AWS S3 or similar
2. Update `data_processor.py` to read from cloud
3. Run processor on backend during deployment

### Solution C: Include Sample Data
For demo purposes, you could:
1. Create a small sample dataset
2. Commit it to a separate branch
3. Deploy that branch

---

## 🔄 Quick Fix Commands

### Push updated files to GitHub:

```bash
git add .
git commit -m "Configure for production deployment with Render and Vercel"
git push
```

### Test locally:

```bash
# Terminal 1 - Backend
cd backend
python api.py

# Terminal 2 - Frontend with env var
VITE_API_URL=http://localhost:5000/api npm run dev
```

---

## 🎯 Architecture After Fix

```
┌─────────────────────────────────────────┐
│         Vercel (Frontend)               │
│   https://your-app.vercel.app           │
│                                         │
│   React + Vite + Tailwind               │
└──────────────┬──────────────────────────┘
               │ API calls
               ▼
┌─────────────────────────────────────────┐
│      Render/Railway (Backend)           │
│   https://pharmacy-api.onrender.com     │
│                                         │
│   Python + Flask + processed_data.json  │
└─────────────────────────────────────────┘
```

---

## ✅ Verification Steps

After deployment:

1. **Test Backend**: Visit `https://your-backend-url.com/api/health`
   - Should return: `{"status": "healthy", "data_available": true}`

2. **Test Frontend**: Visit your Vercel URL
   - Should load the dashboard
   - Should show pharmacy data

3. **Check Browser Console** (F12)
   - No CORS errors
   - Successful API calls

---

## 🐛 Common Issues

### Issue 1: CORS Error
**Symptom**: Console shows "CORS policy blocked"
**Fix**: Make sure backend `api.py` includes your Vercel domain in CORS

### Issue 2: 404 on API calls
**Symptom**: API calls return 404
**Fix**: Check `VITE_API_URL` environment variable includes `/api` at the end

### Issue 3: Backend crashes on startup
**Symptom**: "Application Error" on backend URL
**Fix**: Check backend logs - likely missing `processed_data.json`

### Issue 4: Data not loading
**Symptom**: "Error Loading Data" persists
**Fix**: 
1. Verify backend URL is accessible
2. Check backend has `processed_data.json`
3. Run `python data_processor.py` on backend

---

## 💰 Cost Breakdown

### Free Option:
- **Vercel**: Free (Frontend)
- **Render**: Free tier (Backend, spins down after inactivity)
- **Total**: $0/month

### Reliable Option:
- **Vercel**: Free or $20/month Pro
- **Render**: $7/month (Always on)
- **Total**: $7-27/month

### Enterprise Option:
- **Vercel**: $20/month
- **AWS/GCP**: $20-50/month
- **Database**: $15/month
- **Total**: $55-85/month

---

## 📞 Need Help?

1. Check backend logs on Render/Railway
2. Check browser console for errors
3. Verify environment variables are set
4. Test backend URL directly in browser

---

## 🎉 After Fixing

Once both are deployed:
- ✅ Frontend on Vercel (fast CDN delivery)
- ✅ Backend on Render (Python/Flask API)
- ✅ Separated concerns (scalable)
- ✅ Production-ready architecture

**Your pharmacy dashboard will be live!** 🚀

---

*Last updated: February 12, 2026*

