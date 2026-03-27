@echo off
REM Quick Setup Script for Marketplace Project (Windows)
REM Run this once to set everything up

echo.
echo ========================================
echo 🚀 Starting Marketplace Project Setup...
echo ========================================
echo.

echo 📦 Installing Frontend Dependencies...
call npm install --silent
echo ✅ Frontend dependencies installed
echo.

echo 📦 Installing Backend Dependencies...
cd backend
call npm install --silent
cd ..
echo ✅ Backend dependencies installed
echo.

echo ========================================
echo ✅ SETUP COMPLETE!
echo ========================================
echo.
echo 🎯 To run the project, open TWO terminals:
echo.
echo Terminal 1 - FRONTEND (Port 3000):
echo    npm run dev
echo.
echo Terminal 2 - BACKEND (Port 5000):
echo    cd backend
echo    npm run dev
echo.
echo 📖 For troubleshooting, read: TROUBLESHOOTING.md
echo.
pause
