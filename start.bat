@echo off
echo ====================================
echo Pharmacy Projections Dashboard
echo ====================================
echo.

echo Step 1: Installing dependencies...
echo.

echo Installing frontend dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo Installing backend dependencies...
call pip install -r backend\requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo ====================================
echo Step 2: Processing pharmacy data...
echo ====================================
echo.

cd backend
call python data_processor.py
if errorlevel 1 (
    echo ERROR: Failed to process data
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo ====================================
echo Step 3: Starting servers...
echo ====================================
echo.
echo Starting backend API on port 5000...
echo Starting frontend on port 3000...
echo.
echo The dashboard will open in your browser shortly.
echo.
echo Press Ctrl+C in each window to stop the servers.
echo.

start "Backend API" cmd /k "cd backend && python api.py"
timeout /t 3 /nobreak > nul
start "Frontend" cmd /k "npm run dev"

echo.
echo ====================================
echo Setup complete!
echo ====================================
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Both servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
pause

