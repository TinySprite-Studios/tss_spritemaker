# TSS Sprite Maker

A feature-rich desktop application for creating 2D images and saving them as sprites. Built with Electron and React.

## Features

- **Free Drawing Canvas** - Draw sprites with a smooth, responsive canvas
- **Customizable Brush** - Adjust brush size and color in real-time
- **Eraser Tool** - Remove parts of your drawing with the eraser
- **Export as PNG** - Save your creations as sprite images
- **Cross-Platform** - Runs on Windows, macOS, and Linux

## Installation

### From Releases (Recommended)

Download the latest release for your operating system:
- **Windows**: `TSS-Sprite-Maker-Setup-x.x.x.exe` or `TSS-Sprite-Maker-x.x.x.exe`
- **macOS**: `TSS-Sprite-Maker-x.x.x.dmg`
- **Linux**: `TSS-Sprite-Maker-x.x.x.AppImage`

### From Source

**Requirements:**
- Node.js 16+ 
- npm or yarn

1. Clone the repository
```bash
git clone https://github.com/yourusername/tss-spritemaker.git
cd tss-spritemaker
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm start
```

4. Build for production
```bash
npm run build
```

## Usage

1. **Launch the Application**
   - Open the TSS Sprite Maker application

2. **Draw Your Sprite**
   - Use the Pen tool to draw on the canvas
   - Adjust brush size and color from the toolbar

3. **Edit Your Creation**
   - Use the Eraser tool to remove parts of your drawing
   - Click "Clear" to start over

4. **Save Your Sprite**
   - Click "Save as Sprite" to export as PNG

## Development

### Project Structure
```
tss-spritemaker/
├── public/
│   ├── electron.js        # Electron main process
│   ├── preload.js         # Electron preload script
│   └── index.html         # HTML template
├── src/
│   ├── components/        # React components
│   │   ├── Canvas.js      # Drawing canvas component
│   │   └── Toolbar.js     # Tools and controls
│   ├── App.js            # Main app component
│   └── index.js          # React entry point
├── .github/
│   └── workflows/        # GitHub Actions workflows
├── package.json          # Project dependencies
└── README.md            # This file
```

### Available Scripts

- `npm start` - Start development with hot reload
- `npm run react-start` - Start React dev server only
- `npm run electron-start` - Start Electron only
- `npm run build` - Build for production (all platforms)
- `npm run build-windows` - Build Windows installer
- `npm run build-mac` - Build macOS DMG
- `npm run build-linux` - Build Linux AppImage

## Release Process

1. Make sure all changes are committed
2. Create a git tag:
   ```bash
   git tag -a v0.2.0 -m "Release version 0.2.0"
   git push origin v0.2.0
   ```
3. GitHub Actions will automatically build and create a release with installers

## Technologies

- **Electron** - Cross-platform desktop framework
- **React** - UI library
- **Konva.js** - 2D drawing library
- **electron-builder** - Package and build installers

## License

MIT - Feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Roadmap

- [ ] Undo/Redo functionality
- [ ] Layer support
- [ ] More drawing tools (shapes, text, etc.)
- [ ] Brush presets
- [ ] Animation tool for sprite sheets
- [ ] File open/save with project format
- [ ] Color picker improvements
- [ ] Grid overlay option

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
