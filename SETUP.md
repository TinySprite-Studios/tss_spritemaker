# TSS Sprite Maker - Setup Guide

## Prerequisites

Before you begin, make sure you have:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- A code editor (VS Code recommended) - [Download](https://code.visualstudio.com/)

## Initial Setup

### 1. Clone or Initialize Repository

If starting fresh:
```bash
cd tss-spritemaker
git init
git add .
git commit -m "Initial commit"
```

Then add your remote:
```bash
git remote add origin https://github.com/yourusername/tss-spritemaker.git
git branch -M main
git push -u origin main
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages from package.json.

### 3. Start Development

```bash
npm start
```

This will:
- Start the React development server on http://localhost:3000
- Launch the Electron app automatically
- Enable hot-reloading for changes

### 4. Build for Distribution

```bash
npm run build
```

This creates:
- Production React build in `/build`
- Electron installers in `/dist` for:
  - Windows (.exe, .msi)
  - macOS (.dmg)
  - Linux (.AppImage, .deb)

## GitHub Setup

### 1. Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Enter repository name: `tss-spritemaker`
3. Choose "Public" (for open source)
4. Create repository

### 2. Initial Push

```bash
git remote add origin https://github.com/yourusername/tss-spritemaker.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Actions

- Go to your repository on GitHub
- Click "Actions" tab
- The workflow will be ready when you create a git tag

## Publishing a Release

### Creating a Release

1. Make your changes and commit
2. Create a git tag:
   ```bash
   git tag -a v0.1.0 -m "Initial release"
   git push origin v0.1.0
   ```

3. Wait for GitHub Actions to build (check Actions tab)
4. Go to "Releases" tab - your release will appear automatically with installers!

### Version Format

Use semantic versioning: `v[MAJOR].[MINOR].[PATCH]`
- `v0.1.0` - Initial release
- `v0.2.0` - Feature update
- `v1.0.0` - Major release

## Troubleshooting

### "npm start" doesn't work

```bash
# Clear cache and reinstall
rm -rf node_modules
npm cache clean --force
npm install
npm start
```

### Port 3000 already in use

Either:
- Kill the process using port 3000
- Or change the port in package.json start script

### Build fails

- Make sure you have Node 16+: `node --version`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check that all files are present (check README for file structure)

### GitHub Actions build fails

Check the Actions tab for error logs. Common issues:
- Node version mismatch
- Missing dependencies
- Platform-specific build issues

## Next Steps

1. Update `package.json` author and repository URL
2. Customize the app in `src/App.js`
3. Update the GitHub repository README with your info
4. Start developing features!

## Useful Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://react.dev)
- [Konva.js Documentation](https://konvajs.org/)
- [electron-builder Documentation](https://www.electron.build/)
