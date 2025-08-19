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
    const maxDigits = 13; // Stores maximum digits that may appear in input field
    operatorClicked = false; // Stores whether an operator was just clicked
    equalsClicked = false; // Stores whether the equals button was just clicked
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

    // Adds the number or symbol clicked to currentInput and displays expression in upperNum
    function addLowerInput(char) {
        currentInput += char;
        lowerNum.value = currentInput;
    }

    function replaceInput(replacement) {
        currentInput = replacement;
        lowerNum.value = currentInput;
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
            message.textContent = "Hehehe classic";
        } else if (currentInput === "1+1") {
            message.textContent = "...really?";
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
        replaceInput(lowerNum.value.slice(0, -1));
        clearMessage();
        adjustFontSize();
        // predictResult();
    });
    // #endregion

    // #region Clear Button
    // Clear button functionality (clears input field)
    clearButton.addEventListener("click", function () {
        console.log("Clear button clicked");
        clearInput();
        clearMessage();
        operatorClicked = false;
        equalsClicked = false;
        console.log("operatorClicked set to: ", operatorClicked);
        console.log("equalsClicked set to: ", equalsClicked);
    })
    // #endregion

    // #region Parentheses Button
    // parenthesesButton.addEventListener("click", function () {
    //     console.log("Parentheses button clicked");

    //     let lastOpenParentheses = currentInput.lastIndexOf("(");
    //     let lastCloseParentheses = currentInput.lastIndexOf(")");

    //     if (equalsClicked === true) {
    //         clearInput();
    //         addLowerInput("(");
    //         predictResult();
    //         equalsClicked = false;
    //         console.log("equalsClicked set to FALSE");
    //     } else if (currentInput === "" || currentInput !== "" && lastOpenParentheses === lastCloseParentheses && isNaN(currentInput[currentInput.length -1]) || lastOpenParentheses < lastCloseParentheses && currentInput[currentInput.length -1] !== ")") {
    //         addLowerInput("(");
    //         predictResult();
    //     } else if (lastOpenParentheses > lastCloseParentheses) {
    //         addLowerInput(")");
    //         predictResult();
    //     }
    // })
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

            // Calculate the last string divided by 100
            percentage = lastString /= 100;

            // Replace the last string in the display by the resulting quotient
            currentInput = currentInput.slice(0, -lastStringLength);
            console.log("currentInput after slice: " + currentInput);
            addLowerInput(percentage);
            predictResult();
        }
    })
    // #endregion

    // #region Number Buttons
    numButtons.forEach(button => {
        button.addEventListener("click", function () {
            console.log("Number clicked, equalsClicked: ", equalsClicked, "operatorClicked: ", operatorClicked);

            if (lowerNum.value.length < maxDigits || operatorClicked === true || equalsClicked === true) {
                if (equalsClicked === true) {
                    upperNum.value = "";
                    lowerNum.value = "";
                    lowerNum.value += this.getAttribute("data-num");
                    equalsClicked = false;
                } else {
                    if (lowerNum.value === "" && this.getAttribute("data-num") !== "0") {
                        lowerNum.value += this.getAttribute("data-num");
                    } else if (lowerNum.value === "0") {
                        lowerNum.value = "" + this.getAttribute("data-num");
                    } else if (lowerNum.value !== "") {
                        if (operatorClicked === true) {
                            lowerNum.value = "" + this.getAttribute("data-num");
                            operatorClicked = false;
                            equalsClicked = false;
                        } else {
                            lowerNum.value += this.getAttribute("data-num");
                        }
                    }
                }
            } else {
                message.textContent = "Max digits reached";
            }
        })
    });
    // #endregion

    // #region Operator Buttons
    operatorButtons.forEach(button => {
        button.addEventListener("click", function () {
            clearMessage();
            if (upperNum.value.includes("=")) {
                upperNum.value = lowerNum.value + this.getAttribute("data-op");
                operatorClicked = true;
                equalsClicked = false;
                console.log("operatorClicked set to ", operatorClicked);
                console.log("equalsClicked set to: ", equalsClicked);
            } else if (lowerNum.value === "" && upperNum.value === "") {
                // if lowerNum and upperNum are both blank, do nothing
                upperNum.value = "0" + this.getAttribute("data-op");
                lowerNum.value = "0";
            } else if (lowerNum.value !== "" && upperNum.value === "") {
                upperNum.value += lowerNum.value + this.getAttribute("data-op");
                console.log("Added lowerNum value to upperNum");
                operatorClicked = true;
                console.log("operatorClicked set to ", operatorClicked);
            } else if (upperNum.value !== "" && isNaN(upperNum.value[upperNum.value.length -1])) {
                // if last digit of upperNum is an operator, replace it
                upperNum.value = upperNum.value.slice(0, -1);
                upperNum.value += this.getAttribute("data-op");
                console.log("Operator replaced in upperNum");
                operatorClicked = true;
                console.log("operatorClicked set to ", operatorClicked);
            }
        })
    })
    // #endregion

    // #region PosNeg Button
    // Toggle input value between positive and negative
    posnegButton.addEventListener("click", function () {
        console.log("Pos-neg button clicked");
        try {
            let result = lowerNum.value * -1;

            if (isNaN(result)) {
                return;
            } else {
                lowerNum.value = result.toString();
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

        if (equalsClicked === true) {
            clearInput();
            addLowerInput("0.");
            equalsClicked = false;
            console.log("equalsClicked set to FALSE");
        } else if (currentInput === "" || numArray[numArray.length -1] === "") {
            addLowerInput("0.");
        } else if (currentInput !== "" && !numArray[numArray.length -1].includes(".") && !isNaN(currentInput[currentInput.length -1])) {
            addLowerInput(".");
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
        console.log("Equals button clicked, equalsClicked =", equalsClicked);
        try {
            if (equalsClicked === true && upperNum.value === "") {
                return;
            } else if (equalsClicked === true && upperNum.value.includes("=")) {
                function fixDoubleMinus(expression) {
                    return expression.replace(/--/g, "+");
                }

                function splitFirstNumber(expression) {
                    // match the first number (can include minus sign)
                    let match = expression.match(/^-?\d+/);
                    if (!match) return { firstNum: "", rest: expression };

                    let firstNum = match[0];
                    let rest = expression.slice(firstNum.length);

                    return { firstNum, rest };
                }

                let upperNumSplit = splitFirstNumber(upperNum.value);
                fixedDoubleMinus = fixDoubleMinus(upperNumSplit.rest);

                let hiddenExpression = lowerNum.value + fixedDoubleMinus;

                upperNum.value = lowerNum.value + upperNumSplit.rest;
                lowerNum.value = eval(hiddenExpression.slice(0, -1));
                console.log("MOO");

                // MESSAGE
                generateMessage();
                messageHilarity();
            } else if (upperNum.value !== "" && lowerNum.value !== "") {
                lowerNumParenthesis = "(" + lowerNum.value + ")";
                let result = eval(upperNum.value + lowerNumParenthesis);
                upperNum.value += lowerNum.value + "=";
                lowerNum.value = result;
                equalsClicked = true;
                console.log("equalsClicked set to ", equalsClicked);
                console.log("MEOW");
                // MESSAGE
                generateMessage();
                messageHilarity();
            }
        } catch (error) {
            clearInput();
            lowerNum.value = "Error"; // Display error for invalid expressions
            message.textContent = error;
            console.log("Error:", error);
        }
    });
    // #endregion
});