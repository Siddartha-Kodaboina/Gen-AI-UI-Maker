import React, { useState } from 'react';
import './Preview.css';

const Preview = ({ previewUrl }) => {
    const [key, setKey] = useState(0);

    const handleRefresh = () => {
        setKey(prev => prev + 1);
    };

    const handleOpenExternal = () => {
        if (previewUrl) {
            window.open(previewUrl, '_blank');
        }
    };

    return (
        <div className="preview-container">
            <div className="preview-header">
                <span>Preview</span>
                <div className="preview-controls">
                    <button 
                        className="control-button refresh" 
                        onClick={handleRefresh}
                    >
                        ↻
                    </button>
                    <button 
                        className="control-button external"
                        onClick={handleOpenExternal}
                    >
                        ⎋
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
                            backgroundColor: 'white'
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