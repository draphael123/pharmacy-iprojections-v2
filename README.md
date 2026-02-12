# Pharmacy Inventory Projection Dashboard

A comprehensive web application for tracking and projecting pharmacy inventory across multiple locations (Belmar, Curexa, and TPH). Features week-by-week and month-over-month analysis with SKU-level breakdowns.

## Features

- 📊 **Real-time Dashboard**: Beautiful, modern UI displaying key metrics
- 📈 **Weekly Projections**: Track inventory trends week by week with predictive analytics
- 📅 **Monthly Overview**: Month-over-month comparison and growth analysis
- 🏷️ **SKU Breakdown**: Detailed analysis of individual SKUs with trend indicators
- 🔮 **Predictive Analytics**: AI-powered projections based on historical data
- 🏥 **Multi-Pharmacy Support**: Switch between different pharmacy locations seamlessly

## Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Beautiful, responsive charts
- **Lucide React** - Modern icon library

### Backend
- **Python 3.8+** - Data processing
- **Flask** - REST API server
- **Pandas** - Data analysis and manipulation
- **NumPy** - Numerical computations

## Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- pip (Python package manager)

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd pharmacy-projections
```

### Step 2: Install Frontend Dependencies
```bash
npm install
```

### Step 3: Install Backend Dependencies
```bash
pip install -r backend/requirements.txt
```

## Usage

### Step 1: Process the Data
Run the data processor to aggregate and analyze all pharmacy data:

```bash
npm run process-data
```

Or manually:
```bash
cd backend
python data_processor.py
```

This will:
- Scan all pharmacy data files (CSV and Excel)
- Aggregate data by week and month
- Calculate projections using moving averages and trend analysis
- Generate a consolidated JSON file

### Step 2: Start the Backend API
In one terminal, start the Flask API server:

```bash
npm run backend
```

Or manually:
```bash
cd backend
python api.py
```

The API will run on `http://localhost:5000`

### Step 3: Start the Frontend
In another terminal, start the React development server:

```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Project Structure

```
pharmacy-projections/
├── backend/
│   ├── data_processor.py      # Data aggregation and projection logic
│   ├── api.py                 # Flask REST API
│   ├── requirements.txt       # Python dependencies
│   └── processed_data.json    # Generated data file (after processing)
├── src/
│   ├── components/
│   │   ├── PharmacySelector.jsx    # Pharmacy dropdown selector
│   │   ├── SummaryCards.jsx        # Dashboard summary cards
│   │   ├── WeeklyChart.jsx         # Weekly projection chart
│   │   ├── MonthlyChart.jsx        # Monthly overview chart
│   │   ├── SKUBreakdown.jsx        # SKU table with sorting
│   │   └── LoadingSpinner.jsx      # Loading indicator
│   ├── App.jsx                # Main application component
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
├── [Month Folders]/          # Your raw data files (organized by month)
│   ├── December/
│   ├── January/
│   ├── February/
│   └── ...
├── package.json
├── vite.config.js
└── README.md
```

## Data Format

The application expects data files organized by month and week:

```
[Month]/
  ├── Week of [Date]/
  │   ├── Belmar/
  │   │   └── *.csv
  │   ├── Curexa/
  │   │   └── *.xlsx
  │   └── TPH/
  │       └── *.csv
```

### Supported Formats

**Belmar CSV**: Must include columns:
- Medication Name, Medication Strength, Medication Form
- Quantity, Invoice Amount
- Invoice Date

**TPH CSV**: Must include columns:
- SKU, Description
- Quantity, Unit Price, Total
- Filled Date

**Curexa Excel**: Must include columns:
- SKU, Description
- Quantity, Unit Price, Total

## API Endpoints

- `GET /api/data` - Get all processed data
- `GET /api/pharmacies` - Get list of pharmacies
- `GET /api/pharmacy/<name>` - Get data for specific pharmacy
- `GET /api/pharmacy/<name>/sku/<sku>` - Get data for specific SKU
- `GET /api/summary` - Get summary statistics
- `GET /api/health` - Health check

## Features Explained

### Projections
The system uses a hybrid approach for projections:
1. **Moving Average**: Calculates average of last 4 weeks
2. **Trend Analysis**: Linear regression on recent data points
3. **Combined Forecast**: Applies trend to moving average for future weeks

### SKU Analysis
- Sortable by quantity, revenue, or trend
- Trend calculation compares recent 4 weeks vs previous 4 weeks
- Visual indicators for growth/decline
- Shows projected vs historical split

### Month-over-Month
- Automatic calculation of growth percentages
- Revenue and quantity tracking
- Visual bar charts with dual metrics

## Troubleshooting

### "Data not found" error
- Make sure you've run `npm run process-data` first
- Check that `backend/processed_data.json` exists
- Verify your data files are in the correct format

### Backend not starting
- Ensure Python dependencies are installed: `pip install -r backend/requirements.txt`
- Check that port 5000 is not already in use
- Verify Python version is 3.8 or higher

### Frontend not loading data
- Ensure the backend is running on port 5000
- Check browser console for errors
- Verify proxy settings in `vite.config.js`

## Development

### Adding New Pharmacies
1. Add data files in the standard folder structure
2. Re-run `npm run process-data`
3. The new pharmacy will automatically appear in the selector

### Customizing Projections
Edit `backend/data_processor.py`, specifically the `calculate_projections()` method to adjust:
- Number of periods to project (`periods_ahead` parameter)
- Moving average window size
- Trend calculation method

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this for your pharmacy operations!

## Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for efficient pharmacy inventory management**

