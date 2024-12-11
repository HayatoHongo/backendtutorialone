document.getElementById('inputForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // フォーム送信をキャンセル

    const inputText = document.getElementById('inputText').value;
    const resultText = document.getElementById('resultText');

    if (!inputText.trim()) {
        resultText.textContent = 'Please enter a query.';
        return;
    }

    resultText.textContent = 'Loading...';

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
        resultText.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Client-side error:', error);
        resultText.textContent = `Error: ${error.message}`;
    }
});
