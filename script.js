const quote = document.getElementById("quote");
const author = document.getElementById("author");

const newQuoteBtn = document.getElementById("newQuote");
const copyBtn = document.getElementById("copyQuote");

const API_URL = "https://dummyjson.com/quotes/random";

// Fetch Quote
async function getQuote() {

    // Show loading message
    quote.style.opacity = "1";
    author.style.opacity = "1";

    quote.textContent = "Finding inspiration...";
    author.textContent = "";

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch quote");
        }

        const data = await response.json();

        // Fade out
        quote.style.opacity = "0";
author.style.opacity = "0";

quote.style.transform = "translateY(20px)";
author.style.transform = "translateY(20px)";

        setTimeout(() => {

            quote.textContent = `"${data.quote}"`;
            author.textContent = `— ${data.author}`;

            // Fade back in
            quote.style.opacity = "1";
author.style.opacity = "1";

quote.style.transform = "translateY(0)";
author.style.transform = "translateY(0)";
        }, 400);

    } catch (error) {

        quote.textContent = "Couldn't load a quote. Please try again.";
        author.textContent = "";

    }

}

// New Quote Button
newQuoteBtn.addEventListener("click", getQuote);

// Load one quote automatically
window.onload = getQuote;

// Copy Button
copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(
        `${quote.textContent}\n${author.textContent}`
    );

    copyBtn.textContent = "Copied ✓";

    setTimeout(() => {
        copyBtn.textContent = "Copy Quote";
    }, 2000);

});