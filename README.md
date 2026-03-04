# TSS Sprite Maker

A powerful, feature-rich desktop application for creating pixel art, sprites, and sprite sheet animations. Built with Electron and React for a smooth, cross-platform experience.

![Version](https://img.shields.io/badge/version-0.0.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)

## ✨ Features

### 🎨 Drawing & Design
- **Multi-Size Canvas** - Choose from 8×8, 16×16, 32×32, or 64×64 pixel grids
- **Versatile Tools**
  - ✏️ **Pen** - Freehand drawing with customizable brush
  - 🧹 **Eraser** - Remove pixels with precision
  - ⛶ **Select** - Select rectangular areas for manipulation
  - ✥ **Move** - Reposition selected content
- **Adjustable Brush Size** - 1 to 8 pixels for fine or broad strokes
- **Full Color Palette** - Color picker with hex code display
- **Canvas Background Color** - Customize workspace color (exports remain transparent)
- **Grid Overlay** - Toggle grid visibility for precise pixel placement

### 🪞 Mirror Drawing
- **X-Axis Mirroring** - Draw symmetrically across horizontal axis
- **Y-Axis Mirroring** - Draw symmetrically across vertical axis
- **Dual Mirroring** - Combine both for perfect symmetry

### 📚 Layer Management
- **Multiple Layers** - Organize artwork across unlimited layers
- **Layer Operations**
  - Add new layers
  - Duplicate existing layers
  - Delete layers (minimum 1 required)
  - Rename layers with custom names
- **Layer Panel** - Visual layer list with active layer highlighting
- **Per-Layer Editing** - Work on individual frames independently

### 🎬 Animation Tools
- **Frame-by-Frame Animation** - Each layer acts as an animation frame
- **Live Animation Preview** - Play animations directly in the editor
- **Adjustable FPS** - Control animation speed (1-60 FPS)
- **Frame Counter** - Track current frame position
- **Play/Pause Controls** - View animations in real-time

### 💾 Import & Export
- **Import Modes**
  - **Single Image** - Import and resize images to fit canvas grid
  - **Sprite Sheet** - Extract frames from existing sprite sheets
- **Export Modes**
  - **Single Layer** - Export individual layer as PNG
  - **Sprite Sheet** - Export all layers as arranged sprite sheet with configurable rows/columns
- **PNG Format** - Export with transparency support
- **Customizable Layout** - Define sprite sheet grid layout (rows/columns)

### ⚡ Productivity Features
- **Undo/Redo** - Full history with up to 50 states
  - Keyboard shortcuts: `Ctrl+Z` (Undo), `Ctrl+Y` or `Ctrl+Shift+Z` (Redo)
- **Copy/Paste** - Duplicate selected content
- **Clear Layer** - Erase current layer
- **Reset All** - Clear all layers with confirmation
- **Collapsible Panels** - Organize workspace with expandable/collapsible sections

### 🔄 Auto-Update System
- **Automatic Update Detection** - Checks GitHub releases on startup
- **User-Controlled Updates** - Choose when to download and install
- **Manual Update Check** - Check for updates via Help menu
- **Seamless Installation** - Updates install on next app restart

### 🖥️ Platform Support
- **Windows** - NSIS installer with desktop shortcuts
- **macOS** - DMG installer (Intel & Apple Silicon)
- **Linux** - AppImage for universal compatibility

## 📥 Installation

### For End Users (Recommended)

Download the latest release for your operating system from the [Releases](https://github.com/TinySprite-Studios/tss_spritemaker/releases) page:

- **Windows**: `TSS-Sprite-Maker-Setup-x.x.x.exe`
  - NSIS installer with guided setup
  - Desktop and Start Menu shortcuts created automatically
  - Choose installation directory
  
- **macOS**: `TSS-Sprite-Maker-x.x.x.dmg`
  - Drag-and-drop installation
  - Supports both Intel and Apple Silicon (M1/M2)
  
- **Linux**: `TSS-Sprite-Maker-x.x.x.AppImage`
  - Universal Linux binary
  - Make executable: `chmod +x TSS-Sprite-Maker-x.x.x.AppImage`
  - Run directly, no installation needed

### For Developers

**Prerequisites:**
- Node.js 16 or higher ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/))

**Setup:**

```bash
# Clone the repository
git clone https://github.com/TinySprite-Studios/tss_spritemaker.git
cd tss_spritemaker

# Install dependencies
npm install

# Start development server
npm start
```

The app will launch automatically with hot-reload enabled for development.

---

## 🎯 Quick Start Guide

### Creating Your First Sprite

1. **Choose Your Canvas Size**
   - Open the "Drawing" section in the toolbar
   - Select your grid size (16×16 recommended for beginners)

