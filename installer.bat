@echo off
SETLOCAL ENABLEEXTENSIONS

:: Check if Git is installed
git --version 2>nul
if %errorlevel% neq 0 (
    echo Git is not installed. Downloading Git...
    powershell -Command "(New-Object Net.WebClient).DownloadFile('https://github.com/git-for-windows/git/releases/download/v2.45.2.windows.1/Git-2.45.2-64-bit.exe', 'Git-Installer.exe')"
    echo Installing Git...
    start /wait "" Git-Installer.exe /VERYSILENT
    del /f /q Git-Installer.exe
) else (
    echo Git is already installed.
)

:: Check if Node.js is installed
node --version 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed. Downloading Node.js...
    powershell -Command "(New-Object Net.WebClient).DownloadFile('https://nodejs.org/dist/v22.4.1/node-v22.4.1-x64.msi', 'NodeJS-Installer.msi')"
    echo Installing Node.js...
    start /wait "" msiexec /i NodeJS-Installer.msi /qn
    del /f /q NodeJS-Installer.msi
) else (
    echo Node.js is already installed.
)

:: Clone the repository
echo Cloning the repository...
git clone https://github.com/TahaGorme/discord-joiner-and-boost-tool
cd discord-joiner-and-boost-tool
echo Repository cloned and directory changed.

:: Open config.json in discord-joiner-and-boost-tool folder
start config.json


:: Install the dependencies
echo Installing the dependencies...
npm install
echo Dependencies installed.

