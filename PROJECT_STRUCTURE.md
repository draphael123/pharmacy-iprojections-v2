# Project Structure & Architecture

Complete guide to understanding the Pharmacy Projections Dashboard codebase.

---

## 📁 Directory Structure

```
pharmacy-projections/
│
├── backend/                          # Python backend services
│   ├── data_processor.py            # Main data processing engine
│   ├── api.py                       # Flask REST API server
│   ├── requirements.txt             # Python dependencies
│   └── processed_data.json          # Generated data (gitignored)
│
├── src/                             # React frontend application
│   ├── components/                  # React components
│   │   ├── PharmacySelector.jsx    # Pharmacy dropdown
│   │   ├── SummaryCards.jsx        # Dashboard metric cards
│   │   ├── WeeklyChart.jsx         # Weekly projections chart
│   │   ├── MonthlyChart.jsx        # Monthly overview chart
│   │   ├── SKUBreakdown.jsx        # SKU table with sorting
│   │   └── LoadingSpinner.jsx      # Loading indicator
│   ├── App.jsx                      # Main application component
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global styles with Tailwind
│
├── [Data Folders]/                  # Your pharmacy data
│   ├── September (not broken up weekly)/
│   ├── October/
│   ├── November/
│   ├── December/
│   ├── January/
│   └── February/
│
├── index.html                       # HTML entry point
├── package.json                     # NPM dependencies & scripts
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
│
├── start.bat                        # Windows quick start script
├── start.sh                         # Mac/Linux quick start script
│
├── README.md                        # Main documentation
├── QUICKSTART.md                    # Quick setup guide
├── FEATURES.md                      # Feature documentation
├── PROJECT_STRUCTURE.md             # This file
│
└── .gitignore                       # Git ignore rules

```

---

## 🔧 Backend Architecture

### `data_processor.py`

**Purpose**: Processes raw pharmacy data files and generates projections

**Key Classes**:

#### `PharmacyDataProcessor`
Main processing engine with these methods:

- **`__init__(data_root)`**: Initialize with data directory path
- **`parse_week_string(week_str)`**: Convert folder names to dates
- **`process_belmar_file(file_path, week_date)`**: Parse Belmar CSV files
- **`process_tph_file(file_path, week_date)`**: Parse TPH CSV files
- **`process_curexa_file(file_path, week_date)`**: Parse Curexa Excel files
- **`scan_and_process_all_data()`**: Main scanning loop
- **`aggregate_by_week(records)`**: Weekly aggregation
- **`aggregate_by_month(records)`**: Monthly aggregation
- **`calculate_projections(df, periods_ahead)`**: Generate future projections
- **`generate_summary_statistics(df)`**: Calculate summary metrics
- **`export_to_json(...)`**: Save processed data

**Data Flow**:
```
Raw Files → Parse → Normalize → Aggregate → Project → Export JSON
```

**Output Format**:
```json
{
  "weekly_data": [...],      // Historical + projected weekly data
  "monthly_data": [...],     // Monthly aggregations
  "summary": {...},          // Summary statistics per pharmacy
  "last_updated": "..."      // Processing timestamp
}
```

---

### `api.py`

**Purpose**: REST API server providing data to frontend

**Framework**: Flask with CORS enabled

