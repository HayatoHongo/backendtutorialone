document.getElementById('api-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userInput = document.getElementById('user-input').value;
    const responseContainer = document.getElementById('response-content');

    if (!userInput) {
        responseContainer.textContent = 'Please provide input.';
        return;
    }

    try {
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input: userInput })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        responseContainer.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        responseContainer.textContent = `Error: ${error.message}`;
    }
});
