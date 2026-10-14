@echo off
echo Starting SwasthyaSathi AI Backend Server (Flask)...
cd /d "%~dp0"
if not exist "backend\venv\Scripts\python.exe" (
    echo Python virtual environment not found in backend\venv.
    echo Please create it using: python -m venv backend\venv
    pause
    exit /b 1
)
call backend\venv\Scripts\python.exe backend\app.py
pause
