# Quick Start Guide

Get your Pharmacy Projections Dashboard up and running in 3 easy steps!

## 🚀 Automated Setup (Recommended)

### Windows
1. Double-click `start.bat`
2. Wait for installation and setup to complete
3. The dashboard will automatically open in your browser at `http://localhost:3000`

### Mac/Linux
1. Open Terminal in the project folder
2. Run: `chmod +x start.sh && ./start.sh`
3. The dashboard will automatically open in your browser at `http://localhost:3000`

That's it! The script will:
- Install all dependencies
- Process your pharmacy data
- Start both backend and frontend servers

---

## 📋 Manual Setup

If you prefer to run each step manually:

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
pip install -r backend/requirements.txt
```

### 2. Process Your Data

```bash
npm run process-data
```

Or:
```bash
cd backend
python data_processor.py
cd ..
```

### 3. Start the Servers

**Terminal 1 - Backend:**
```bash
npm run backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 4. Open the Dashboard

Navigate to `http://localhost:3000` in your web browser.

---

## 🎯 What You'll See

The dashboard includes:

1. **Pharmacy Selector** - Switch between Belmar, Curexa, and TPH
2. **Summary Cards** - Key metrics at a glance
3. **Weekly Projections Chart** - Historical data + future predictions
4. **Monthly Overview Chart** - Month-over-month comparison
5. **SKU Breakdown Table** - Detailed analysis with trends

---

## ❓ Troubleshooting

### "Data not found" Error
- Make sure you ran `npm run process-data` first
- Check that your data files are in the correct folder structure

### Backend Won't Start
- Verify Python 3.8+ is installed: `python --version`
- Ensure port 5000 is not in use by another application

### Frontend Won't Load
- Check that the backend is running on port 5000
- Ensure port 3000 is not in use
- Try clearing your browser cache

### No Data Showing
- Verify your data files are in the correct format
- Check the terminal for any error messages during data processing
- Make sure `backend/processed_data.json` was created

---

## 📊 Data Organization

Your data should be organized like this:

```
Project Root/
├── December/
│   └── Week of 12-1/
│       ├── Belmar/
│       │   └── *.csv
│       ├── Curexa/
│       │   └── *.xlsx
│       └── TPH/
│           └── *.csv
├── January/
│   └── ...
└── ...
```

---

## 🔄 Updating Data

When you add new data files:

1. Place them in the correct folder structure
2. Re-run: `npm run process-data`
3. Refresh your browser

The dashboard will automatically show the updated projections!

---

## 🎨 Features

- **Real-time Updates**: See changes instantly
- **Interactive Charts**: Hover for detailed information
- **Sortable Tables**: Click column headers to sort
- **Trend Analysis**: Automatic calculation of growth/decline
- **Projections**: AI-powered forecasting based on historical trends

---

## 📞 Need Help?

Check the full [README.md](README.md) for:
- Detailed API documentation
- Customization options
- Advanced features
- Contributing guidelines

---

**Happy analyzing! 📈**

