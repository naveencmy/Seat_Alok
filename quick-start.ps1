# Quick Start Script for Windows PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Exam Seat Allocation - Quick Start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL is running
Write-Host "Checking PostgreSQL..." -ForegroundColor Yellow
$pgService = Get-Service -Name "postgresql*" -ErrorAction SilentlyContinue
if ($pgService) {
    Write-Host "✓ PostgreSQL service found" -ForegroundColor Green
} else {
    Write-Host "✗ PostgreSQL service not found. Please install PostgreSQL first." -ForegroundColor Red
    exit
}

# Check if database exists
Write-Host "Checking database..." -ForegroundColor Yellow
Write-Host "Make sure you have created the database 'exam_seat_db' in PostgreSQL" -ForegroundColor White

# Backend setup
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up Backend..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

cd backend

if (!(Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✓ Backend dependencies already installed" -ForegroundColor Green
}

if (!(Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "⚠ Please edit backend/.env with your database credentials!" -ForegroundColor Yellow
    Write-Host "Press any key to continue after editing .env..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

Write-Host "Building backend..." -ForegroundColor Yellow
npm run build

Write-Host "Running database migrations..." -ForegroundColor Yellow
npm run db:migrate

if (!(Test-Path "uploads")) {
    Write-Host "Creating uploads directory..." -ForegroundColor Yellow
    mkdir uploads
}

# Frontend setup
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up Frontend..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

cd ../frontend

if (!(Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✓ Frontend dependencies already installed" -ForegroundColor Green
}

# Create admin user
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Start Backend (in one terminal):" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Start Frontend (in another terminal):" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Create admin user:" -ForegroundColor White
Write-Host "   POST http://localhost:5000/api/auth/register" -ForegroundColor Gray
Write-Host "   Body: {\"username\":\"admin\",\"password\":\"admin123\"}" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Open browser:" -ForegroundColor White
Write-Host "   http://localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "Default credentials: admin / admin123" -ForegroundColor Yellow
Write-Host ""

cd ..
