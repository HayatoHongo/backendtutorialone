// 1. gemini.js (Server-side API)
const axios = require('axios');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        console.log('Invalid method:', req.method);
        return res.status(405).json({ error: 'Only POST requests are allowed' });
    }

    const { input } = req.body;

    if (!input) {
        console.log('Invalid request body:', req.body);
        return res.status(400).json({ error: 'Missing input in request body' });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    try {
        const response = await axios.post(apiUrl, {
            contents: [{
                parts: [{ text: input }]
            }]
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error calling Gemini API:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch data from Gemini API' });
    }
};

// Save this file as "gemini.js" in the "api" directory
