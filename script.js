document.addEventListener("DOMContentLoaded", function () {
    const upperNum = document.getElementById("upper_num"); // The upper input field
    const lowerNum = document.getElementById("lower_num"); // The lower input field
    const numButtons = document.querySelectorAll(".num-btn"); // Select all number buttons
    const operatorButtons = document.querySelectorAll(".operator-btn"); // Operator buttons
    const equalsButton = document.getElementById("equals"); // Equals button
    const clearButton = document.getElementById("clear"); // Clear button
    const backspaceButton = document.getElementById("backspace"); // Backspace button
    const decimalButton = document.getElementById("decimal"); // Decimal button
    const posnegButton = document.getElementById("pos-neg"); // Positive/negative toggle button

    let currentInput = ""; // Stores the input expression

    function predictResult() {
        try {
            let result = eval(currentInput);

            if (isNaN(result)) {
                upperNum.value = "";
                console.log("Error, predicted result is not a number");
            } else {
                upperNum.value = result;
                console.log("Result predicted correctly");
            }
        } catch (error) {
            upperNum.value = ""; // Leave upper field blank for invalid expressions
            console.log("Error:", error);
        }
    }

    // Append numbers to the input field
    numButtons.forEach(button => {
        button.addEventListener("click", function () {
            currentInput += this.getAttribute("data-num");
            lowerNum.value = currentInput;
            predictResult();
            console.log("Current Input (number):", currentInput);
        });
    });

    // Add a decimal at the end of the input field
    decimalButton.addEventListener("click", function () {
        console.log("Decimal button clicked");
        if (currentInput !== "" && !currentInput.includes(".") && !isNaN(currentInput[currentInput.length -1])) {
            currentInput += ".";
            lowerNum.value = currentInput;
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
                lowerNum.value = currentInput;
                console.log("Current Input (operator added):", currentInput);
            }
        });
    });

    // Toggle input value between positive and negative
    posnegButton.addEventListener("click", function () {
        console.log("Pos-neg button clicked");
        try {
            let result = currentInput * -1;

            if (isNaN(result)) {
                return;
            } else {
                currentInput = result.toString();
                lowerNum.value = currentInput;
            }
        } catch (error) {
            console.log("Error:", error);
            return;
        }
    })

    // Evaluate the expression when "=" is clicked
    equalsButton.addEventListener("click", function () {
        console.log("Equals button clicked");
        try {
            // Ensure the expression is valid and evaluate it
            let result = eval(currentInput);

            // Check if result is a valid number
            if (isNaN(result)) {
                lowerNum.value = "Error"; // Display Error if result is NaN
                currentInput = ""; // Clear input
                console.log("Error: Result is not a number");
            } else {
                upperNum.value = result; // Display the result
                currentInput = result.toString(); // Convert the result back to a string
                lowerNum.value = currentInput;
                console.log("Result output correctly");
            }
        } catch (error) {
            lowerNum.value = "Error"; // Display error for invalid expressions
            currentInput = "";
            console.log("Error:", error);
        }
    });

    // Backspace button functionality (removes last character)
    backspaceButton.addEventListener("click", function () {
        console.log("Backspace button clicked");
        currentInput = currentInput.slice(0, -1)
        lowerNum.value = currentInput;
    });

    // Clear button functionality (clears input field)
    clearButton.addEventListener("click", function () {
        console.log("Clear button clicked");
        currentInput= "";
        lowerNum.value = "";
    })
})