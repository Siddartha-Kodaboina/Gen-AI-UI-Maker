import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { updateFile } from '../../services/api';
import './CodeEditor.css';

const CodeEditor = ({ file, content, onChange, onSave }) => {
    const getLanguage = (filename) => {
        if (!filename) return 'plaintext';
        if (filename.endsWith('.html')) return 'html';
        if (filename.endsWith('.css')) return 'css';
        if (filename.endsWith('.js')) return 'javascript';
        return 'plaintext';
    };

    // Debounce function to limit API calls
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Auto-save when content changes
    const handleChange = debounce(async (value) => {
        if (file && value !== content) {
            try {
                await updateFile(file, value);
                onChange?.(value);
                onSave?.();  // Trigger preview refresh
            } catch (error) {
                console.error('Error saving file:', error);
            }
        }
    }, 1000);  // Wait 1 second after last change before saving

    return (
        <div className="code-editor">
            <div className="editor-header">
                {file && <div className="file-tab">{file}</div>}
            </div>
            <div className="editor-container">
                <Editor
                    height="100%"
                    defaultLanguage={getLanguage(file)}
                    value={content}
                    onChange={handleChange}
                    theme="vs-dark"
                    options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        wordWrap: 'on',
                        automaticLayout: true,
                    }}
                />
            </div>
        </div>
    );
};

export default CodeEditor;