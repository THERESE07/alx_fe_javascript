// Array to store quotes, each with a text and category
const quotes = [
    { text: "The best way to predict the future is to create it.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do or do not. There is no try.", category: "Motivation" }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length); // Generate a random index
    const randomQuote = quotes[randomIndex];

    // Clear previous content in the quote display
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = "";

    // Create and append paragraph for the quote text
    const quoteText = document.createElement('p');
    quoteText.textContent = randomQuote.text;
    quoteDisplay.appendChild(quoteText);

    // Create and append a small element for the category
    const quoteCategory = document.createElement('small');
    quoteCategory.textContent = `Category: ${randomQuote.category}`;
    quoteDisplay.appendChild(quoteCategory);
}

// Function to create and process the form for adding quotes
function createAddQuoteForm() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    // Validate input fields
    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please fill out both fields to add a quote.");
        return;
    }

    // Add the new quote using helper function
    addQuote(newQuoteText, newQuoteCategory);
}

// Function to add a new quote and update the DOM
function addQuote(text, category) {
    quotes.push({ text, category }); // Add quote to the array

    // Provide feedback to the user
    const feedback = document.getElementById('feedback');
    feedback.textContent = "New quote added successfully!";
    setTimeout(() => feedback.textContent = "", 3000); // Clear feedback after 3 seconds

    // Clear input fields
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
}

// Event listener to show a new random quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Event listener for the "Add Quote" button
document.getElementById('addQuoteButton').addEventListener('click', createAddQuoteForm);

// Show a random quote when the page loads
document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
});
