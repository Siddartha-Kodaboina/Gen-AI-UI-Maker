import React, { useState } from 'react';
import { generateCode } from '../../services/api';
import './PromptInput.css';

const PromptInput = ({ onGenerate }) => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        try {
            const response = await generateCode(prompt);
            onGenerate(response);
        } catch (error) {
            console.error('Error generating code:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="prompt-container">
            <form className="prompt-form" onSubmit={handleSubmit}>
                <textarea
                    className="prompt-input"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the UI you want to create..."
                    disabled={loading}
                />
                <button 
                    className="generate-button" 
                    type="submit"
                    disabled={loading || !prompt.trim()}
                >
                    {loading ? 'Generating...' : 'Generate UI'}
                </button>
            </form>
        </div>
    );
};

export default PromptInput;