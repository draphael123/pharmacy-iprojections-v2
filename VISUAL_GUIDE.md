# 📸 Visual Guide - Dashboard Preview

A text-based walkthrough of what your dashboard looks like and how to use it.

---

## 🎨 Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  HEADER (White background, shadow)                                  │
│  ┌──────┐                                                            │
│  │ 📊  │  Pharmacy Projections Dashboard          [🏥 Pharmacy ▼]  │
│  └──────┘  Real-time inventory tracking                             │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  SUMMARY CARDS (4 Cards in a row)                                   │
│                                                                      │
│  ┏━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━┓  │
│  ┃ 📦         ┃  ┃ 📚         ┃  ┃ 💰         ┃  ┃ 📈         ┃  │
│  ┃            ┃  ┃            ┃  ┃            ┃  ┃            ┃  │
│  ┃ Total SKUs ┃  ┃ Total Qty  ┃  ┃ Revenue    ┃  ┃ Avg Weekly ┃  │
│  ┃    150     ┃  ┃  12,345    ┃  ┃ $125,432   ┃  ┃   2,450    ┃  │
│  ┃  +12% ↗   ┃  ┃  +8.2% ↗  ┃  ┃ +15.3% ↗  ┃  ┃  +5.7% ↗  ┃  │
│  ┗━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━┛  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  CHARTS SECTION (2 Charts side-by-side)                             │
│                                                                      │
│  ┌─────────────────────────┐  ┌─────────────────────────┐          │
│  │ 📅 Weekly Projections   │  │ 📈 Monthly Overview     │          │
│  │                         │  │                         │          │
│  │     ╱╲    ╱╲           │  │     ┃┃┃    ┃┃┃        │          │
│  │    ╱  ╲  ╱  ╲          │  │     ┃┃┃    ┃┃┃        │          │
│  │   ╱    ╲╱    ╲┄┄┄┄▶    │  │  ┃┃┃┃┃┃ ┃┃┃┃┃┃        │          │
│  │  ╱              ▒▒▒▒    │  │  ┃┃┃┃┃┃ ┃┃┃┃┃┃        │          │
│  │ ─────────────────────   │  │ ──────────────────────  │          │
│  │ Oct Nov Dec Jan Feb Mar │  │ Oct  Nov  Dec  Jan Feb  │          │
│  │                         │  │                         │          │
│  │ ━━ Quantity             │  │ ■ Quantity  ■ Revenue   │          │
│  │ ━━ Revenue              │  │                         │          │
│  │ ┄┄ Projected            │  │                         │          │
│  └─────────────────────────┘  └─────────────────────────┘          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  SKU BREAKDOWN TABLE                                                 │
│  📦 SKU Breakdown                                                    │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ SKU ▼          │ Quantity ▲│ Revenue    │ Trend │ Proj/Hist   │ │
│  ├────────────────────────────────────────────────────────────────┤ │
│  │ TESTOSTERONE   │  2,450    │ $12,456.00 │ ↗15.2%│ ████▓▓▓ 35%│ │
│  │ ESTRADIOL 4MG  │  1,890    │ $9,234.50  │ ↗12.8%│ ███▓▓▓▓ 42%│ │
│  │ PROGESTERONE   │  1,650    │ $8,145.00  │ ↘-3.4%│ ██████▓ 15%│ │
│  │ ENCLOMIPHENE   │  1,234    │ $7,890.12  │ ↗8.7% │ █████▓▓ 25%│ │
│  │ ...            │  ...      │ ...        │ ...   │ ...         │ │
│  └────────────────────────────────────────────────────────────────┘ │
│  Showing top 50 of 150 SKUs                                         │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  FOOTER                                                              │
│  Last updated: February 12, 2026 at 9:53 AM                         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Interactive Elements

### 1. Pharmacy Selector (Top Right)

```
┌─────────────────┐
│ 🏥 Belmar    ▼ │  ← Click to open dropdown
└─────────────────┘

When clicked:
┌─────────────────┐
│ 🏥 Belmar    ▼ │
├─────────────────┤
│ ✓ Belmar        │  ← Currently selected
│   Curexa        │  ← Click to switch
│   TPH           │  ← Click to switch
└─────────────────┘
```

