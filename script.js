document.addEventListener("DOMContentLoaded", function () {
    const numLine = document.getElementById("num_line"); // The input field
    const numButtons = document.querySelectorAll(".num-btn"); // Select all number buttons
    const operatorButtons = document.querySelectorAll(".operator-btn"); // Operator buttons
    const equalsButton = document.getElementById("equals"); // Equals button
    const clearButton = document.getElementById("clear"); // Clear button
    const backspaceButton = document.getElementById("backspace"); // Backspace button
    const decimalButton = document.getElementById("decimal"); // Decimal button

    let currentInput = ""; // Stores the input expression

    // Append numbers to the input field
    numButtons.forEach(button => {
        button.addEventListener("click", function () {
            currentInput += this.getAttribute("data-num");
            numLine.value = currentInput;
            console.log("Current Input (number):", currentInput);
        });
    });

    decimalButton.addEventListener("click", function () {
        console.log("Decimal button clicked");
        if (currentInput !== "" && !currentInput.includes(".") && !isNaN(currentInput[currentInput.length -1])) {
            currentInput += ".";
            numLine.value = currentInput;
            console.log("Current Input (decimal added):", currentInput);
        } else {
            console.log("Decimal already exists or input is invalid");
        }
    });

    // Append operators to the input field
    operatorButtons.forEach(button => {
        button.addEventListener("click", function () {
            console.log("Operator button clicked");
            // Avoid adding multiple operators in a row
            if (currentInput !== "" && !isNaN(currentInput[currentInput.length -1])) {
                currentInput += this.getAttribute("data-op");
                numLine.value = currentInput;
                console.log("Current Input (operator added):", currentInput);
            }
        });
    });

    // Evaluate the expression when "=" is clicked
    equalsButton.addEventListener("click", function () {
        console.log("Equals button clicked");
        try {
            // Ensure the expression is valid and evaluate it
            let result = eval(currentInput);

            // Check if result is a valid number
            if (isNaN(result)) {
                numLine.value = "Error"; // Display Error if result is NaN
                currentInput = ""; // Clear input
                console.log("Error: Result is not a number");
            } else {
                numLine.value = result; // Display the result
                currentInput = result.toString(); // Convert the result back to a string
                console.log("Result output correctly");
            }
        } catch (error) {
            numLine.value = "Error"; // Display error for invalid expressions
            currentInput = "";
            console.log("Error:", error);
        }
    });

    // Backspace button functionality (removes last character)
    backspaceButton.addEventListener("click", function () {
        console.log("Backspace button clicked");
        currentInput = currentInput.slice(0, -1)
        numLine.value = currentInput;
    });

    // Clear button functionality
    clearButton.addEventListener("click", function () {
        console.log("Clear button clicked");
        currentInput= "";
        numLine.value = "";
    })
})