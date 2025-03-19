document.addEventListener("DOMContentLoaded", function () {
    const numLine = document.getElementById("num_line"); // The input field
    const numButtons = document.querySelectorAll(".num-btn"); // Select all number buttons
    const operatorButtons = document.querySelectorAll(".operator-btn"); // Operator buttons
    const equalsButton = document.getElementById("equals"); // Equals button
    const clearButton = document.getElementById("clear"); // Clear button
    const backspaceButton = document.getElementById("backspace"); // Backspace button

    let currentInput = ""; // Stores the input expression

    // Append numbers to the input field
    numButtons.forEach(button => {
        button.addEventListener("click", function () {
            currentInput += this.getAttribute("data-num");
            numLine.value = currentInput;
        });
    });

    // Append operators to the input field
    operatorButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Avoid adding multiple operators in a row
            if (currentInput !== "" && !isNaN(currentInput[currentInput.length -1])) {
                currentInput += this.getAttribute("data-op");
                numLine.value = currentInput;
            }
        });
    });

    // Evaluate the expression when "=" is clicked
    equalsButton.addEventListener("click", function () {
        try {
            currentInput = eval(currentInput); // Evaluate the expression
            numLine.value = currentInput;
        } catch (error) {
            numLine.value = "Error"; // Display error for invalid expressions
            currentInput = "";
        }
    });

    // Backspace button functionality
    backspaceButton.addEventListener("click", function () {
        currentInput = currentInput.slice(0, -1)
        numLine.value = currentInput;
    });

    // Clear button functionality
    clearButton.addEventListener("click", function () {
        numLine.value = ""; // Reset input field
    })
})