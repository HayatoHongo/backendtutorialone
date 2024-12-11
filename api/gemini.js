const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        console.log('Invalid method:', req.method);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { input } = req.body;

    if (!input) {
        console.log('Invalid request body:', req.body);
        return res.status(400).json({ error: 'Missing input data' });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
    const payload = {
        contents: [
            {
                parts: [
                    {
                        text: input
                    }
                ]
            }
        ]
    };

    try {
        const response = await axios.post(apiUrl, payload, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log('API request failed:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from Gemini API' });
    }
};