**Endpoints**:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/data` | All processed data |
| GET | `/api/pharmacies` | List of pharmacy names |
| GET | `/api/pharmacy/<name>` | Data for specific pharmacy |
| GET | `/api/pharmacy/<name>/sku/<sku>` | SKU-specific data |
| GET | `/api/summary` | Summary statistics |
| GET | `/api/health` | Health check |

**Port**: 5000 (configurable)

**Data Source**: Reads `processed_data.json` file

---

## 🎨 Frontend Architecture

### `App.jsx`

**Purpose**: Main application component and state management

**Key State**:
- `data`: All processed data from API
- `selectedPharmacy`: Currently selected pharmacy
- `loading`: Loading state
- `error`: Error message if any

**Data Flow**:
```
Mount → Fetch API → Set State → Render Components → User Interaction → Update State
```

**Component Tree**:
```
App
├── Header
│   ├── Logo
│   └── PharmacySelector
├── Main
│   ├── SummaryCards
│   ├── Charts Row
│   │   ├── WeeklyChart
│   │   └── MonthlyChart
│   └── SKUBreakdown
└── Footer
```

---

### Component Details

#### `PharmacySelector.jsx`
**Props**:
- `pharmacies`: Array of pharmacy names
- `selected`: Currently selected pharmacy
- `onSelect`: Callback function

**Purpose**: Dropdown to switch between pharmacies

---

#### `SummaryCards.jsx`
**Props**:
- `summary`: Summary statistics object
- `pharmacy`: Pharmacy name

**Purpose**: Display 4 key metric cards

**Cards**:
1. Total SKUs (with Package icon)
2. Total Quantity (with Layers icon)
3. Total Revenue (with DollarSign icon)
4. Avg Weekly Quantity (with TrendingUp icon)

---

#### `WeeklyChart.jsx`
**Props**:
- `data`: Weekly data array

**Purpose**: Interactive line chart showing weekly trends

**Features**:
- Dual Y-axis (quantity & revenue)
- Historical vs projected data
- Reference line separator
- Hover tooltips
- Date formatting

**Library**: Recharts LineChart

---

#### `MonthlyChart.jsx`
**Props**:
- `data`: Monthly data array

**Purpose**: Bar chart showing monthly overview

**Features**:
- Grouped bars (quantity & revenue)
- Month-over-month growth calculation
- Rounded bar tops
- Month/year labels

**Library**: Recharts BarChart

---

#### `SKUBreakdown.jsx`
**Props**:
- `data`: Weekly data array (filtered by SKU)

**Purpose**: Sortable table of all SKUs

**Features**:
- Click column headers to sort
- Trend indicators (up/down arrows)
- Color-coded trends (green/red)
- Projected vs historical progress bar
- Top 50 SKUs shown

**State**:
- `sortBy`: Current sort column
- `sortOrder`: 'asc' or 'desc'
- `expandedSKU`: Currently expanded row (future use)

---

#### `LoadingSpinner.jsx`
**Props**: None

**Purpose**: Loading state indicator

**Features**:
- Animated spinning circle
- Pulsing icon
- Centered layout

---

## 🔄 Data Flow

### Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     RAW DATA FILES                          │
│  (CSV from Belmar & TPH, Excel from Curexa)                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              data_processor.py                              │
│  • Scan directories                                         │
│  • Parse files by pharmacy                                  │
│  • Normalize data formats                                   │
│  • Aggregate by week & month                                │
│  • Calculate projections                                    │
│  • Generate summary stats                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│           processed_data.json                               │
│  {                                                          │
│    "weekly_data": [...],                                    │
│    "monthly_data": [...],                                   │
│    "summary": {...}                                         │
│  }                                                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  api.py (Flask)                             │
│  • Load JSON file                                           │
│  • Serve via REST endpoints                                 │
│  • Filter by pharmacy/SKU                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼ HTTP Request
┌─────────────────────────────────────────────────────────────┐
│              React Frontend (App.jsx)                       │
│  • Fetch data from API                                      │
│  • Manage application state                                 │
│  • Filter by selected pharmacy                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼ Props
┌─────────────────────────────────────────────────────────────┐
│                  UI Components                              │
│  • SummaryCards: Display metrics                            │
│  • WeeklyChart: Visualize trends                            │
│  • MonthlyChart: Show comparisons                           │
│  • SKUBreakdown: List details                               │
└─────────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  USER BROWSER                               │
│  Interactive dashboard with real-time filtering            │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Dependencies

### Backend (`requirements.txt`)

```python
pandas==2.1.4          # Data manipulation and analysis
numpy==1.26.2          # Numerical computations
openpyxl==3.1.2        # Excel file reading
flask==3.0.0           # Web server framework
flask-cors==4.0.0      # Cross-origin resource sharing
python-dateutil==2.8.2 # Date parsing utilities
```

---

### Frontend (`package.json`)

```json
{
  "dependencies": {
    "react": "^18.2.0",           // UI framework
    "react-dom": "^18.2.0",       // React DOM rendering
    "recharts": "^2.10.3",        // Chart library
    "axios": "^1.6.2",            // HTTP client
    "date-fns": "^3.0.6",         // Date utilities
    "lucide-react": "^0.303.0"    // Icon library
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",  // Vite React plugin
    "tailwindcss": "^3.4.0",           // CSS framework
    "autoprefixer": "^10.4.16",        // CSS autoprefixer
    "postcss": "^8.4.32",              // CSS processor
    "vite": "^5.0.8"                   // Build tool
  }
}
```

---

## 🚀 Build & Development

### Development Mode

**Frontend**:
```bash
npm run dev
```
- Runs Vite dev server on port 3000
- Hot module replacement (HMR)
- Source maps enabled
- API proxy to backend

**Backend**:
```bash
npm run backend
```
- Runs Flask in debug mode
- Auto-reload on file changes
- Port 5000

---

### Production Build

```bash
npm run build
```

Creates optimized production build:
- Minified JavaScript
- CSS optimization
- Asset hashing for caching
- Tree shaking for smaller bundle

Output: `dist/` folder

---

### Preview Production Build

```bash
npm run preview
```

Serves production build locally for testing

---

## 🔐 Configuration Files

### `vite.config.js`

```javascript
{
  plugins: [react()],        // React support
  server: {
    port: 3000,             // Dev server port
    proxy: {                // API proxy config
      '/api': 'http://localhost:5000'
    }
  }
}
```

---

### `tailwind.config.js`

```javascript
{
  content: ["./src/**/*.{js,jsx}"],  // Component files
  theme: {
    extend: {
      colors: {
        primary: {...}      // Custom color palette
      }
    }
  }
}
```

---

## 🧪 Testing Strategy

### Manual Testing Checklist

**Data Processing**:
- [ ] All CSV files parsed correctly
- [ ] All Excel files parsed correctly
- [ ] Projections generated
- [ ] JSON output valid

**API**:
- [ ] All endpoints return 200
- [ ] Data format correct
- [ ] CORS working
- [ ] Health check passes

**Frontend**:
- [ ] Dashboard loads without errors
- [ ] Pharmacy selector works
- [ ] Charts render correctly
- [ ] Table sorting works
- [ ] Tooltips appear on hover

---

## 🐛 Debugging Tips

### Backend Issues

**Check data processing**:
```bash
cd backend
python data_processor.py
# Look for "Processed X total records"
```

**Test API directly**:
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/pharmacies
```

