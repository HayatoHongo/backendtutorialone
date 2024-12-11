document.getElementById('inputForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // デフォルトのフォーム送信を無効化

    const inputText = document.getElementById('inputText').value;
    const resultText = document.getElementById('resultText');

    if (!inputText.trim()) {
        resultText.textContent = 'Please enter a query.';
        return;
    }

    resultText.textContent = 'Loading...';

    try {
        const response = await fetch('/api/gemini', {
            method: 'POST', // POST メソッドを指定
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: inputText }), // リクエストボディをJSON形式で送信
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'API request failed');
        }

        const data = await response.json();
        resultText.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Client-side error:', error);
        resultText.textContent = `Error: ${error.message}`;
    }
});
