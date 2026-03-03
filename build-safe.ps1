# Build script to workaround OneDrive file locking issues
param([switch]$ShowOutput)

$sourceDir = Get-Location
$buildDir = "$env:USERPROFILE\Desktop\tss_spritemaker_build"

Write-Host "TSS Sprite Maker - Safe Build Script" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host "Source: $sourceDir"
Write-Host "Build location: $buildDir"
Write-Host ""

# Clean up old build directory
if (Test-Path $buildDir) {
    Write-Host "Cleaning previous build directory..."
    Remove-Item -Recurse -Force $buildDir -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

# Copy project to Desktop
Write-Host "Copying project to Desktop..."
Copy-Item -Recurse $sourceDir $buildDir -Force

# Build on Desktop
Push-Location $buildDir
Write-Host "Starting build process..." -ForegroundColor Cyan
Write-Host ""

if ($ShowOutput) {
    npm run react-build
    npm run build-onedrive
} else {
    npm run react-build 2>&1 | Out-Null
    npm run build-onedrive 2>&1 | Out-Null
}

$success = $LASTEXITCODE -eq 0
Pop-Location

if ($success) {
    Write-Host ""
    Write-Host "Build succeeded!" -ForegroundColor Green
    Write-Host "Copying executable back..."
    
    $exe = Get-ChildItem "$buildDir\dist\*.exe" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($exe) {
        $dest = "$sourceDir\dist"
        if (Test-Path $dest) {
            Remove-Item -Recurse -Force $dest -ErrorAction SilentlyContinue
            Start-Sleep -Seconds 1
        }
        Copy-Item -Recurse "$buildDir\dist" $dest -Force
        Write-Host "Executable: $($exe.Name)" -ForegroundColor Green
        Write-Host "Location: $dest\" -ForegroundColor Green
    } else {
        Write-Host "Executable not found in build output" -ForegroundColor Yellow
    }
} else {
    Write-Host "Build failed!" -ForegroundColor Red
}

Write-Host "Cleaning up..."
Remove-Item -Recurse -Force $buildDir -ErrorAction SilentlyContinue
Write-Host "Done!" -ForegroundColor Green