**What happens**: Entire dashboard updates with selected pharmacy's data

---

### 2. Summary Cards

```
┏━━━━━━━━━━━━━━━┓
┃ 📦 [Blue bg]  ┃  ← Icon with colored background
┃               ┃
┃ Total SKUs    ┃  ← Metric name (gray text)
┃     150       ┃  ← Large number (black, bold)
┃   +12% ↗     ┃  ← Growth indicator (green)
┗━━━━━━━━━━━━━━━┛

On hover: Card lifts slightly (shadow increases)
```

**Cards included**:
1. **Total SKUs** (Blue) - 📦 Package icon
2. **Total Quantity** (Green) - 📚 Layers icon  
3. **Total Revenue** (Purple) - 💰 Dollar icon
4. **Avg Weekly Quantity** (Orange) - 📈 Trending icon

---

### 3. Weekly Projections Chart

```
┌─────────────────────────────────────┐
│ 📅 Weekly Projections               │
│                                     │
│  3000 ┤                             │
│       │    ╱╲                       │
│  2000 ┤   ╱  ╲  ╱╲    │ Projection │
│       │  ╱    ╲╱  ╲┄┄┄┼┄┄┄┄┄┄┄▶   │
│  1000 ┤ ╱            ▒▒▒▒▒▒▒▒▒▒   │
│       │╱                           │
│     0 └────────────────────────────│
│       Oct  Nov  Dec  Jan  Feb  Mar │
│                                     │
│ Legend:                             │
│ ━━ Quantity (blue line)            │
│ ━━ Revenue (purple line)           │
│ ┄┄ Projected data (dashed)         │
└─────────────────────────────────────┘

On hover over any point:
┌──────────────────┐
│ Week of Dec 8    │
│ Quantity: 2,450  │
│ Revenue: $12,456 │
│ (Projection)     │
└──────────────────┘
```

**Features**:
- Two lines (quantity in blue, revenue in purple)
- Solid lines = historical data
- Dashed lines = projected data
- Vertical reference line marks transition
- Hover any point for details

---

### 4. Monthly Overview Chart

```
┌─────────────────────────────────────┐
│ 📈 Monthly Overview                 │
│                                     │
│      ┃┃   ┃┃   ┃┃   ┃┃   ┃┃       │
│  $   ┃┃   ┃┃   ┃┃   ┃┃   ┃┃       │
│      ┃┃   ┃┃   ┃┃   ┃┃   ┃┃       │
│  12K ┼┼   ┼┼   ┼┼   ┼┼   ┼┼       │
│      ┃┃   ┃┃   ┃┃   ┃┃   ┃┃       │
│   8K ┼┼   ┼┼   ┼┼   ┼┼   ┼┼       │
│      ┃┃   ┃┃   ┃┃   ┃┃   ┃┃       │
│   4K ┼┼   ┼┼   ┼┼   ┼┼   ┼┼       │
│      ┃┃   ┃┃   ┃┃   ┃┃   ┃┃       │
│   0  ────────────────────────      │
│      Sep  Oct  Nov  Dec  Jan       │
│                                     │
│ ■ Quantity (blue bars)              │
│ ■ Revenue (purple bars)             │
└─────────────────────────────────────┘

On hover over any bar:
┌─────────────────┐
│ December 2025   │
│ Quantity: 9,856 │
│ Revenue: $98,456│
│ Growth: +15.3%  │
└─────────────────┘
```

**Features**:
- Grouped bars (quantity and revenue)
- Rounded tops for modern look
- Month-over-month growth calculated automatically
- Hover for detailed breakdown

---

### 5. SKU Breakdown Table

