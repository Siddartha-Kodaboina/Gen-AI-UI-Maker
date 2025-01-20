import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const generateCode = async (prompt) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/generate/`, { prompt });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const getFileContent = async (filename) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/files/`, {
            params: { file: filename }
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const getPreview = async (filename) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/preview/${filename}`);
        return response.data;
    } catch (error) {
        console.error('Preview Error:', error);
        throw error;
    }
};