import React, { useState } from 'react';
import PromptInput from './components/PromptInput/PromptInput';
import FileExplorer from './components/FileExplorer/FileExplorer';
import CodeEditor from './components/CodeEditor/CodeEditor';
import Preview from './components/Preview/Preview';
import './App.css';

function App() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContents, setFileContents] = useState({});
    const [previewUrl, setPreviewUrl] = useState(null);
    const [previewKey, setPreviewKey] = useState(0);

    const handleGenerate = (response) => {
        if (response && response.files) {
            setFiles(response.files);
            setFileContents(response.contents || {});
            setPreviewUrl(response.previewUrl);
            if (response.files.length > 0) {
                setSelectedFile(response.files[0]);
            }
        }
    };

    const handleFileSelect = (file) => {
        setSelectedFile(file);
    };

    const handleCodeChange = async (value) => {
        if (selectedFile) {
            setFileContents(prev => ({
                ...prev,
                [selectedFile]: value
            }));
        }
    };

    const handlePreviewRefresh = () => {
        setPreviewKey(prev => prev + 1);
    };

    return (
        <div className="app">
            <PromptInput onGenerate={handleGenerate} />
            <div className="main-content">
                <FileExplorer 
                    files={files} 
                    selectedFile={selectedFile}
                    onFileSelect={handleFileSelect}
                />
                <CodeEditor 
                    file={selectedFile}
                    content={fileContents[selectedFile] || ''}
                    onChange={handleCodeChange}
                    onSave={handlePreviewRefresh}
                />
                <Preview 
                    previewUrl={previewUrl} 
                    key={previewKey}
                />
            </div>
        </div>
    );
}

export default App;