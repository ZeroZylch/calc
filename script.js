document.addEventListener("DOMContentLoaded", function () {
    // #region Button and Input Field Variables
    const upperNum = document.getElementById("upper_num"); // The upper input field
    const lowerNum = document.getElementById("lower_num"); // The lower input field
    const message = document.getElementById("message"); // Message line under input field
    const numButtons = document.querySelectorAll(".num-btn"); // Select all number buttons
    const operatorButtons = document.querySelectorAll(".operator-btn"); // Operator buttons
    const equalsButton = document.getElementById("equals"); // Equals button
    const clearButton = document.getElementById("clear"); // Clear button
    const backspaceButton = document.getElementById("backspace"); // Backspace button
    const decimalButton = document.getElementById("decimal"); // Decimal button
    const posnegButton = document.getElementById("pos-neg"); // Positive/negative toggle button
    const percentageButton = document.getElementById("percentage"); // Percentage button
    const parenthesesButton = document.getElementById("parentheses"); // Parentheses button
    // #endregion

    // #region Document Variables
    let currentInput = ""; // Stores the input expression
    const maxDigits = 15; // Stores maximum digits that may appear in input field
    equalsClicked = false; // Stores whether the equals button was just clicked (for resetting input field)
    // #endregion

    // #region Messages
    messagesArr = [
        "Hey, cool number",
        "Whoa mama nice number crunchin\'",
        "WOW",
        "I love math, don't you?",
        "You calculated that like a BOSS",
        "Impressive digits!",
        "Numbers are so wild",
        "Dang, this result is crazy",
        "A perfectly cromulent number",
        "Mmm delicious math",
        "You did it!",
        "OHHH YEAAAH",
        "Yup, you just did that",
        "All this math is making me hungry",
        "Does this number look... edible to you?",
        "Good golly, what a NUMBER",
        "Now that's what I call a calculation!",
        "You calculated that so good",
        "Can't stop, won't stop",
        "Yup, now that's a fabulous number",
        "I love that for you",
    ];
    // #endregion

    // #region Functions
    function adjustFontSize() {
        const maxFontSize = 25;
        const minFontSize = 20;
        // const lowerNumWidth = lowerNum.offsetWidth;

        if (currentInput.length > 12) {
            lowerNum.style.fontSize = minFontSize + "px";
        } else {
            lowerNum.style.fontSize = maxFontSize + "px";
        }
    }

    function generateMessage() {
        // Save length of array to establish upper range limit
        // Randomly generate a number from 1 to upper range limit
        // Use the generated number to select a message from the array
        // Display the message
        let upperLimit = messagesArr.length;
        let randomIndex = Math.floor(Math.random() * upperLimit);
        console.log("Index generated = " + randomIndex);
        message.textContent = messagesArr[randomIndex];
    }

    function messageHilarity() {
        if (currentInput === "69") {
            message.textContent = "NICE";
        } else if (currentInput === "420") {
            message.textContent = "BLAZE IT";
        } else if (currentInput === "80085") {
            message.textContent = "Hehehe";
        } else {
            return;
        }
    }

    function predictResult() {
        try {
            let result = eval(currentInput);

            if (isNaN(result)) {
                upperNum.value = "";
                console.log("Error, predicted result is not a number");
            } else {
                upperNum.value = result;
                console.log("Result predicted");
            }
        } catch (error) {
            upperNum.value = ""; // Leave upper field blank for invalid expressions
            console.log("Error:", error);
        }
    }

    function clearInput() {
        currentInput = "";
        upperNum.value = "";
        lowerNum.value = "";
        console.log("Input fields cleared");
    }

    function clearMessage() {
        message.textContent = "";
    }
    // #endregion

    // #region Backspace Button
    // Backspace button functionality (removes last character)
    backspaceButton.addEventListener("click", function () {
        console.log("Backspace button clicked");
        currentInput = currentInput.slice(0, -1)
        lowerNum.value = currentInput;
        adjustFontSize();
        predictResult();
    });
    // #endregion

    // #region Clear Button
    // Clear button functionality (clears input field)
    clearButton.addEventListener("click", function () {
        console.log("Clear button clicked");
        clearInput();
        clearMessage();
    })
    // #endregion

    // #region Parentheses Button
    parenthesesButton.addEventListener("click", function () {
        console.log("Parentheses button clicked");

        let lastOpenParentheses = currentInput.lastIndexOf("(");
        let lastCloseParentheses = currentInput.lastIndexOf(")");

        if (equalsClicked === true) {
            currentInput = "";
            currentInput += "(";
            lowerNum.value = currentInput;
            predictResult();
            equalsClicked = false;
            console.log("equalsClicked set to FALSE");
        } else if (currentInput === "" || currentInput !== "" && lastOpenParentheses === lastCloseParentheses && isNaN(currentInput[currentInput.length -1]) || lastOpenParentheses < lastCloseParentheses && currentInput[currentInput.length -1] !== ")") {
            currentInput += "(";
            lowerNum.value = currentInput;
            predictResult();
        } else if (lastOpenParentheses > lastCloseParentheses) {
            currentInput += ")";
            lowerNum.value = currentInput;
            predictResult();
        }
    })
    // #endregion

    // #region Percentage Button
    // Percentage button functionality
    percentageButton.addEventListener("click", function () {

        let operators = /[+\-*/]/;
        let numArray = currentInput.split(operators);

        if (numArray[numArray.length -1] !== "") {
            console.log("Percentage button clicked");
            // Save the last string and its length
            lastString = numArray[numArray.length -1];
            lastStringLength = lastString.length;
            console.log("Last string length = " + lastStringLength);

            // Calculate the last string divided by 100
            percentage = lastString /= 100;

            // Replace the last string in the display by the resulting quotient
            currentInput = currentInput.slice(0, -lastStringLength);
            console.log("currentInput after slice: " + currentInput);
            currentInput += percentage;
            lowerNum.value = currentInput;
            predictResult();
        }
    })
    // #endregion

    // #region Number Buttons
    // Append numbers to the input field
    numButtons.forEach(button => {
        button.addEventListener("click", function () {
            clearMessage();

            if (this.getAttribute("data-num") === "0" && currentInput === "") {
                return;
            } else if (equalsClicked === true) {
                clearInput();
                currentInput += this.getAttribute("data-num");
                lowerNum.value = currentInput;
                adjustFontSize();
                predictResult();
                messageHilarity();
                equalsClicked = false;
                console.log("equalsClicked set to FALSE");
                console.log("Current Input (number added):", currentInput);
            } else if (equalsClicked === false && currentInput.length < maxDigits) {
                currentInput += this.getAttribute("data-num");
                lowerNum.value = currentInput;
                adjustFontSize();
                predictResult();
                messageHilarity();
                console.log("Current Input (number added):", currentInput);
            } else {
                console.log("Maximum digits reached");
                message.textContent = "Max digits reached";
                return;
            }
        });
    });
    // #endregion

    // #region Operator Buttons
    // Append operators to the input field
    operatorButtons.forEach(button => {
        button.addEventListener("click", function () {
            console.log("Operator button clicked");
            clearMessage();
            // Avoid adding multiple operators in a row
            if (currentInput[currentInput.length -1] === ")") {
                currentInput += this.getAttribute("data-op");
                lowerNum.value = currentInput;
                adjustFontSize();
                console.log("Current Input (operator added): ", currentInput);
            } else if (equalsClicked === false && currentInput !== "" && !isNaN(currentInput[currentInput.length -1])) {
                currentInput += this.getAttribute("data-op");
                lowerNum.value = currentInput;
                adjustFontSize();
                console.log("Current Input (operator added): ", currentInput);
            // If equals button has been clicked, keep input from being erased if an operator is added to result
            } else if (equalsClicked === true && currentInput !== "") {
                equalsClicked = false;
                console.log("equalsClicked set to FALSE");
                currentInput += this.getAttribute("data-op");
                lowerNum.value = currentInput;
                adjustFontSize();
                console.log("Current Input (operator added): ", currentInput);
            } else {
                return;
            }
        });
    });
    // #endregion

    // #region PosNeg Button
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
    // #endregion

    // #region Decimal Button
    // Add a decimal at the end of the input field
    decimalButton.addEventListener("click", function () {
        console.log("Decimal button clicked");

        let operators = /[+\-*/]/;
        let numArray = currentInput.split(operators);

        if (currentInput == "" || numArray[numArray.length -1] == "") {
            currentInput += "0.";
            lowerNum.value = currentInput;
        } else if (currentInput !== "" && !numArray[numArray.length -1].includes(".") && !isNaN(currentInput[currentInput.length -1])) {
            currentInput += ".";
            lowerNum.value = currentInput;
            console.log("Current Input (decimal added):", currentInput);
        } else {
            console.log("Cannot add a decimal");
            return;
        }
    });
    // #endregion

    // #region Equals Button
    // Evaluate the expression when "=" is clicked
    equalsButton.addEventListener("click", function () {
        console.log("Equals button clicked");
        try {
            // Ensure the expression is valid and evaluate it
            let result = eval(currentInput);

            // Check if result is a valid number
            if (equalsClicked === true) {
                return;
            } else if (isNaN(result)) {
                lowerNum.value = "Error"; // Display Error if result is NaN
                currentInput = ""; // Clear input
                console.log("Error: Result is not a number");
            } else {
                upperNum.value = ""; // Display the result
                currentInput = result.toString(); // Convert the result back to a string
                lowerNum.value = currentInput;
                equalsClicked = true;
                console.log("equalsClicked set to TRUE");
                console.log("Result output correctly");
                // MESSAGE
                generateMessage();
                messageHilarity();
            }
        } catch (error) {
            lowerNum.value = "Error"; // Display error for invalid expressions
            currentInput = "";
            console.log("Error:", error);
        }
    });
    // #endregion
});