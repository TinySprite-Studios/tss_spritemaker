import React, { useState } from 'react';
import './Toolbar.css';

function Toolbar({
  brushSize,
  setBrushSize,
  brushColor,
  setBrushColor,
  tool,
  setTool,
  gridSize,
  setGridSize,
  mirrorX,
  setMirrorX,
  mirrorY,
  setMirrorY,
  showGrid,
  setShowGrid,
  fps,
  setFps,
  isPlaying,
  setIsPlaying,
  currentFrame,
  totalFrames,
  exportMode,
  setExportMode,
  onSave,
  onClear,
  onResetAll,
  onImport,
  onCopy,
  onPaste,
  hasSelection,
}) {
  const [openSections, setOpenSections] = useState({
    tools: true,
    drawing: true,
    modes: false,
    animation: false,
    import: false,
    export: false,
  });
  
  const [horizontalFrames, setHorizontalFrames] = useState(0);
  const [verticalFrames, setVerticalFrames] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [exportRows, setExportRows] = useState(1);
  const [importMode, setImportMode] = useState('single'); // 'single' or 'spritesheet'
  const [targetDimension, setTargetDimension] = useState(16);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  const handleImportClick = () => {
    if (selectedFile && onImport) {
      if (importMode === 'spritesheet') {
        onImport(selectedFile, horizontalFrames, verticalFrames, 'spritesheet', null);
      } else {
        // Single image import with target dimension
        onImport(selectedFile, 1, 1, 'single', targetDimension);
      }
      setSelectedFile(null);
    }
  };

  const getExportModeDisplay = () => {
    if (exportMode.startsWith('grid')) {
      const rows = parseInt(exportMode.split('-')[1]);
      return `Grid (${rows} row${rows > 1 ? 's' : ''})`;
    }
    return {
      'single': 'Single Layer',
      'horizontal': 'All Layers (Horizontal)',
      'vertical': 'All Layers (Vertical)',
    }[exportMode] || 'Single Layer';
  };

  return (
    <div className="toolbar">
      {/* Tools Section */}
      <div className="toolbar-section">
        <h3 onClick={() => toggleSection('tools')} className="collapsible-header">
          <span>Tools</span>
          <span className="collapse-icon">{openSections.tools ? '▼' : '▶'}</span>
        </h3>
        {openSections.tools && (
          <div className="section-content tool-buttons">
            <button
              className={tool === 'pen' ? 'active' : ''}
              onClick={() => setTool('pen')}
            >
              ✏️ Pen
            </button>
            <button
              className={tool === 'eraser' ? 'active' : ''}
              onClick={() => setTool('eraser')}
            >
              🧹 Eraser
            </button>
            <button
              className={tool === 'select' ? 'active' : ''}
              onClick={() => setTool('select')}
            >
              ⛶ Select
            </button>
          </div>
        )}
      </div>

      {/* Drawing Section */}
      <div className="toolbar-section">
        <h3 onClick={() => toggleSection('drawing')} className="collapsible-header">
          <span>Drawing</span>
          <span className="collapse-icon">{openSections.drawing ? '▼' : '▶'}</span>
        </h3>
        {openSections.drawing && (
          <div className="section-content">
            <div className="subsection">
              <label>Brush Size</label>
              <input
                type="range"
                min="1"
                max="8"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
              />
              <span className="value-display">{brushSize} pixel{brushSize > 1 ? 's' : ''}</span>
            </div>

            <div className="subsection">
              <label>Grid Size</label>
              <select
                value={gridSize}
                onChange={(e) => setGridSize(parseInt(e.target.value))}
              >
                <option value={8}>8x8</option>
                <option value={16}>16x16</option>
                <option value={32}>32x32</option>
                <option value={64}>64x64</option>
              </select>
            </div>

            <div className="subsection">
              <label>Color</label>
              <input
                type="color"
                value={brushColor}
                onChange={(e) => setBrushColor(e.target.value)}
              />
              <span className="color-display">{brushColor}</span>
            </div>
          </div>
        )}
      </div>

      {/* Modes Section */}
      <div className="toolbar-section">
        <h3 onClick={() => toggleSection('modes')} className="collapsible-header">
          <span>Modes</span>
          <span className="collapse-icon">{openSections.modes ? '▼' : '▶'}</span>
        </h3>
        {openSections.modes && (
          <div className="section-content">
            <label className="mode-toggle">
              <span>Mirror X</span>
              <input
                type="checkbox"
                checked={mirrorX}
                onChange={(e) => setMirrorX(e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
            <label className="mode-toggle">
              <span>Mirror Y</span>
              <input
                type="checkbox"
                checked={mirrorY}
                onChange={(e) => setMirrorY(e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
            <label className="mode-toggle">
              <span>Show Grid</span>
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        )}
      </div>

      {/* Animation Section */}
      <div className="toolbar-section">
        <h3 onClick={() => toggleSection('animation')} className="collapsible-header">
          <span>Animation</span>
          <span className="collapse-icon">{openSections.animation ? '▼' : '▶'}</span>
        </h3>
        {openSections.animation && (
          <div className="section-content">
            <div className="animation-controls">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`play-btn ${isPlaying ? 'playing' : ''}`}
              >
                {isPlaying ? '⏸ Stop' : '▶ Play'}
              </button>
              <span className="frame-counter">
                {currentFrame + 1}/{totalFrames}
              </span>
            </div>
            <label className="slider-label">
              <span>FPS</span>
              <input
                type="range"
                min="1"
                max="60"
                value={fps}
                onChange={(e) => setFps(parseInt(e.target.value))}
              />
              <span className="fps-value">{fps}</span>
            </label>
          </div>
        )}
      </div>

      {/* Import Section */}
      <div className="toolbar-section">
        <h3 onClick={() => toggleSection('import')} className="collapsible-header">
          <span>Import</span>
          <span className="collapse-icon">{openSections.import ? '▼' : '▶'}</span>
        </h3>
        {openSections.import && (
          <div className="section-content">
            <div className="subsection">
              <label>Import Mode</label>
              <select
                value={importMode}
                onChange={(e) => setImportMode(e.target.value)}
                className="mode-select"
              >
                <option value="single">Single Image</option>
                <option value="spritesheet">Sprite Sheet</option>
              </select>
            </div>

            <div className="subsection">
              <label>Image File</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="file-input"
              />
              {selectedFile && (
                <span className="file-selected">✓ {selectedFile.name}</span>
              )}
            </div>

            {importMode === 'single' && (
              <div className="subsection">
                <label>Target Sprite Size</label>
                <select
                  value={targetDimension}
                  onChange={(e) => setTargetDimension(parseInt(e.target.value))}
                  className="dimension-select"
                >
                  <option value={8}>8x8</option>
                  <option value={16}>16x16</option>
                  <option value={32}>32x32</option>
                  <option value={64}>64x64</option>
                </select>
                <small style={{ color: '#999', marginTop: '4px', display: 'block' }}>
                  Image will be resized to fit this dimension
                </small>
              </div>
            )}

            {importMode === 'spritesheet' && (
              <div className="subsection">
                <label>Grid Dimensions</label>
                <div className="frame-inputs">
                  <div className="frame-input-group">
                    <span className="input-label">Horizontal</span>
                    <input
                      type="number"
                      min="1"
                      max="32"
                      value={horizontalFrames}
                      onChange={(e) => setHorizontalFrames(parseInt(e.target.value) || 1)}
                      className="frame-count-input"
                    />
                  </div>
                  <div className="frame-input-group">
                    <span className="input-label">Vertical</span>
                    <input
                      type="number"
                      min="1"
                      max="32"
                      value={verticalFrames}
                      onChange={(e) => setVerticalFrames(parseInt(e.target.value) || 1)}
                      className="frame-count-input"
                    />
                  </div>
                </div>
              </div>
            )}

            <button 
              onClick={handleImportClick} 
              disabled={!selectedFile || (importMode === 'spritesheet' && (!horizontalFrames || !verticalFrames))}
              className="import-btn"
            >
              📥 {importMode === 'single' ? 'Import Image' : 'Import Sprite Sheet'}
            </button>
          </div>
        )}
      </div>

      {/* Export Section */}
      <div className="toolbar-section">
        <h3 onClick={() => toggleSection('export')} className="collapsible-header">
          <span>Export</span>
          <span className="collapse-icon">{openSections.export ? '▼' : '▶'}</span>
        </h3>
        {openSections.export && (
          <div className="section-content">
            <label>Mode</label>
            <select
              value={exportMode}
              onChange={(e) => setExportMode(e.target.value)}
            >
              <option value="single">Single Layer</option>
              <option value="horizontal">All Layers (Horizontal)</option>
              <option value="vertical">All Layers (Vertical)</option>
            </select>

            <div className="subsection" style={{ marginTop: '10px' }}>
              <label>Grid Layout</label>
              <select
                value={exportMode.startsWith('grid') ? exportMode : 'grid-1'}
                onChange={(e) => setExportMode(e.target.value)}
              >
                <option value="grid-1">1 row (all layers horizontal)</option>
                <option value="grid-2">2 rows</option>
                <option value="grid-3">3 rows</option>
                <option value="grid-4">4 rows</option>
                <option value="grid-5">5 rows</option>
                <option value="grid-6">6 rows</option>
              </select>
              <small style={{ color: '#999', marginTop: '4px', display: 'block' }}>
                Arranges layers in a grid layout
              </small>
            </div>
          </div>
        )}
      </div>

      {/* Actions - Always visible */}
      <div className="toolbar-section actions-section">
        <button onClick={onClear}>Clear Active Layer</button>
        <button onClick={onResetAll} className="reset-all-btn">
          ⚠️ Reset All
        </button>
        <button onClick={onCopy} disabled={!hasSelection} title={!hasSelection ? 'Make a selection first' : 'Copy'}>
          📋 Copy
        </button>
        <button onClick={onPaste} disabled={!hasSelection} title={!hasSelection ? 'Copy first' : 'Paste'}>
          📄 Paste
        </button>
        <button onClick={onSave} className="save-btn">
          💾 Save as Sprite
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
