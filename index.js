const calculator = {

    add: function (num1, num2) {
        return num1 + num2;
    },

    subtract: function (num1, num2) {
        return num1 - num2;
    },

    multiply: function (num1, num2) {
        return num1 * num2;
    },

    divide: function (num1, num2) {
        return num1 / num2;
    },

    operate(num1, num2, operation) {
        switch (operation) {
            case "+": return this.add(num1, num2);
            case "-": return this.subtract(num1, num2);
            case "x": return this.multiply(num1, num2);
            case "÷" : return this.divide(num1, num2);
        }
    }
}

// Function to track button presses and take them all in
const callStack = {
    stack: [],

    addToStack(item) {
        this.stack.push(item);
    },

    clearStack() {
        this.stack.length = 0;
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const numbers = document.querySelectorAll(".number");
    const operators = document.querySelectorAll(".operator");
    const text = document.getElementById("display-text");
    text.innerHTML = "";
    const delay = 300;
    const maxLength = 9;

    function addLetter(letter) {
        text.innerHTML += letter;
    }

    const welcomeMessage = "WELCOME";
    for (let i = 0; i < welcomeMessage.length; i++) {
        setTimeout(() => {
            addLetter(welcomeMessage[i]);
        }, i * delay);
    }

    setTimeout(() => {
        text.innerHTML = "";
    }, welcomeMessage.length * delay + 1000);

    for (const number of numbers) {
        number.addEventListener("click", () => {

            if (text.innerHTML.length < maxLength) {
                text.innerHTML += number.textContent.trim()
            }
        })
    }

    for (const operator of operators) {
        operator.addEventListener("click", () => {

            if (callStack.stack.length === 0 && text.innerHTML.length !== 0) { // Ensure call stack is empty but there is a number to operate on
                const numberToAdd = Number(text.innerHTML);
                callStack.addToStack(numberToAdd);
                callStack.addToStack(operator.textContent.trim());
                text.innerHTML = "";
            } // Add else to perform action if stack has contnet - this will cause an operation to run and show result in the screen
              // I.e. if a user presses add, then another number, then times, this will perform the add in the call stack

        })
    }

    document.getElementById("equals").addEventListener("click", () => {
        if (callStack.stack.length !== 0) {
            const num1 = callStack.stack[0];
            const operator = callStack.stack[1];
            const num2 = Number(text.textContent.trim());
            const result = calculator.operate(num1, num2, operator);
            callStack.stack = [];
            text.innerHTML = result;

            // Implement something to either prevent people from typing numbers after answer - or to clear answer when they start typing
            // add functionality to prevent overflow of large answers - conver numbers > 9 digest to standard form
        }
    })

    document.getElementById("clear").addEventListener("click", () => {
        text.innerHTML = "";
        callStack.stack = [];
    })
});

