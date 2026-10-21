@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (echo Instale Node.js 20+ antes de abrir o site. & pause & exit /b 1)
start "" /b powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process http://localhost:3000"
node serve.js
pause
