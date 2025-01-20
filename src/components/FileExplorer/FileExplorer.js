import React from 'react';
import './FileExplorer.css';
import { FaHtml5, FaCss3Alt, FaJs, FaFolder } from 'react-icons/fa';

const FileExplorer = ({ files, onFileSelect, selectedFile }) => {
    const getFileIcon = (filename) => {
        if (filename.endsWith('.html')) return <FaHtml5 className="file-icon html" />;
        if (filename.endsWith('.css')) return <FaCss3Alt className="file-icon css" />;
        if (filename.endsWith('.js')) return <FaJs className="file-icon js" />;
        return <FaFolder className="file-icon" />;
    };

    return (
        <div className="file-explorer">
            <div className="file-explorer-header">
                <FaFolder className="folder-icon" />
                <span>Generated Files</span>
            </div>
            <div className="file-list">
                {files.map((file, index) => (
                    <div
                        key={index}
                        className={`file-item ${selectedFile === file ? 'selected' : ''}`}
                        onClick={() => onFileSelect(file)}
                    >
                        {getFileIcon(file)}
                        <span className="file-name">{file}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileExplorer;