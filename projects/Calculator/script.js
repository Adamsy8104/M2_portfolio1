// ======================================
// M2 CALCULATOR - JAVASCRIPT
// Built by M2 🚀
// ======================================

// Get HTML elements
const display = document.getElementById("display");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

// Load saved calculation history
let calculationHistory = [];

try {
    const savedHistory = JSON.parse(
        localStorage.getItem("m2-calculation-history") || "[]"
    );

    if (Array.isArray(savedHistory)) {
        calculationHistory = savedHistory.filter(item =>
            item &&
            typeof item.expression === "string" &&
            typeof item.answer === "string"
        ).slice(0, 10);
    }
} catch (error) {
    calculationHistory = [];
}

// ======================================
// APPEND VALUE
// ======================================

function appendValue(value) {
    if (
        display.value === "Math error" ||
        display.value === "Invalid input"
    ) {
        display.value = "";
    }

    display.value += value;
}

// ======================================
// CLEAR DISPLAY
// ======================================

function clearDisplay() {
    display.value = "";
}

// ======================================
// DELETE LAST CHARACTER
// ======================================

function deleteLast() {
    if (
        display.value === "Math error" ||
        display.value === "Invalid input"
    ) {
        clearDisplay();
        return;
    }

    display.value = display.value.slice(0, -1);
}

// ======================================
// CALCULATE RESULT
// ======================================

function calculate() {
    const expression = display.value.trim();

    if (!expression) return;

    // Allow only calculator characters
    if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
        display.value = "Invalid input";
        return;
    }

    // Check for an acceptable starting character
    if (!/^[0-9.(]/.test(expression)) {
        display.value = "Math error";
        return;
    }

    try {
        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        // Reject invalid mathematical results
        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {
            display.value = "Math error";
            return;
        }

        // Format the result
        const answer = Number(
            result.toPrecision(12)
        ).toString();

        // Add calculation to history
        calculationHistory.unshift({
            expression: expression,
            answer: answer
        });

        // Keep only the latest 10 calculations
        calculationHistory = calculationHistory.slice(0, 10);

        // Save and display history
        renderHistory();

        // Display answer
        display.value = answer;

    } catch (error) {
        display.value = "Math error";
    }
}

// ======================================
// DISPLAY AND SAVE HISTORY
// ======================================

function renderHistory() {
    // Save history in browser storage
    try {
        localStorage.setItem(
            "m2-calculation-history",
            JSON.stringify(calculationHistory)
        );
    } catch (error) {
        console.warn("Could not save calculation history.");
    }

    // Clear previous history display
    historyList.replaceChildren();

    // Show message if history is empty
    if (calculationHistory.length === 0) {
        const item = document.createElement("li");
        item.textContent = "No calculations yet.";
        historyList.appendChild(item);
        return;
    }

    // Display saved calculations
    calculationHistory.forEach(function (calculation) {
        const item = document.createElement("li");

        item.textContent =
            calculation.expression + " = " + calculation.answer;

        historyList.appendChild(item);
    });
}

// ======================================
// CLEAR HISTORY
// ======================================

function clearHistory() {
    calculationHistory = [];
    renderHistory();
}

// Connect Clear History button
if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", clearHistory);
}

// ======================================
// KEYBOARD SUPPORT
// ======================================

document.addEventListener("keydown", function (event) {
    // Numbers and calculator operators
    if (/^[0-9+\-*/%.()]$/.test(event.key)) {
        appendValue(event.key);
    }

    // Calculate using Enter or =
    else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculate();
    }

    // Delete the last character
    else if (event.key === "Backspace") {
        deleteLast();
    }

    // Clear the display using Escape
    else if (event.key === "Escape") {
        clearDisplay();
    }
});

// ======================================
// INITIALIZE CALCULATOR
// ======================================

renderHistory();

console.log("M2 Calculator loaded successfully! 🚀");