```
┌──────────────────────────────────────────────────────────┐
│ SKU ▼              │ Quantity ▲│ Revenue  │ Trend │ P/H │
├──────────────────────────────────────────────────────────┤
│ TESTOSTERONE 20MG  │   2,450 ▲ │ $12,456  │ ↗15% │████▓│ ← Row
│ ESTRADIOL 4MG      │   1,890 ▲ │ $9,234   │ ↗12% │███▓▓│
│ PROGESTERONE 200MG │   1,650 ▲ │ $8,145   │ ↘-3% │██▓▓▓│
└──────────────────────────────────────────────────────────┘
  ↑                     ↑          ↑          ↑       ↑
  Click to              Click to   Click to   Green   Progress
  sort by SKU           sort by    sort by    = up    bar shows
                        quantity   revenue    Red     projected
                                              = down   portion
```

**Column Details**:

1. **SKU**: Product name/code
   - Click header → sorts alphabetically
   
2. **Quantity**: Total units
   - Click header → sorts by number
   
3. **Revenue**: Total dollars
   - Click header → sorts by amount
   - Formatted with $ and decimals
   
4. **Trend**: Growth/decline %
   - ↗ Green arrow = growing
   - ↘ Red arrow = declining
   - Click header → sorts by trend
   
5. **Projected/Historical**: Visual bar
   - Dark portion = historical data
   - Light portion = projected data
   - Percentage shows projection ratio

**On hover**: Row background changes to light gray

---

## 🎨 Color Scheme

### Primary Colors
```
Blue (Primary):    #0ea5e9  ████  Charts, buttons, icons
Purple (Accent):   #8b5cf6  ████  Revenue line/bars
Green (Success):   #10b981  ████  Positive trends
Red (Warning):     #ef4444  ████  Negative trends
Orange (Quantity): #f97316  ████  Quantity metrics
```

### Background Colors
```
White:            #ffffff  ████  Cards, tables
Light Gray:       #f8fafc  ████  Page background
Gray:             #e5e7eb  ████  Borders, dividers
```

### Text Colors
```
Dark Gray:        #1f2937  ████  Main text
Medium Gray:      #6b7280  ████  Secondary text
Light Gray:       #9ca3af  ████  Tertiary text
```

---

## 📱 Responsive Design

### Desktop (1920px+)
```
┌─────────────────────────────────────────┐
│ [Header with dropdown]                  │
│ [📦] [📚] [💰] [📈]                    │
│ [Chart 50%] | [Chart 50%]              │
│ [Full width table]                      │
└─────────────────────────────────────────┘
```

### Tablet (768px - 1920px)
```
┌────────────────────────┐
│ [Header + dropdown]    │
│ [📦] [📚]            │
│ [💰] [📈]            │
│ [Chart 100%]           │
│ [Chart 100%]           │
│ [Scrollable table]     │
└────────────────────────┘
```

### Mobile (< 768px)
```
┌──────────────┐
│ [Header]     │
│ [Dropdown]   │
│ [📦]        │
│ [📚]        │
│ [💰]        │
│ [📈]        │
│ [Chart]      │
│ [Chart]      │
│ [Table]      │
│ (scroll →)  │
└──────────────┘
```

---

## 🖱️ User Interactions

### 1. Selecting a Pharmacy
```
Action: Click dropdown, select pharmacy
Result: ⚡ Instant update of all components
        - Summary cards recalculate
        - Charts redraw with new data
        - Table updates with new SKUs
        - No page reload needed
```

### 2. Sorting the Table
```
Action: Click "Quantity" column header
Result: 
  1st click → Sort descending (highest first) ▼
  2nd click → Sort ascending (lowest first) ▲
  3rd click → Return to original order
```

### 3. Hovering Charts
```
Action: Mouse over any chart point/bar
Result: Tooltip appears with:
        - Date/period
        - Exact values
        - Additional context
        - Formatted numbers
```

### 4. Scrolling the Page
```
Action: Scroll down
Result: Header remains visible (sticky)
        Smooth scrolling animation
        Charts lazy-load if not visible
```

---

## 🎬 Animation & Transitions