2. **Start Drawing**
   - Select the Pen tool (✏️)
   - Pick a color from the color picker
   - Adjust brush size if needed
   - Click and drag on the canvas to draw

3. **Use Advanced Features**
   - Enable Mirror X/Y for symmetrical designs
   - Toggle the grid overlay for precise placement
   - Use different layers for complex artwork

4. **Export Your Work**
   - Open the "Export" section
   - Choose export mode (Single Layer or Sprite Sheet)
   - Click "💾 Save as Sprite" to download PNG

### Creating Animations

1. **Set Up Frames**
   - Each layer represents one animation frame
   - Create multiple layers using the Layers panel
   - Draw each frame of your animation

2. **Preview Animation**
   - Open the "Animation" section
   - Adjust FPS (frames per second) to control speed
   - Click "▶ Play" to preview your animation
   - Frame counter shows current position

3. **Export Animation**
   - Choose "Sprite Sheet" export mode
   - Set the number of rows for layout
   - Export as a single sprite sheet image

### Importing Existing Art

**Single Image:**
1. Select "Single Image" import mode
2. Choose target sprite size
3. Select your image file
4. Image will be resized and imported as a new layer

**Sprite Sheet:**
1. Select "Sprite Sheet" import mode
2. Enter number of horizontal and vertical frames
3. Select your sprite sheet file
4. Each frame will become a separate layer

---

## 🎮 Usage Guide

### Drawing Tools

| Tool | Icon | Shortcut | Description |
|------|------|----------|-------------|
| **Pen** | ✏️ | - | Draw pixels with selected color |
| **Eraser** | 🧹 | - | Remove pixels (make transparent) |
| **Select** | ⛶ | - | Select rectangular area |
| **Move** | ✥ | - | Move selected content |

### Keyboard Shortcuts

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| **Undo** | `Ctrl+Z` | `Cmd+Z` |
| **Redo** | `Ctrl+Y` or `Ctrl+Shift+Z` | `Cmd+Y` or `Cmd+Shift+Z` |

### Toolbar Sections

**Tools**
- Quick access to drawing tools
- Switch between Pen, Eraser, Select, and Move

