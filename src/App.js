import React, { useRef, useState } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import LayersPanel from './components/LayersPanel';
import './App.css';

const createEmptyGrid = (size) =>
  Array.from({ length: size }, () => Array(size).fill(null));

let nextLayerId = 1;

const createLayer = (size, name) => ({
  id: nextLayerId++,
  name,
  pixels: createEmptyGrid(size),
});

function App() {
  const canvasRef = useRef(null);
  const [brushSize, setBrushSize] = useState(1);
  const [brushColor, setBrushColor] = useState('#ffffff');
  const [tool, setTool] = useState('pen');
  const [gridSize, setGridSize] = useState(16);
  const [mirrorX, setMirrorX] = useState(false);
  const [mirrorY, setMirrorY] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  
  const initialLayerId = useRef(null);
  const [layers, setLayers] = useState(() => {
    const initialLayer = createLayer(16, 'Layer 1');
    initialLayerId.current = initialLayer.id;
    return [initialLayer];
  });
  const [activeLayerId, setActiveLayerId] = useState(() => initialLayerId.current);
  
  const [fps, setFps] = useState(8);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [exportMode, setExportMode] = useState('single');
  const [clipboard, setClipboard] = useState(null);
  const [selection, setSelection] = useState(null);

  const handleGridSizeChange = (newGridSize) => {
    setGridSize(newGridSize);
    const baseLayer = createLayer(newGridSize, 'Layer 1');
    setLayers([baseLayer]);
    setActiveLayerId(baseLayer.id);
  };

  const handleAddLayer = () => {
    const nextIndex = layers.length + 1;
    const newLayer = createLayer(gridSize, `Layer ${nextIndex}`);
    setLayers((prevLayers) => [...prevLayers, newLayer]);
    setActiveLayerId(newLayer.id);
  };

  const handleDuplicateLayer = () => {
    const selectedLayer = layers.find((layer) => layer.id === activeLayerId);
    if (!selectedLayer) {
      return;
    }

    const duplicateLayer = {
      id: nextLayerId++,
      name: `${selectedLayer.name} Copy`,
      pixels: selectedLayer.pixels.map((row) => [...row]),
    };

    setLayers((prevLayers) => [...prevLayers, duplicateLayer]);
    setActiveLayerId(duplicateLayer.id);
  };

  const handleDeleteLayer = (layerId) => {
    if (layers.length === 1) {
      return; // Don't delete the last layer
    }

    const layerIndex = layers.findIndex((layer) => layer.id === layerId);
    const newLayers = layers.filter((layer) => layer.id !== layerId);
    
    setLayers(newLayers);
    
    // If we deleted the active layer, select another one
    if (layerId === activeLayerId) {
      const newActiveIndex = Math.min(layerIndex, newLayers.length - 1);
      setActiveLayerId(newLayers[newActiveIndex].id);
    }
  };

  const handleRenameLayer = (layerId, newName) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === layerId ? { ...layer, name: newName } : layer
      )
    );
  };

  const handleCopy = () => {
    if (selection) {
      setClipboard(selection);
    }
  };

  const handlePaste = () => {
    if (!clipboard || !selection) return;
    
    setLayers((prevLayers) =>
      prevLayers.map((layer) => {
        if (layer.id !== activeLayerId) {
          return layer;
        }

        const nextPixels = layer.pixels.map((pixelRow) => [...pixelRow]);
        const { startRow, startCol, data } = clipboard;

        data.forEach((row, rowIdx) => {
          row.forEach((color, colIdx) => {
            const targetRow = startRow + rowIdx;
            const targetCol = startCol + colIdx;

            if (targetRow >= 0 && targetRow < gridSize && targetCol >= 0 && targetCol < gridSize) {
              if (color) {
                nextPixels[targetRow][targetCol] = color;
              }
            }
          });
        });

        return {
          ...layer,
          pixels: nextPixels,
        };
      })
    );
  };

  const handleToolChange = (newTool) => {
    setTool(newTool);
    // Clear selection when switching away from select tool
    if (newTool !== 'select') {
      setSelection(null);
    }
  };

  const handleSaveAsSprite = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.exportSprite(exportMode);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'sprite.png';
      link.click();
    }
  };

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to clear all layers? This cannot be undone.')) {
      setLayers((prevLayers) =>
        prevLayers.map((layer) => ({
          ...layer,
          pixels: createEmptyGrid(gridSize),
        }))
      );
    }
  };

  const handleImportSprite = (file, horizontalFrames, verticalFrames, mode = 'spritesheet', targetDimension = null) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (mode === 'single') {
        // Single image import - resize to target dimension
        const newGridSize = targetDimension || 16;
        setGridSize(newGridSize);
        
        canvas.width = newGridSize;
        canvas.height = newGridSize;
        
        // Draw the image scaled to fit the canvas
        // Use 'contain' scaling to preserve aspect ratio
        const scale = Math.min(newGridSize / img.width, newGridSize / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const offsetX = (newGridSize - scaledWidth) / 2;
        const offsetY = (newGridSize - scaledHeight) / 2;
        
        ctx.clearRect(0, 0, newGridSize, newGridSize);
        ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
        
        const imageData = ctx.getImageData(0, 0, newGridSize, newGridSize);
        const pixels = createEmptyGrid(newGridSize);
        
        for (let y = 0; y < newGridSize; y++) {
          for (let x = 0; x < newGridSize; x++) {
            const idx = (y * newGridSize + x) * 4;
            const r = imageData.data[idx];
            const g = imageData.data[idx + 1];
            const b = imageData.data[idx + 2];
            const a = imageData.data[idx + 3];
            
            if (a > 0) {
              const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
              pixels[y][x] = hex;
            }
          }
        }
        
        const newLayer = {
          id: nextLayerId++,
          name: 'Imported Image',
          pixels: pixels,
        };
        
        setLayers([newLayer]);
        setActiveLayerId(newLayer.id);
        setCurrentFrame(0);
      } else {
        // Sprite sheet import - existing logic
        const frameWidth = Math.floor(img.width / horizontalFrames);
        const frameHeight = Math.floor(img.height / verticalFrames);
        const totalFrames = horizontalFrames * verticalFrames;
        
        // Determine grid size based on frame dimensions
        let newGridSize = Math.max(frameWidth, frameHeight);
        if (newGridSize <= 8) newGridSize = 8;
        else if (newGridSize <= 16) newGridSize = 16;
        else if (newGridSize <= 32) newGridSize = 32;
        else newGridSize = 64;
        
        setGridSize(newGridSize);
        
        const newLayers = [];
        
        for (let row = 0; row < verticalFrames; row++) {
          for (let col = 0; col < horizontalFrames; col++) {
            const frameIndex = row * horizontalFrames + col;
            
            canvas.width = frameWidth;
            canvas.height = frameHeight;
            
            ctx.clearRect(0, 0, frameWidth, frameHeight);
            ctx.drawImage(
              img,
              col * frameWidth,
              row * frameHeight,
              frameWidth,
              frameHeight,
              0,
              0,
              frameWidth,
              frameHeight
            );
            
            const imageData = ctx.getImageData(0, 0, frameWidth, frameHeight);
            const pixels = createEmptyGrid(newGridSize);
            
            for (let y = 0; y < frameHeight && y < newGridSize; y++) {
              for (let x = 0; x < frameWidth && x < newGridSize; x++) {
                const idx = (y * frameWidth + x) * 4;
                const r = imageData.data[idx];
                const g = imageData.data[idx + 1];
                const b = imageData.data[idx + 2];
                const a = imageData.data[idx + 3];
                
                if (a > 0) {
                  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
                  pixels[y][x] = hex;
                }
              }
            }
            
            newLayers.push({
              id: nextLayerId++,
              name: `Frame ${frameIndex + 1}`,
              pixels: pixels,
            });
          }
        }
        
        setLayers(newLayers);
        setActiveLayerId(newLayers[0].id);
        setCurrentFrame(0);
      }
    };
    
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>TSS Sprite Maker</h1>
      </header>
      <div className="app-container">
        <LayersPanel
          layers={layers}
          activeLayerId={activeLayerId}
          onSelectLayer={setActiveLayerId}
          onAddLayer={handleAddLayer}
          onDuplicateLayer={handleDuplicateLayer}
          onDeleteLayer={handleDeleteLayer}
          onRenameLayer={handleRenameLayer}
        />
        <Canvas
          ref={canvasRef}
          brushSize={brushSize}
          brushColor={brushColor}
          tool={tool}
          gridSize={gridSize}
          layers={layers}
          setLayers={setLayers}
          activeLayerId={activeLayerId}
          mirrorX={mirrorX}
          mirrorY={mirrorY}
          showGrid={showGrid}
          isPlaying={isPlaying}
          fps={fps}
          currentFrame={currentFrame}
          setCurrentFrame={setCurrentFrame}
          selection={selection}
          setSelection={setSelection}
        />
        <Toolbar
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          brushColor={brushColor}
          setBrushColor={setBrushColor}
          tool={tool}
          setTool={handleToolChange}
          gridSize={gridSize}
          setGridSize={handleGridSizeChange}
          mirrorX={mirrorX}
          setMirrorX={setMirrorX}
          mirrorY={mirrorY}
          setMirrorY={setMirrorY}
          showGrid={showGrid}
          setShowGrid={setShowGrid}
          fps={fps}
          setFps={setFps}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentFrame={currentFrame}
          totalFrames={layers.length}
          exportMode={exportMode}
          setExportMode={setExportMode}
          onSave={handleSaveAsSprite}
          onClear={handleClear}
          onResetAll={handleResetAll}
          onImport={handleImportSprite}
          onCopy={handleCopy}
          onPaste={handlePaste}
          hasSelection={!!selection}
        />
      </div>
    </div>
  );
}

export default App;
