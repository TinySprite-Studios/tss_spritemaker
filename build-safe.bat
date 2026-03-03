@echo off
REM Build script to workaround OneDrive file locking issues
setlocal enabledelayedexpansion

set "SOURCE_DIR=%CD%"
set "BUILD_DIR=C:\temp\tss_spritemaker_build"

echo.
echo TSS Sprite Maker - Safe Build Script
echo =====================================
echo.
echo Source: %SOURCE_DIR%
echo Build location: %BUILD_DIR% (local, not OneDrive synced)
echo.

REM Clean up old build directory
if exist "%BUILD_DIR%" (
    echo Cleaning previous build directory...
    rmdir /s /q "%BUILD_DIR%" >nul 2>&1
    timeout /t 1 /nobreak >nul
)

REM Copy project to build location
echo Copying project to temp location...
xcopy /E /I /Y "%SOURCE_DIR%" "%BUILD_DIR%" >nul 2>&1

REM Navigate to build directory and build
echo Starting build process...
echo.
cd /d "%BUILD_DIR%"
call npm run build-electron
if errorlevel 1 goto build_failed

REM Build succeeded
echo.
echo Build succeeded!
echo.
echo Copying executable back to project...

REM Find exe and copy dist back
cd /d "%SOURCE_DIR%"
if exist "%BUILD_DIR%\dist\*.exe" (
    rmdir /s /q "%SOURCE_DIR%\dist" >nul 2>&1
    timeout /t 1 /nobreak >nul
    xcopy /E /I /Y "%BUILD_DIR%\dist" "%SOURCE_DIR%\dist" >nul 2>&1
    echo Executable created successfully!
    echo Location: %SOURCE_DIR%\dist
    echo.
    dir "%SOURCE_DIR%\dist\*.exe"
) else (
    echo Build completed but executable not found!
    goto cleanup
)

goto cleanup

:build_failed
echo.
echo Build failed!
echo Run: npm run build-debug to see detailed error messages
goto cleanup

:cleanup
echo.
echo Cleaning up temporary build directory...
rmdir /s /q "%BUILD_DIR%" >nul 2>&1
echo Done!
