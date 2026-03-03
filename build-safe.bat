@echo off
REM Build script to workaround OneDrive file locking issues
setlocal enabledelayedexpansion

set "SOURCE_DIR=%CD%"
set "BUILD_DIR=C:\temp\tss_spritemaker_build"
set "SOURCE_DIST=%SOURCE_DIR%\dist"
set "BUILD_DIST=%BUILD_DIR%\dist"
set "DESKTOP_DIST=%USERPROFILE%\Desktop\TSS Sprite Maker Build"

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
if exist "%BUILD_DIST%" rmdir /s /q "%BUILD_DIST%" >nul 2>&1
call npm run build-electron
if errorlevel 1 goto build_failed

REM Build succeeded
echo.
echo Build succeeded!
echo.
echo Copying executable back to project...

REM Find exe and copy dist back
cd /d "%SOURCE_DIR%"
if exist "%BUILD_DIST%\*.exe" (
    taskkill /F /IM "TSS Sprite Maker.exe" >nul 2>&1
    taskkill /F /IM "electron.exe" >nul 2>&1
    if exist "%SOURCE_DIST%\dist" rmdir /s /q "%SOURCE_DIST%\dist" >nul 2>&1
    if not exist "%SOURCE_DIST%" mkdir "%SOURCE_DIST%"
    robocopy "%BUILD_DIST%" "%SOURCE_DIST%" /MIR /R:2 /W:1 /NFL /NDL /NJH /NJS /NP >nul
    if errorlevel 8 (
        echo Source dist is locked. Copying build output to Desktop fallback location...
        if not exist "%DESKTOP_DIST%" mkdir "%DESKTOP_DIST%"
        robocopy "%BUILD_DIST%" "%DESKTOP_DIST%" /MIR /R:2 /W:1 /NFL /NDL /NJH /NJS /NP >nul
        if errorlevel 8 (
            echo Failed to copy build output to both source and desktop fallback folders.
            echo Close any open files from %SOURCE_DIST% and run again.
            goto cleanup
        )
        echo Executable created successfully in fallback location!
        echo Location: %DESKTOP_DIST%
        echo.
        dir "%DESKTOP_DIST%\*.exe"
        goto cleanup
    )
    echo Executable created successfully!
    echo Location: %SOURCE_DIST%
    echo.
    dir "%SOURCE_DIST%\*.exe"
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
