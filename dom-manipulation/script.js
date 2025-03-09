// Simulate fetching data from server
async function fetchServerQuotes() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverQuotes = await response.json();
        return serverQuotes.map(quote => ({
            text: quote.title,
            category: "Server Category"
        }));
    } catch (error) {
        console.error("Error fetching quotes from server:", error);
        return [];
    }
}

// Simulate posting data to server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quote)
        });
        const result = await response.json();
        console.log("Quote posted to server:", result);
    } catch (error) {
        console.error("Error posting quote to server:", error);
    }
}

// Sync local data with server periodically
async function syncQuotesWithServer() {
    const serverQuotes = await fetchServerQuotes();
    const localQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');

    // Merge server and local data (server takes precedence)
    const mergedQuotes = [...serverQuotes, ...localQuotes.filter(localQuote =>
        !serverQuotes.some(serverQuote => serverQuote.text === localQuote.text)
    )];

    // Update local storage and UI
    quotes = mergedQuotes;
    saveQuotes();
    populateCategories();
    filterQuotes();

    // Notify user
    notifyUser("Quotes synced with the server.");
}

// Notify user
function notifyUser(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => document.body.removeChild(notification), 5000);
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    populateCategories();
    filterQuotes();

    // Sync periodically
    setInterval(syncQuotesWithServer, 30000);
});
