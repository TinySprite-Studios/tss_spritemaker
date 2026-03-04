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
  exportRows,
  setExportRows,
  onSave,
  onClear,
  onResetAll,
  onImport,
  onCopy,
  onPaste,
  hasSelection,
  canvasBackgroundColor,
  setCanvasBackgroundColor,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
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
    return exportMode === 'single' ? 'Single Layer' : 'Sprite Sheet';
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
              title="Pen"
            >
              ✏️
            </button>
            <button
              className={tool === 'eraser' ? 'active' : ''}
              onClick={() => setTool('eraser')}
              title="Eraser"
            >
              🧹
            </button>
            <button
              className={tool === 'move' ? 'active' : ''}
              onClick={() => setTool('move')}
              title="Move"
            >
              ✥
            </button>
            <button
              className={tool === 'select' ? 'active' : ''}
              onClick={() => setTool('select')}
              title="Select"
            >
              ⛶
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

            <div className="color-pickers-row">
              <div className="subsection">
                <label>Color</label>
                <input
                  type="color"
                  value={brushColor}
                  onChange={(e) => setBrushColor(e.target.value)}
                />
                <span className="color-display">{brushColor}</span>
              </div>

              <div className="subsection">
                <label>Canvas BG <span style={{ fontSize: '10px', opacity: 0.6 }}>(export: transparent)</span></label>
                <input
                  type="color"
                  value={canvasBackgroundColor}
                  onChange={(e) => setCanvasBackgroundColor(e.target.value)}
                />
                <span className="color-display">{canvasBackgroundColor}</span>
              </div>
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
              <option value="spritesheet">Sprite Sheet</option>
            </select>

            {exportMode === 'spritesheet' && (
              <div className="subsection" style={{ marginTop: '10px' }}>
                <label>Sprite Sheet Rows</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={exportRows}
                  onChange={(e) => setExportRows(parseInt(e.target.value) || 1)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#0f0f0f',
                    border: '1px solid #1c1c1c',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                />
                <small style={{ color: '#999', marginTop: '4px', display: 'block' }}>
                  Arranges {totalFrames} layer{totalFrames !== 1 ? 's' : ''} in {exportRows} row{exportRows !== 1 ? 's' : ''} ({Math.ceil(totalFrames / exportRows)} column{Math.ceil(totalFrames / exportRows) !== 1 ? 's' : ''})
                </small>
              </div>
            )}
            <button onClick={onSave} className="save-btn" style={{ marginTop: '10px' }}>
              💾 Save as Sprite
            </button>
          </div>
        )}
      </div>

      {/* Actions - Always visible */}
      <div className="toolbar-section actions-section">
        <button onClick={onClear}>Clear Active Layer</button>
        <button onClick={onResetAll} className="reset-all-btn">
          ⚠️ Reset All
        </button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onCopy} disabled={!hasSelection} title={!hasSelection ? 'Make a selection first' : 'Copy'} style={{ flex: 1 }}>
            📋 Copy
          </button>
          <button onClick={onPaste} disabled={!hasSelection} title={!hasSelection ? 'Copy first' : 'Paste'} style={{ flex: 1 }}>
            📄 Paste
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