**Drawing**
- Brush size slider (1-8 pixels)
- Grid size selection (8×8 to 64×64)
- Color picker with hex display
- Canvas background color (visual only, doesn't affect export)

**Modes**
- Mirror X: Horizontal symmetry
- Mirror Y: Vertical symmetry
- Show Grid: Toggle grid lines

**Animation**
- Play/Pause button
- Frame counter display
- FPS slider (1-60)

**Import**
- Import mode selection (Single/Sprite Sheet)
- File browser
- Frame configuration (for sprite sheets)
- Target size selection (for single images)

**Export**
- Export mode (Single Layer/Sprite Sheet)
- Sprite sheet row configuration
- Save button
- Clear and Reset options

### Layer Panel

- **Add Layer**: Create new blank layer
- **Duplicate**: Copy current layer
- **Delete**: Remove layer (minimum 1 required)
- **Rename**: Double-click or click edit icon
- **Select**: Click layer to make it active
- **Reorder**: Layers are frames in animation order

---

## 🛠️ Development

### Project Structure

```
tss_spritemaker/
├── public/
│   ├── electron.js           # Electron main process
│   ├── preload.js           # Preload script for security
│   └── index.html           # HTML template
├── src/
│   ├── components/
│   │   ├── Canvas.js        # Main drawing canvas (Konva)
│   │   ├── Canvas.css       # Canvas styling
│   │   ├── Toolbar.js       # Tools and controls sidebar
│   │   ├── Toolbar.css      # Toolbar styling
│   │   ├── LayersPanel.js   # Layer management UI
│   │   └── LayersPanel.css  # Layer panel styling
│   ├── App.js               # Main application component
│   ├── App.css              # Application styling
│   ├── index.js             # React entry point
│   └── index.css            # Global styles
├── build/                    # Production React build (generated)
├── dist/                     # Electron installers (generated)
├── .github/
│   └── workflows/           # GitHub Actions CI/CD
├── package.json             # Dependencies and scripts
├── README.md               # This file
├── SETUP.md                # Detailed setup guide
├── QUICKSTART.md           # Quick start guide
├── CONTRIBUTING.md         # Contribution guidelines
└── LICENSE                 # MIT License
```

### Technology Stack

| Technology | Purpose |
|------------|---------|
| **Electron** | Cross-platform desktop framework |
| **React** | UI component library |
| **Konva.js** | 2D canvas rendering and interactions |
| **react-konva** | React bindings for Konva |
| **electron-builder** | Package and build installers |
| **electron-updater** | Auto-update functionality |
| **electron-is-dev** | Development environment detection |

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Start Dev** | `npm start` | Launch app with hot-reload |
| **React Dev** | `npm run react-start` | Start React dev server only |
| **Electron Dev** | `npm run electron-start` | Start Electron only |
| **Build All** | `npm run build` | Build production app (Windows) |
| **Build Debug** | `npm run build-debug` | Build with console output |
| **Build Windows** | `npm run build-windows` | Windows NSIS installer |
| **Build macOS** | `npm run build-mac` | macOS DMG installer |
| **Build Linux** | `npm run build-linux` | Linux AppImage |
| **React Build** | `npm run react-build` | Build React app only |
| **Test** | `npm run react-test` | Run React tests |

### Development Workflow

1. **Make Changes**
   ```bash
   # Create feature branch
   git checkout -b feature/your-feature-name
   
   # Start development server
   npm start
   
   # Make your changes with hot-reload active
   ```

2. **Test Changes**
   - Test all modified features
   - Verify on multiple platforms if possible
   - Check for console errors

3. **Build Production**
   ```bash
   # Test production build
   npm run build
   
   # Test the built application from dist/ folder
   ```

4. **Commit and Push**
   ```bash
   git add .
   git commit -m "Add feature: your feature description"
   git push origin feature/your-feature-name
   ```

### Building for Different Platforms

**Windows:**
```bash
npm run build-windows
# Output: dist/TSS Sprite Maker Setup x.x.x.exe
```

**macOS (requires macOS to build):**
```bash
npm run build-mac
# Output: dist/TSS Sprite Maker-x.x.x.dmg
```

**Linux:**
```bash
npm run build-linux
# Output: dist/TSS Sprite Maker-x.x.x.AppImage
```

### Auto-Update Configuration

The app includes automatic update checking via GitHub releases:

1. Update version in `package.json`
2. Commit and create git tag: `git tag v0.x.x`
3. Push tag: `git push origin v0.x.x`
4. Build and upload installers to GitHub Releases
5. Users will be notified of available updates

**Requirements:**
- Repository information in `package.json`
- GitHub releases with proper version tags
- Installers uploaded to releases

**How it works:**
- Checks for updates on app startup (production only)
- Manual check via Help → Check for Updates
- Downloads update in background
- Prompts user to install when ready
- Auto-installs on next app quit if postponed

---

## 📦 Release Process

### Creating a New Release

1. **Update Version**
   ```bash
   # Edit package.json version number
   # Follow semantic versioning: MAJOR.MINOR.PATCH
   ```

2. **Commit Changes**
   ```bash
   git add package.json
   git commit -m "Bump version to x.x.x"
   git push origin main
   ```

3. **Create Git Tag**
   ```bash
   git tag -a v0.x.x -m "Release version 0.x.x"
   git push origin v0.x.x
   ```

4. **Build Installers**
   ```bash
   # Build for your platform
   npm run build-windows  # or build-mac, build-linux
   ```

5. **Create GitHub Release**
   - Go to GitHub → Releases → New Release
   - Select your tag
   - Add release notes
   - Upload installers from `dist/` folder
   - **Important**: Include `latest.yml` (for auto-updates)
   - Publish release

6. **Verify Auto-Update**
   - Install previous version
   - Launch app
   - Verify update notification appears

### Version Numbering

Follow [Semantic Versioning](https://semver.org/):
- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backward compatible
- **PATCH** (0.0.1): Bug fixes, backward compatible

Current version: **0.0.3**

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- 🐛 **Report Bugs** - Found an issue? [Open a bug report](https://github.com/TinySprite-Studios/tss_spritemaker/issues)
- 💡 **Suggest Features** - Have an idea? [Request a feature](https://github.com/TinySprite-Studios/tss_spritemaker/issues)
- 📝 **Improve Documentation** - Help make our docs better
- 💻 **Submit Code** - Fix bugs or implement features
- 🎨 **Share Your Art** - Show us what you've created!

### Contribution Process

1. **Fork the Repository**
   ```bash
   # Fork via GitHub UI, then:
   git clone https://github.com/YOUR_USERNAME/tss_spritemaker.git
   cd tss_spritemaker
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test thoroughly

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Describe your changes clearly
   - Link any related issues

### Code Guidelines

- Use meaningful variable and function names
- Keep components small and focused
- Follow React best practices
- Test on multiple platforms when possible
- Update documentation for new features

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

This project is licensed under the **MIT License**.

**What this means:**
- ✅ Free for personal and commercial use
- ✅ Modify and distribute freely
- ✅ Include in proprietary software
- ✅ No warranty provided
- ℹ️ Must include original license

See [LICENSE](LICENSE) file for full details.

---

## 🗺️ Roadmap

### ✅ Completed Features

- [x] Multi-size canvas support (8×8 to 64×64)
- [x] Drawing tools (Pen, Eraser, Select, Move)
- [x] Customizable brush size
- [x] Full color palette
- [x] Mirror drawing (X/Y axis)
- [x] Grid overlay toggle
- [x] Multiple layers with management
- [x] Layer operations (add, duplicate, delete, rename)
- [x] Undo/Redo with keyboard shortcuts
- [x] Frame-by-frame animation
- [x] Animation preview with FPS control
- [x] Single image import with resizing
- [x] Sprite sheet import
- [x] Single layer export
- [x] Sprite sheet export with layout control
- [x] Auto-update system
- [x] Cross-platform builds

### 🚧 In Progress

- [ ] Shape tools (rectangle, circle, line)
- [ ] Fill bucket tool
- [ ] Eyedropper tool
- [ ] Color palette presets

### 🔮 Planned Features

**Drawing & Editing**
- [ ] Custom brush shapes
- [ ] Gradient tool
- [ ] Transform tools (rotate, flip, scale)
- [ ] Selection tools (lasso, magic wand)
- [ ] Text tool with pixel fonts
- [ ] Dithering patterns

**Workflow**
- [ ] Project file format (.tss)
- [ ] Save/Load projects
- [ ] Recent files list
- [ ] Auto-save functionality
- [ ] Drag-and-drop import
- [ ] Batch export

**Animation**
- [ ] Onion skinning
- [ ] Timeline scrubber
- [ ] Frame duplication
- [ ] Frame reordering
- [ ] Animation export (GIF, APNG)
- [ ] Preview window

**UI/UX**
- [ ] Custom themes (light/dark mode)
- [ ] Customizable keyboard shortcuts
- [ ] Toolbar customization
- [ ] Zoom and pan controls
- [ ] Mini-map navigator
- [ ] Contextual tooltips

**Advanced**
- [ ] Plugin system
- [ ] Tileset generator
- [ ] Sprite outline/border tool
- [ ] Reference image overlay
- [ ] Color palette extraction
- [ ] Pixel-perfect line tool

**Collaboration**
- [ ] Export to popular game engines (Unity, Godot, etc.)
- [ ] Generate sprite metadata (JSON)
- [ ] Integration with version control
- [ ] Cloud save support

### 💡 Feature Requests

Have an idea? [Submit a feature request](https://github.com/TinySprite-Studios/tss_spritemaker/issues/new) on GitHub!

---

## 🆘 Support & Troubleshooting

### Getting Help

- 📚 **Documentation**: Check [SETUP.md](SETUP.md), [QUICKSTART.md](QUICKSTART.md)
- 🐛 **Issues**: [Report bugs or issues](https://github.com/TinySprite-Studios/tss_spritemaker/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/TinySprite-Studios/tss_spritemaker/discussions)

### Common Issues

**App won't start:**
- Check Node.js version (16+ required)
- Delete `node_modules` and run `npm install` again
- Check console for error messages

**Build fails:**
- Ensure all dependencies are installed
- Check disk space for build output
- Windows: Run as administrator if needed

**Auto-update not working:**
- Only works in production builds, not development
- Check internet connection
- Verify GitHub repository is public
- Ensure release includes `latest.yml`

**Import not working:**
- Verify image format (PNG, JPG, GIF supported)
- Check image dimensions
- Ensure sufficient memory for large images

**Performance issues:**
- Close other applications
- Try smaller canvas size (8×8 or 16×16)
- Reduce number of layers
- Disable animation preview when not needed

### System Requirements

**Minimum:**
- OS: Windows 10, macOS 10.13, Ubuntu 18.04 or newer
- RAM: 2 GB
- Disk: 200 MB free space

**Recommended:**
- OS: Windows 11, macOS 12+, Ubuntu 22.04+
- RAM: 4 GB or more
- Disk: 500 MB free space
- Display: 1280×720 or higher

---

## 🙏 Acknowledgments

- **Konva.js** - Powerful 2D canvas library
- **React** - UI framework
- **Electron** - Cross-platform desktop framework
- **electron-builder** - Build and packaging tool
- All contributors and users who provide feedback

---

## 📬 Contact

- **Repository**: [TinySprite-Studios/tss_spritemaker](https://github.com/TinySprite-Studios/tss_spritemaker)
- **Issues**: [GitHub Issues](https://github.com/TinySprite-Studios/tss_spritemaker/issues)
- **Releases**: [GitHub Releases](https://github.com/TinySprite-Studios/tss_spritemaker/releases)

---

## ⭐ Show Your Support

If you find this project useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 🤝 Contributing code
- 📢 Sharing with others

Thank you for using TSS Sprite Maker! Happy pixel art creating! 🎨✨

---

**Made with ❤️ by TinySprite Studios**
