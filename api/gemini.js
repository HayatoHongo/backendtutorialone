const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

module.exports = async (req, res) => {
    // リクエストメソッド確認
    if (req.method !== 'POST') {
        console.log('Invalid method received:', req.method);
        return res.status(405).json({ error: 'Method not allowed', method: req.method });
    }

    // リクエストボディの確認
    const { input } = req.body;

    if (!input) {
        console.log('Invalid request body:', req.body);
        return res.status(400).json({ error: 'Missing input data', body: req.body });
    }

    // Gemini API呼び出し
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
        console.log('Sending request to Gemini API:', { url: apiUrl, payload });

        const response = await axios.post(apiUrl, payload, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Response from Gemini API:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.log('Error during Gemini API request:', {
            message: error.message,
            response: error.response?.data,
        });
        res.status(500).json({
            error: 'Failed to fetch data from Gemini API',
            details: error.response?.data || error.message,
        });
    }
};
