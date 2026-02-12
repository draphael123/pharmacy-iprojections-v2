# 🚀 Deployment Guide

This guide covers deploying the Pharmacy Inventory Projection Dashboard to various platforms.

---

## 📦 Repository Information

**GitHub Repository**: https://github.com/draphael123/pharmacy-iprojections-v2.git

**Stack**:
- Frontend: React 18 + Vite + Tailwind CSS
- Backend: Python 3.8+ + Flask
- Data Processing: Pandas + NumPy

---

## 🏠 Local Development (Already Set Up!)

Your local development environment is ready. To run:

```bash
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend
npm run dev
```

Or use the quick start script:
```bash
start.bat        # Windows
./start.sh       # Mac/Linux
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + PythonAnywhere (Backend)

#### Deploy Frontend to Vercel

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
vercel
```

3. **Configure**:
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variable: `VITE_API_URL=https://your-backend-url.com`

4. **Update API URL**:
Create `.env.production`:
```
VITE_API_URL=https://your-backend-url.com
```

Update `src/App.jsx` to use:
```javascript
const API_URL = import.meta.env.VITE_API_URL || '/api';
```

#### Deploy Backend to PythonAnywhere

1. Sign up at [PythonAnywhere](https://www.pythonanywhere.com/)

2. Upload backend files via web interface or git:
```bash
git clone https://github.com/draphael123/pharmacy-iprojections-v2.git
```

3. Set up virtualenv:
```bash
mkvirtualenv --python=/usr/bin/python3.10 pharmacy-env
pip install -r backend/requirements.txt
```

4. Configure WSGI file to point to `backend/api.py`

5. Add CORS for your Vercel domain in `api.py`:
```python
CORS(app, resources={r"/api/*": {"origins": "https://your-vercel-app.vercel.app"}})
```

---

### Option 2: Heroku (Full Stack)

#### Prepare for Heroku

1. **Create `Procfile`**:
```
web: gunicorn --chdir backend api:app --bind 0.0.0.0:$PORT & npm run dev -- --port $PORT
```

2. **Add to `backend/requirements.txt`**:
```
gunicorn==21.2.0
```

3. **Create `runtime.txt`**:
```
python-3.11.0
```

#### Deploy to Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create pharmacy-projections

# Push to Heroku
git push heroku main

# Open app
heroku open
```

---

### Option 3: AWS (EC2)

#### Set Up EC2 Instance

1. **Launch EC2 Instance**:
   - Ubuntu 22.04 LTS
   - t2.medium or larger
   - Security group: Allow ports 22, 80, 443, 5000, 3000

2. **SSH into instance**:
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. **Install dependencies**:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Python
sudo apt install -y python3-pip python3-venv

# Install Nginx
sudo apt install -y nginx
```

4. **Clone repository**:
```bash
git clone https://github.com/draphael123/pharmacy-iprojections-v2.git
cd pharmacy-iprojections-v2
```

5. **Install project dependencies**:
```bash
npm install
pip3 install -r backend/requirements.txt
```

6. **Build frontend**:
```bash
npm run build
```

7. **Configure Nginx**:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /home/ubuntu/pharmacy-iprojections-v2/dist;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

8. **Set up systemd service for backend**:

Create `/etc/systemd/system/pharmacy-api.service`:
```ini
[Unit]
Description=Pharmacy API Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/pharmacy-iprojections-v2/backend
ExecStart=/usr/bin/python3 api.py
Restart=always

[Install]
WantedBy=multi-user.target
```

Start service:
```bash
sudo systemctl enable pharmacy-api
sudo systemctl start pharmacy-api
```

---

### Option 4: Docker

#### Create Dockerfile for Backend

Create `backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "api.py"]
```

#### Create Dockerfile for Frontend

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Create docker-compose.yml

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    volumes:
      - ./backend/processed_data.json:/app/processed_data.json
    restart: unless-stopped

  frontend:
    build: .
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
```

#### Deploy with Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

### Option 5: DigitalOcean App Platform

1. **Connect GitHub Repository**:
   - Go to DigitalOcean App Platform
   - Click "Create App"
   - Select GitHub repository

2. **Configure Backend Component**:
   - Name: `pharmacy-api`
   - Source Directory: `/backend`
   - Build Command: `pip install -r requirements.txt`
   - Run Command: `python api.py`
   - HTTP Port: 5000

3. **Configure Frontend Component**:
   - Name: `pharmacy-frontend`
   - Source Directory: `/`
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Access via provided URL

---

## 📊 Data Management for Production

### Important Notes

⚠️ **Your data files are NOT in the repository** (intentionally excluded via `.gitignore`)

This means:
- Raw data folders (September, October, etc.) are not pushed
- `processed_data.json` is not in the repo
- You need to handle data separately for production

### Options for Production Data:

#### Option 1: Process Data on Deployment

Add to your deployment pipeline:
```bash
cd backend
python data_processor.py
```

Then deploy with the generated `processed_data.json`

#### Option 2: Cloud Storage

Store `processed_data.json` in:
- AWS S3
- Google Cloud Storage
- DigitalOcean Spaces

Update `api.py` to fetch from cloud:
```python
import boto3
import json

# Load from S3
s3 = boto3.client('s3')
obj = s3.get_object(Bucket='your-bucket', Key='processed_data.json')
data = json.loads(obj['Body'].read())
```

#### Option 3: Database

For production, consider storing data in:
- PostgreSQL
- MongoDB
- MySQL

Update `data_processor.py` to write to database
Update `api.py` to query from database

---

## 🔐 Security for Production

### 1. Environment Variables

Create `.env` file (don't commit!):
```
FLASK_ENV=production
SECRET_KEY=your-secret-key-here
DATABASE_URL=your-database-url
API_KEY=your-api-key
```

### 2. Update CORS

In `backend/api.py`:
```python
from flask_cors import CORS
import os

# Only allow your frontend domain
CORS(app, resources={
    r"/api/*": {
        "origins": os.getenv('FRONTEND_URL', 'http://localhost:3000')
    }
})
```

### 3. Add Authentication

Consider adding:
- JWT tokens
- API keys
- OAuth integration

### 4. HTTPS

Always use HTTPS in production:
- Use Cloudflare
- Use Let's Encrypt
- Use platform SSL (Heroku, Vercel, etc.)

---

## 📈 Monitoring

### Application Monitoring

- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **New Relic**: Performance monitoring

### Server Monitoring

- **CloudWatch** (AWS)
- **Prometheus + Grafana**
- **Datadog**

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Setup Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: |
        npm install
        pip install -r backend/requirements.txt
    
    - name: Build frontend
      run: npm run build
    
    - name: Deploy to server
      run: |
        # Add your deployment commands here
        echo "Deploying..."
```

---

## 🧪 Testing Before Deployment

```bash
# Test backend
cd backend
python -m pytest

# Test frontend
npm run test

# Build test
npm run build
npm run preview
```

---

## 📝 Deployment Checklist

Before deploying to production:

- [ ] Update `VITE_API_URL` in frontend
- [ ] Set up CORS properly in backend
- [ ] Add authentication/API keys
- [ ] Enable HTTPS
- [ ] Set up database (if using)
- [ ] Configure cloud storage for data
- [ ] Add error monitoring (Sentry)
- [ ] Set up automated backups
- [ ] Configure environment variables
- [ ] Test in production-like environment
- [ ] Set up CI/CD pipeline
- [ ] Configure domain name
- [ ] Add rate limiting
- [ ] Optimize assets (images, etc.)
- [ ] Enable caching

---

## 🌍 Recommended Stack for Production

**Best for Small Scale (< 1000 users)**:
- Frontend: Vercel (free tier)
- Backend: PythonAnywhere ($5/month)
- Database: PostgreSQL on Railway (free tier)

**Best for Medium Scale (1000-10,000 users)**:
- Frontend: Vercel Pro ($20/month)
- Backend: AWS EC2 t3.small ($10/month)
- Database: AWS RDS ($15/month)
- CDN: Cloudflare (free)

**Best for Large Scale (10,000+ users)**:
- Frontend: Vercel Enterprise or CloudFront
- Backend: AWS ECS with auto-scaling
- Database: AWS RDS with read replicas
- Caching: Redis (ElastiCache)
- CDN: CloudFront

---

## 🆘 Troubleshooting Deployment

### Build Fails
- Check Node version (need 18+)
- Check Python version (need 3.8+)
- Verify all dependencies installed

### API Not Connecting
- Check CORS configuration
- Verify API URL in frontend
- Check firewall/security groups
- Verify backend is running

### Data Not Loading
- Ensure `processed_data.json` exists
- Check file permissions
- Verify data processing completed
- Check API endpoints return data

---

## 📞 Support

For deployment help:
- Check documentation in `README.md`
- Review `PROJECT_STRUCTURE.md` for architecture
- See `QUICKSTART.md` for local setup

---

**Your app is now deployed!** 🎉

Repository: https://github.com/draphael123/pharmacy-iprojections-v2.git

Happy deploying! 🚀

