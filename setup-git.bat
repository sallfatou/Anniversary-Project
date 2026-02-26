@echo off
setlocal enabledelayedexpansion

REM Set Git path
set GIT="C:\Program Files\Git\bin\git.exe"

REM Change to project directory
cd /d "C:\Users\fatou\Desktop\Anniversary Project"

REM Configure Git user (global)
%GIT% config --global user.email "f.sall@esisa.ac.ma"
%GIT% config --global user.name "Fatou Sall"

REM Initialize Git repository
%GIT% init

REM Add all files
%GIT% add .

REM Create initial commit
%GIT% commit -m "Initial commit: Birthday website for mom"

REM Add remote origin
%GIT% remote add origin https://github.com/sallfatou/Anniversary-Project.git

REM Push to main branch
%GIT% branch -M main
%GIT% push -u origin main

echo.
echo Git setup completed!
echo Project pushed to: https://github.com/sallfatou/Anniversary-Project
pause
