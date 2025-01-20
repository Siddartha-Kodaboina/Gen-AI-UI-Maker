import React, { useState, useEffect } from 'react';
import './Preview.css';

const Preview = ({ previewUrl }) => {
    const [key, setKey] = useState(0);

    // Force refresh the preview
    const refreshPreview = () => {
        setKey(prev => prev + 1);
    };

    // Refresh when previewUrl changes
    useEffect(() => {
        refreshPreview();
    }, [previewUrl]);

    return (
        <div className="preview-container">
            <div className="preview-header">
                <span>Preview</span>
                <div className="preview-controls">
                    <button 
                        className="control-button refresh"
                        onClick={refreshPreview}
                        title="Refresh preview"
                    >
                        ↻
                    </button>
                </div>
            </div>
            <div className="preview-frame">
                {previewUrl ? (
                    <iframe
                        key={key}
                        src={previewUrl}
                        title="Preview"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                        }}
                    />
                ) : (
                    <div className="no-preview">
                        Generate code to see preview
                    </div>
                )}
            </div>
        </div>
    );
};

export default Preview;