**Check logs**:
- Flask prints to console
- Look for error tracebacks

---

### Frontend Issues

**Browser console**:
- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab for failed requests

**React DevTools**:
- Install React DevTools extension
- Inspect component props and state

**Common Issues**:
- API not running → backend error
- CORS errors → check flask-cors
- Data not loading → check network tab

---

## 📈 Performance Optimization

### Backend
- ✅ Pandas vectorized operations
- ✅ Single file write (no multiple I/O)
- ✅ Efficient aggregation with groupby

### Frontend
- ✅ Single API call on mount
- ✅ Client-side filtering (no API calls on pharmacy switch)
- ✅ Memoized chart data (useMemo hooks)
- ✅ Limited table rows (top 50)
- ✅ Lazy rendering with React

### Future Optimizations
- [ ] Implement pagination for SKU table
- [ ] Add data caching with TTL
- [ ] Lazy load charts on scroll
- [ ] Implement virtual scrolling
- [ ] Add service worker for offline

---

## 🔒 Security Considerations

### Current State
- **No authentication**: Open API (suitable for internal use)
- **No data validation**: Trusts input files
- **CORS enabled**: Allows all origins

### Production Recommendations
- [ ] Add JWT authentication
- [ ] Implement rate limiting
- [ ] Validate and sanitize file inputs
- [ ] Restrict CORS to specific origins
- [ ] Add HTTPS support
- [ ] Implement API key system

---

## 🎓 Learning Resources

### For Backend (Python)
- [Pandas Documentation](https://pandas.pydata.org/docs/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [NumPy Documentation](https://numpy.org/doc/)

### For Frontend (React)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/)

### For Data Science
- [Time Series Forecasting](https://otexts.com/fpp3/)
- [Moving Averages](https://en.wikipedia.org/wiki/Moving_average)
- [Linear Regression](https://scikit-learn.org/stable/modules/linear_model.html)

---

## 🤝 Contributing

### Code Style

**Python**:
- PEP 8 style guide
- Type hints preferred
- Docstrings for classes and complex functions

**JavaScript/React**:
- ESLint configuration (if added)
- Functional components with hooks
- Destructured props
- Meaningful variable names

### Adding Features

1. **Backend**: Add to `data_processor.py` or create new module
2. **API**: Add endpoint to `api.py`
3. **Frontend**: Create component in `src/components/`
4. **Document**: Update relevant MD files

---

## 📞 Support

For questions about:
- **Data Structure**: Check this file
- **Setup**: Check `QUICKSTART.md`
- **Features**: Check `FEATURES.md`
- **General**: Check `README.md`

---

**Architecture designed for scalability and maintainability** 🏗️

