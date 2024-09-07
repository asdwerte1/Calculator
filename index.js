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

    operate: function (num1, num2, operation) {
        switch (operation) {
            case "+": return this.add(num1, num2);
            case "-": return this.subtract(num1, num2);
            case "*": return this.multiply(num1, num2);
            case "/": return this.divide(num1, num2);
        }
    }
}

// Function to track button presses and take them all in
const callStack = {
    stack: [],

    addToStack: function (item) {
        this.stack.push(item);
    },

    clearStack: function () {
        this.stack.length = 0;
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const numbers = document.querySelectorAll(".number");
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

    console.log(numbers);

    for (const number of numbers) {
        number.addEventListener("click", () => {

            if (text.innerHTML.length < maxLength) {
                text.innerHTML += number.textContent.trim()
            }
        })
    }

    document.getElementById("clear").addEventListener("click", () => {
        text.innerHTML = "";
    })
});

