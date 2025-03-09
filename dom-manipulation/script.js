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

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Save the last viewed quote to session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));

    // Update the DOM
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `
        <p>${randomQuote.text}</p>
        <small>Category: ${randomQuote.category}</small>
    `;
}

// Function to add a new quote
function addQuote(text, category) {
    quotes.push({ text, category });
    saveQuotes(); // Save updated quotes to Local Storage

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

// Function to export quotes to a JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = "quotes.json";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            quotes.push(...importedQuotes);
            saveQuotes(); // Save the imported quotes to Local Storage
            alert("Quotes imported successfully!");
        } catch (error) {
            alert("Invalid JSON format. Please upload a valid file.");
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuoteButton').addEventListener('click', createAddQuoteForm);
document.getElementById('exportQuotes').addEventListener('click', exportToJsonFile);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

// Load initial data
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    showRandomQuote(); // Show the first random quote
});
