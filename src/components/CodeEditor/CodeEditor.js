import React from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

const CodeEditor = ({ file, content, onChange }) => {
    const getLanguage = (filename) => {
        if (filename?.endsWith('.html')) return 'html';
        if (filename?.endsWith('.css')) return 'css';
        if (filename?.endsWith('.js')) return 'javascript';
        return 'plaintext';
    };

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
                    onChange={onChange}
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