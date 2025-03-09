// Array to store quotes, each with a text and category
const quotes = [
    { text: "The best way to predict the future is to create it.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do or do not. There is no try.", category: "Motivation" }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length); // Generate random index
    const randomQuote = quotes[randomIndex];

    // Update the DOM to display the quote
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `
        <p>${randomQuote.text}</p>
        <small>Category: ${randomQuote.category}</small>
    `;
}

// Function to handle the process of adding a new quote
function createAddQuoteForm() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    // Validate input fields
    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please fill out both fields to add a quote.");
        return;
    }

    // Add the new quote to the quotes array
    addQuote(newQuoteText, newQuoteCategory);
}

// Helper function to add the quote to the array and update the DOM
function addQuote(text, category) {
    quotes.push({ text, category });

    // Provide feedback to the user
    const feedback = document.getElementById('feedback');
    feedback.textContent = "New quote added successfully!";
    setTimeout(() => feedback.textContent = "", 3000); // Clear feedback after 3 seconds

    // Clear input fields
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
}

// Event listener to display a new random quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Event listener for the "Add Quote" button
document.getElementById('addQuoteButton').addEventListener('click', createAddQuoteForm);

// Show a random quote on initial page load
document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
});
