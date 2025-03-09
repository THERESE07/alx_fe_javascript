// Array to store quotes
let quotes = [];

// Function to save quotes to Local Storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from Local Storage
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    quotes = storedQuotes.length > 0 ? storedQuotes : [
        { text: "The best way to predict the future is to create it.", category: "Inspiration" },
        { text: "Life is what happens when you're busy making other plans.", category: "Life" },
        { text: "Do or do not. There is no try.", category: "Motivation" }
    ];
}

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
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

// Function to post a quote to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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
    const serverQuotes = await fetchQuotesFromServer();
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
    notifyUser("Quotes synced with server!");
}

// Notify user function
function notifyUser(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove the notification after 5 seconds
    setTimeout(() => document.body.removeChild(notification), 5000);
}

// Function to populate the category filter dropdown dynamically
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    const categories = [...new Set(quotes.map(quote => quote.category))];

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    categoryFilter.value = loadFilterPreference();
}

// Function to filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    saveFilterPreference(selectedCategory);

    const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];

        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `
            <p>${randomQuote.text}</p>
            <small>Category: ${randomQuote.category}</small>
        `;
    } else {
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = "<p>No quotes available in this category.</p>";
    }
}

// Function to save the selected category filter to Local Storage
function saveFilterPreference(category) {
    localStorage.setItem('selectedCategory', category);
}

// Function to load the saved category filter from Local Storage
function loadFilterPreference() {
    return localStorage.getItem('selectedCategory') || 'all';
}

// Function to add a new quote
function addQuote(text, category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    postQuoteToServer(newQuote);

    const feedback = document.getElementById('feedback');
    feedback.textContent = "New quote added successfully!";
    setTimeout(() => (feedback.textContent = ""), 3000);
}

// Function to handle the add quote form
function createAddQuoteForm() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please fill out both fields to add a quote.");
        return;
    }

    addQuote(newQuoteText, newQuoteCategory);

    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', filterQuotes);
document.getElementById('addQuoteButton').addEventListener('click', createAddQuoteForm);

// Load initial data
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    populateCategories();
    filterQuotes();

    // Sync periodically
    setInterval(syncQuotesWithServer, 30000);
});
