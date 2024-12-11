document.getElementById('inputForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // フォーム送信をキャンセル

    const inputText = document.getElementById('inputText').value;
    const resultMessage = document.getElementById('resultMessage');

    if (!inputText.trim()) {
        resultMessage.textContent = 'Please enter a query.';
        return;
    }

    resultMessage.textContent = 'Loading...';

    try {
        console.log('Sending POST request to /api/gemini with input:', inputText);

        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: inputText }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response from server:', errorData);
            throw new Error(errorData.error || 'API request failed');
        }

        const data = await response.json();
        console.log('Response from server:', data);

        // JSONの中身を加工して表示
        const candidates = data.candidates || [];
        if (candidates.length > 0) {
            resultMessage.textContent = candidates.map(candidate => candidate.content.parts.map(part => part.text).join('\n')).join('\n');
        } else {
            resultMessage.textContent = 'No response from Gemini API.';
        }
    } catch (error) {
        console.error('Client-side error:', error);
        resultMessage.textContent = `Error: ${error.message}`;
    }
});
