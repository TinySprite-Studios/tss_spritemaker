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

if (Test-Path "$buildDir\dist") {
    Remove-Item -Recurse -Force "$buildDir\dist" -ErrorAction SilentlyContinue
}

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

    Get-Process -Name "TSS Sprite Maker" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Get-Process -Name "electron" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    
    $exe = Get-ChildItem "$buildDir\dist\*.exe" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($exe) {
        $dest = "$sourceDir\dist"
        $desktopFallback = "$env:USERPROFILE\Desktop\TSS Sprite Maker Build"
        if (-not (Test-Path $dest)) {
            New-Item -ItemType Directory -Path $dest -Force | Out-Null
        }

        if (Test-Path "$dest\dist") {
            Remove-Item -Recurse -Force "$dest\dist" -ErrorAction SilentlyContinue
        }

        $null = & robocopy "$buildDir\dist" $dest /MIR /R:2 /W:1 /NFL /NDL /NJH /NJS /NP
        if ($LASTEXITCODE -ge 8) {
            Write-Host "Source dist is locked. Copying to Desktop fallback location..." -ForegroundColor Yellow
            if (-not (Test-Path $desktopFallback)) {
                New-Item -ItemType Directory -Path $desktopFallback -Force | Out-Null
            }

            $null = & robocopy "$buildDir\dist" $desktopFallback /MIR /R:2 /W:1 /NFL /NDL /NJH /NJS /NP
            if ($LASTEXITCODE -ge 8) {
                Write-Host "Failed to copy build output to both source and desktop fallback folders." -ForegroundColor Red
                Write-Host "Close any open files from $dest and run again." -ForegroundColor Yellow
            } else {
                Write-Host "Executable: $($exe.Name)" -ForegroundColor Green
                Write-Host "Fallback location: $desktopFallback\" -ForegroundColor Green
            }
        } else {
            Write-Host "Executable: $($exe.Name)" -ForegroundColor Green
            Write-Host "Location: $dest\" -ForegroundColor Green
        }
    } else {
        Write-Host "Executable not found in build output" -ForegroundColor Yellow
    }
} else {
    Write-Host "Build failed!" -ForegroundColor Red
}

Write-Host "Cleaning up..."
Remove-Item -Recurse -Force $buildDir -ErrorAction SilentlyContinue
Write-Host "Done!" -ForegroundColor Green
