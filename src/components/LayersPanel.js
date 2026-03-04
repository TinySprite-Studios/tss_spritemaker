import React, { useState } from 'react';
import './LayersPanel.css';

function LayersPanel({
  layers,
  activeLayerId,
  onSelectLayer,
  onAddLayer,
  onDuplicateLayer,
  onDeleteLayer,
  onRenameLayer,
}) {
  const [renamingLayerId, setRenamingLayerId] = useState(null);
  const [newName, setNewName] = useState('');

  const handleDelete = (e, layerId) => {
    e.stopPropagation();
    if (layers.length > 1 && onDeleteLayer) {
      onDeleteLayer(layerId);
    }
  };

  const handleRenameStart = (e, layerId, currentName) => {
    e.stopPropagation();
    setRenamingLayerId(layerId);
    setNewName(currentName);
  };

  const handleRenameSave = (e, layerId) => {
    e.stopPropagation();
    if (newName.trim() && onRenameLayer) {
      onRenameLayer(layerId, newName.trim());
    }
    setRenamingLayerId(null);
    setNewName('');
  };

  const handleRenameCancel = (e) => {
    e.stopPropagation();
    setRenamingLayerId(null);
    setNewName('');
  };

  const handleKeyDown = (e, layerId) => {
    if (e.key === 'Enter') {
      handleRenameSave(e, layerId);
    } else if (e.key === 'Escape') {
      handleRenameCancel(e);
    }
  };

  return (
    <div className="layers-panel">
      <div className="layers-header">
        <h3>Layers</h3>
        <div className="layer-actions">
          <button onClick={onAddLayer}>+ Add</button>
          <button onClick={onDuplicateLayer}>⎘ Duplicate</button>
        </div>
      </div>

      <div className="layers-list">
        {layers.map((layer, index) => (
          <button
            key={layer.id}
            className={`layer-item ${layer.id === activeLayerId ? 'active' : ''}`}
            onClick={() => onSelectLayer(layer.id)}
          >
            {renamingLayerId === layer.id ? (
              <input
                type="text"
                className="rename-input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, layer.id)}
                onBlur={(e) => handleRenameSave(e, layer.id)}
                maxLength={20}
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className="layer-name">{layer.name}</span>
            )}
            <div className="layer-controls">
              <small>#{index + 1}</small>
              <button
                className="rename-layer-btn"
                onClick={(e) => handleRenameStart(e, layer.id, layer.name)}
                title="Rename layer"
              >
                ✏️
              </button>
              {layers.length > 1 && (
                <button
                  className="delete-layer-btn"
                  onClick={(e) => handleDelete(e, layer.id)}
                  title="Delete layer"
                >
                  🗑️
                </button>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default LayersPanel;
