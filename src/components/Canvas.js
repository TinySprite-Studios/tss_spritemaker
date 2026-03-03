import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';
import './Canvas.css';

const createEmptyGrid = (size) =>
  Array.from({ length: size }, () => Array(size).fill(null));

const Canvas = React.forwardRef((props, ref) => {
  const {
    brushSize,
    brushColor,
    tool,
    gridSize,
    layers,
    setLayers,
    activeLayerId,
    mirrorX,
    mirrorY,
    showGrid,
    isPlaying,
    fps,
    currentFrame,
    setCurrentFrame,
    selection,
    setSelection,
  } = props;

  const stageRef = useRef(null);
  const isDrawing = useRef(false);
  const selectionStart = useRef(null);
  const [currentPointer, setCurrentPointer] = useState(null);
  const [stageSize, setStageSize] = useState({
    width: Math.max(400, window.innerWidth - 560),
    height: Math.max(400, window.innerHeight - 100),
  });

  useEffect(() => {
    const handleResize = () => {
      setStageSize({
        width: Math.max(400, window.innerWidth - 560),
        height: Math.max(400, window.innerHeight - 100),
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isPlaying || layers.length === 0) {
      return;
    }

    const frameInterval = Math.max(1, Math.round(1000 / fps));
    const intervalId = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % layers.length);
    }, frameInterval);

    return () => clearInterval(intervalId);
  }, [isPlaying, fps, layers.length, setCurrentFrame]);

  const boardSize = useMemo(() => {
    const availableWidth = stageSize.width - 40;
    const availableHeight = stageSize.height - 40;
    return Math.max(200, Math.min(availableWidth, availableHeight));
  }, [stageSize.height, stageSize.width]);

  const cellSize = boardSize / gridSize;
  const boardX = (stageSize.width - boardSize) / 2;
  const boardY = (stageSize.height - boardSize) / 2;
  const displayLayer = useMemo(
    () => (isPlaying ? layers[currentFrame] : layers.find((layer) => layer.id === activeLayerId)),
    [activeLayerId, currentFrame, isPlaying, layers]
  );  

  const activeLayer = useMemo(
    () => layers.find((layer) => layer.id === activeLayerId),
    [activeLayerId, layers]
  );

  useEffect(() => {
    if (ref) {
      ref.current = {
        getStage: () => stageRef.current,
        clear: () => {
          setLayers((prevLayers) =>
            prevLayers.map((layer) => ({
              ...layer,
              pixels: layer.id === activeLayerId ? createEmptyGrid(gridSize) : layer.pixels,
            }))
          );
        },
        exportSprite: (mode = 'single') => {
          if (mode === 'single') {
            const exportCanvas = document.createElement('canvas');
            exportCanvas.width = gridSize;
            exportCanvas.height = gridSize;

            const context = exportCanvas.getContext('2d');
            if (!context) {
              return exportCanvas;
            }

            context.clearRect(0, 0, gridSize, gridSize);

            activeLayer?.pixels.forEach((row, rowIdx) => {
              row.forEach((color, colIdx) => {
                if (!color) {
                  return;
                }

                context.fillStyle = color;
                context.fillRect(colIdx, rowIdx, 1, 1);
              });
            });

            return exportCanvas;
          } else if (mode === 'horizontal') {
            const exportCanvas = document.createElement('canvas');
            exportCanvas.width = gridSize * layers.length;
            exportCanvas.height = gridSize;

            const context = exportCanvas.getContext('2d');
            if (!context) {
              return exportCanvas;
            }

            context.clearRect(0, 0, exportCanvas.width, exportCanvas.height);

            layers.forEach((layer, layerIdx) => {
              layer.pixels.forEach((row, rowIdx) => {
                row.forEach((color, colIdx) => {
                  if (!color) {
                    return;
                  }

                  context.fillStyle = color;
                  const xOffset = layerIdx * gridSize;
                  context.fillRect(xOffset + colIdx, rowIdx, 1, 1);
                });
              });
            });

            return exportCanvas;
          } else if (mode === 'vertical') {
            const exportCanvas = document.createElement('canvas');
            exportCanvas.width = gridSize;
            exportCanvas.height = gridSize * layers.length;

            const context = exportCanvas.getContext('2d');
            if (!context) {
              return exportCanvas;
            }

            context.clearRect(0, 0, exportCanvas.width, exportCanvas.height);

            layers.forEach((layer, layerIdx) => {
              layer.pixels.forEach((row, rowIdx) => {
                row.forEach((color, colIdx) => {
                  if (!color) {
                    return;
                  }

                  context.fillStyle = color;
                  const yOffset = layerIdx * gridSize;
                  context.fillRect(colIdx, yOffset + rowIdx, 1, 1);
                });
              });
            });

            return exportCanvas;
          } else if (mode.startsWith('grid')) {
            // Grid layout mode: e.g., 'grid-2' means 2 rows
            const rows = parseInt(mode.split('-')[1]) || 1;
            const cols = Math.ceil(layers.length / rows);
            
            const exportCanvas = document.createElement('canvas');
            exportCanvas.width = gridSize * cols;
            exportCanvas.height = gridSize * rows;

            const context = exportCanvas.getContext('2d');
            if (!context) {
              return exportCanvas;
            }

            context.clearRect(0, 0, exportCanvas.width, exportCanvas.height);

            layers.forEach((layer, layerIdx) => {
              const row = Math.floor(layerIdx / cols);
              const col = layerIdx % cols;
              const xOffset = col * gridSize;
              const yOffset = row * gridSize;

              layer.pixels.forEach((pixelRow, rowIdx) => {
                pixelRow.forEach((color, colIdx) => {
                  if (!color) {
                    return;
                  }

                  context.fillStyle = color;
                  context.fillRect(xOffset + colIdx, yOffset + rowIdx, 1, 1);
                });
              });
            });

            return exportCanvas;
          }

          return document.createElement('canvas');
        },
      };
    }
  }, [activeLayer, activeLayerId, gridSize, layers, ref, setLayers, selection, setSelection]);

  const getCellFromPointer = (pointer) => {
    if (!pointer) {
      return null;
    }

    const localX = pointer.x - boardX;
    const localY = pointer.y - boardY;

    if (localX < 0 || localY < 0 || localX >= boardSize || localY >= boardSize) {
      return null;
    }

    return {
      col: Math.floor(localX / cellSize),
      row: Math.floor(localY / cellSize),
    };
  };

  const paintCell = (row, col) => {
    const value = tool === 'eraser' ? null : brushColor;
    const targetPoints = [{ row, col }];

    if (mirrorX) {
      targetPoints.push({ row, col: gridSize - 1 - col });
    }

    if (mirrorY) {
      targetPoints.push({ row: gridSize - 1 - row, col });
    }

    if (mirrorX && mirrorY) {
      targetPoints.push({ row: gridSize - 1 - row, col: gridSize - 1 - col });
    }

    const uniqueTargets = Array.from(
      new Map(targetPoints.map((point) => [`${point.row}:${point.col}`, point])).values()
    );

    setLayers((prevLayers) =>
      prevLayers.map((layer) => {
        if (layer.id !== activeLayerId) {
          return layer;
        }

        const nextPixels = layer.pixels.map((pixelRow) => [...pixelRow]);
        const radius = Math.floor(brushSize / 2);

        uniqueTargets.forEach((target) => {
          const startRow = target.row - radius;
          const endRow = target.row + (brushSize - radius - 1);
          const startCol = target.col - radius;
          const endCol = target.col + (brushSize - radius - 1);

          for (let currentRow = startRow; currentRow <= endRow; currentRow += 1) {
            if (currentRow < 0 || currentRow >= gridSize) {
              continue;
            }

            for (let currentCol = startCol; currentCol <= endCol; currentCol += 1) {
              if (currentCol < 0 || currentCol >= gridSize) {
                continue;
              }

              nextPixels[currentRow][currentCol] = value;
            }
          }
        });

        return {
          ...layer,
          pixels: nextPixels,
        };
      })
    );
  };

  const handleDraw = (e) => {
    const stage = e.target.getStage();
    const pointer = stage?.getPointerPosition();
    const cell = getCellFromPointer(pointer);

    if (!cell) {
      return;
    }

    paintCell(cell.row, cell.col);
  };

  const handleMouseDown = (e) => {
    const stage = e.target.getStage();
    const pointer = stage?.getPointerPosition();
    const cell = getCellFromPointer(pointer);

    if (!cell) {
      return;
    }

    if (tool === 'select') {
      selectionStart.current = cell;
      isDrawing.current = true;
    } else {
      isDrawing.current = true;
      handleDraw(e);
    }
  };

  const handleMouseMove = (e) => {
    const stage = e.target.getStage();
    const pointer = stage?.getPointerPosition();
    const cell = getCellFromPointer(pointer);

    // Update current pointer for brush preview
    setCurrentPointer(cell);

    if (!isDrawing.current) {
      return;
    }

    if (tool === 'select') {
      if (!cell || !selectionStart.current) {
        return;
      }

      const startRow = Math.min(selectionStart.current.row, cell.row);
      const startCol = Math.min(selectionStart.current.col, cell.col);
      const endRow = Math.max(selectionStart.current.row, cell.row);
      const endCol = Math.max(selectionStart.current.col, cell.col);

      const data = [];
      for (let r = startRow; r <= endRow; r++) {
        const row = [];
        for (let c = startCol; c <= endCol; c++) {
          row.push(activeLayer?.pixels[r]?.[c] || null);
        }
        data.push(row);
      }

      setSelection({
        startRow,
        startCol,
        endRow,
        endCol,
        data,
      });
    } else {
      handleDraw(e);
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    selectionStart.current = null;
  };

  return (
    <div className="canvas-container">
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Layer>
          <Rect x={boardX} y={boardY} width={boardSize} height={boardSize} fill="#101010" />

          {displayLayer?.pixels.map((row, rowIdx) =>
            row.map((color, colIdx) => {
              if (!color) {
                return null;
              }

              return (
                <Rect
                  key={`layer-${displayLayer.id}-${rowIdx}-${colIdx}`}
                  x={boardX + colIdx * cellSize}
                  y={boardY + rowIdx * cellSize}
                  width={cellSize}
                  height={cellSize}
                  fill={color}
                />
              );
            })
          )}

          {showGrid && (
            <>
              {Array.from({ length: gridSize + 1 }).map((_, idx) => (
                <Line
                  key={`v-${idx}`}
                  points={[
                    boardX + idx * cellSize,
                    boardY,
                    boardX + idx * cellSize,
                    boardY + boardSize,
                  ]}
                  stroke="#333"
                  strokeWidth={1}
                />
              ))}

              {Array.from({ length: gridSize + 1 }).map((_, idx) => (
                <Line
                  key={`h-${idx}`}
                  points={[
                    boardX,
                    boardY + idx * cellSize,
                    boardX + boardSize,
                    boardY + idx * cellSize,
                  ]}
                  stroke="#333"
                  strokeWidth={1}
                />
              ))}
            </>
          )}

          {selection && (
            <Rect
              x={boardX + selection.startCol * cellSize}
              y={boardY + selection.startRow * cellSize}
              width={(selection.endCol - selection.startCol + 1) * cellSize}
              height={(selection.endRow - selection.startRow + 1) * cellSize}
              stroke="#00ff00"
              strokeWidth={2}
              fill="rgba(0, 255, 0, 0.1)"
              dash={[5, 5]}
            />
          )}

          {(tool === 'pen' || tool === 'eraser') && currentPointer && !isDrawing.current && (
            <Rect
              x={boardX + (currentPointer.col - Math.floor(brushSize / 2)) * cellSize}
              y={boardY + (currentPointer.row - Math.floor(brushSize / 2)) * cellSize}
              width={brushSize * cellSize}
              height={brushSize * cellSize}
              fill={tool === 'eraser' ? 'rgba(100, 100, 100, 0.3)' : `${brushColor}4d`}
              stroke={tool === 'eraser' ? 'rgba(100, 100, 100, 0.6)' : brushColor}
              strokeWidth={1}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
});

Canvas.displayName = 'Canvas';
export default Canvas;
