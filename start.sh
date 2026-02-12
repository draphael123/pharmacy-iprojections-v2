#!/bin/bash

echo "===================================="
echo "Pharmacy Projections Dashboard"
echo "===================================="
echo ""

echo "Step 1: Installing dependencies..."
echo ""

echo "Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi

echo ""
echo "Installing backend dependencies..."
pip install -r backend/requirements.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies"
    exit 1
fi

echo ""
echo "===================================="
echo "Step 2: Processing pharmacy data..."
echo "===================================="
echo ""

cd backend
python data_processor.py
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to process data"
    cd ..
    exit 1
fi
cd ..

echo ""
echo "===================================="
echo "Step 3: Starting servers..."
echo "===================================="
echo ""
echo "Starting backend API on port 5000..."
echo "Starting frontend on port 3000..."
echo ""
echo "The dashboard will open in your browser shortly."
echo ""
echo "Press Ctrl+C to stop the servers."
echo ""

# Start backend in background
cd backend
python api.py &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "===================================="
echo "Setup complete!"
echo "===================================="
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers..."
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait

