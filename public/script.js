document.getElementById('inputForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputText = document.getElementById('inputText').value;
    const resultText = document.getElementById('resultText');

    if (!inputText.trim()) {
        resultText.textContent = 'Please enter a query.';
        return;
    }

    resultText.textContent = 'Loading...';

    try {
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: inputText }),
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        resultText.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        resultText.textContent = `Error: ${error.message}`;
    }
});
