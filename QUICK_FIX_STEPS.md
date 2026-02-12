# 🔥 Quick Fix for Vercel Error

## The Problem
Your frontend is on Vercel, but the backend isn't running anywhere!

## ⚡ 5-Minute Fix

### Step 1: Deploy Backend to Render (Free)

1. **Go to [render.com](https://render.com)** and sign up

2. **Click "New +" → "Web Service"**

3. **Connect GitHub**: Choose `pharmacy-iprojections-v2`

4. **Configure**:
   - Name: `pharmacy-api`
   - Environment: `Python 3`
   - Build Command:
     ```
     pip install -r backend/requirements.txt && cd backend && python data_processor.py
     ```
   - Start Command:
     ```
     cd backend && gunicorn api:app
     ```
   - Plan: **Free**

5. **Click "Create Web Service"** - Wait 3-5 minutes for deployment

6. **Copy your backend URL** - Will look like:
   ```
   https://pharmacy-api-xxxx.onrender.com
   ```

### Step 2: Update Vercel

1. **Go to [vercel.com](https://vercel.com)** → Your project

2. **Settings → Environment Variables**

3. **Add New Variable**:
   - Name: `VITE_API_URL`
   - Value: `https://pharmacy-api-xxxx.onrender.com/api` (YOUR URL + /api)
   - Environment: Check all (Production, Preview, Development)

4. **Save**

### Step 3: Redeploy Vercel

1. **Go to Deployments tab**

2. **Click "..." on latest deployment → "Redeploy"**

3. **Wait 1-2 minutes**

### Step 4: Test! 🎉

Visit your Vercel URL - it should work!

---

## ⚠️ Important: Data Files

Your backend won't have data initially! You need to either:

### Option A: Upload processed_data.json

1. Process locally: `npm run process-data`
2. In Render dashboard, go to **Shell** tab
3. Run:
   ```bash
   cd backend
   # Then upload your processed_data.json file
   ```

### Option B: Upload raw data and process on Render

1. Upload your data folders to Render
2. In Shell, run:
   ```bash
   cd backend
   python data_processor.py
   ```

---

## 🧪 Test Backend Directly

Visit: `https://your-backend-url.onrender.com/api/health`

Should see:
```json
{
  "status": "healthy",
  "data_available": true
}
```

---

## 💡 Why This Happened

- **Vercel** = Frontend only (React, HTML, CSS, JS)
- **Render** = Backend (Python, Flask, API)
- You need both!

---

## 🆘 Still Having Issues?

Check:
1. Backend URL is correct (includes `/api` at end)
2. Backend shows "healthy" at `/api/health`
3. Browser console (F12) - any errors?
4. Vercel environment variable is set

---

**Questions?** Check `VERCEL_FIX_GUIDE.md` for detailed instructions!