### Card Hover
```
Before:  ┏━━━┓
         ┃   ┃ ← Normal shadow
         ┗━━━┛

After:   ┏━━━┓
         ┃   ┃ ← Larger shadow
          ╚═══╝ ← Lifts slightly
```

### Page Load
```
1. Loading spinner appears (rotating circle)
2. Fade out spinner
3. Fade in components one by one
4. Total time: ~500ms
```

### Chart Animation
```
Lines draw from left to right (0.8s)
Bars grow from bottom to top (0.5s)
Smooth easing curve
```

---

## 🔍 Data Visualization Best Practices

### Why Line Chart for Weekly?
✅ Shows continuous trends over time
✅ Easy to spot patterns and cycles
✅ Clear distinction between actual vs projected

### Why Bar Chart for Monthly?
✅ Compares discrete time periods
✅ Side-by-side comparison of two metrics
✅ Easy to compare month-to-month

### Why Table for SKUs?
✅ Shows precise numbers
✅ Allows sorting and filtering
✅ Displays multiple attributes per SKU

---

## 💡 Usage Tips

### 1. Quick Health Check
**Goal**: "Is everything trending well?"

**Look at**:
- Summary cards: All green arrows? ✅
- Weekly chart: Lines going up? ✅
- Monthly chart: Bars getting taller? ✅

---

### 2. Identify Problems
**Goal**: "What needs attention?"

**Look at**:
- Red trends in SKU table → Declining products
- Flat lines in weekly chart → Stagnant inventory
- Negative growth in monthly → Declining revenue

---

### 3. Plan Ahead
**Goal**: "What do I need next month?"

**Look at**:
- Dashed lines in weekly chart (projections)
- Top SKUs in table (highest quantity)
- Trend column (fast-growing items)

---

## 🎓 Reading the Dashboard

### Example Interpretation

```
Summary Cards show:
  Total SKUs: 150 (+12%)     → Growing product range
  Total Qty: 12,345 (+8.2%)  → Moderate inventory growth
  Revenue: $125K (+15.3%)    → Strong revenue growth
  Avg Weekly: 2,450 (+5.7%)  → Steady demand

Insight: Revenue growing faster than quantity
         → Either prices increased or
         → More expensive products sold
```

```
Weekly Chart shows:
  ━━━━━━━━━━━━━━┃┄┄┄┄┄▶
  Historical   │ Projected
  
  Steady growth from Oct-Dec
  Dip in Jan (post-holiday normal)
  Projected recovery in Feb-Mar

Insight: Seasonal pattern detected
         → Plan accordingly
```

```
SKU Table shows:
  Top SKU: TESTOSTERONE (+15% trend)
  #2 SKU: ESTRADIOL (+12% trend)
  #10 SKU: VITAMIN D (-8% trend)

Insight: Core products growing
         → Stock up on testosterone
         → Monitor vitamin D decline
```

---

## 📊 Screenshot Descriptions

*Note: These describe what you'll see when you run the app*

### Screenshot 1: Dashboard Overview
- Clean white header with blue accents
- Four colorful metric cards in a row
- Two large charts side-by-side
- Professional table at bottom

### Screenshot 2: Weekly Projections Chart
- Smooth blue and purple lines
- X-axis showing months
- Y-axis showing quantities
- Hover tooltip with detailed info
- Dashed projection section

### Screenshot 3: SKU Table Detail
- Sortable column headers
- Green/red trend arrows
- Progress bars in last column
- Clean, readable rows

### Screenshot 4: Mobile View
- Stacked cards (one per row)
- Full-width charts
- Horizontally scrollable table
- Easy touch interactions

---

## 🎉 Final Thoughts

Your dashboard is designed to be:
- **Intuitive**: No training needed
- **Beautiful**: Modern, professional design
- **Fast**: Instant updates, smooth animations
- **Informative**: All key metrics visible
- **Interactive**: Explore your data easily

**Enjoy using your new Pharmacy Projections Dashboard!** 📊✨

---

*For technical details, see PROJECT_STRUCTURE.md*
*For features, see FEATURES.md*
*For setup, see QUICKSTART.md*

