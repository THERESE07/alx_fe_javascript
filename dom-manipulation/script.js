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

// Function to save the selected category filter to Local Storage
function saveFilterPreference(category) {
    localStorage.setItem('selectedCategory', category);
}

// Function to load the saved category filter from Local Storage
function loadFilterPreference() {
    return localStorage.getItem('selectedCategory') || 'all';
}

// Function to populate the category filter dropdown dynamically
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Default option

    // Use `map` to extract unique categories and populate the dropdown
    const categories = [...new Set(quotes.map(quote => quote.category))];

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Set the selected category based on saved preference
    categoryFilter.value = loadFilterPreference();
}

// Function to filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    saveFilterPreference(selectedCategory); // Save the selected filter

    // Filter quotes by category or show all if "all" is selected
    const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    // Update the displayed quotes (show the first quote in the filtered list)
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

// Function to add a new quote
function addQuote(text, category) {
    quotes.push({ text, category });
    saveQuotes(); // Save updated quotes to Local Storage
    populateCategories(); // Update the category dropdown

    const feedback = document.getElementById('feedback');
    feedback.textContent = "New quote added successfully!";
    setTimeout(() => (feedback.textContent = ""), 3000); // Clear feedback
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

    // Clear input fields
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', filterQuotes);
document.getElementById('addQuoteButton').addEventListener('click', createAddQuoteForm);

// Load initial data
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    populateCategories(); // Populate categories on page load
    filterQuotes(); // Apply the saved filter on page load
});
