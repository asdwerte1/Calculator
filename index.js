/*
    TODO:
    trim trailing zeros from decimal numbers --> issue noticed but cannot recreate
*/

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
            case "÷": return this.divide(num1, num2);
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

const numberKeys = [] // Used for key press detection
for (let i = 0; i < 10; i++) {
    numberKeys[i] = `${i}`;
}

document.addEventListener("DOMContentLoaded", () => {

    const numbers = document.querySelectorAll(".number");
    const operators = document.querySelectorAll(".operator");
    const text = document.getElementById("display-text");
    text.innerHTML = "";
    const delay = 300;
    const maxLength = 12;
    let lastOperation = null;
    let percentMode = false;

    const addLetter = (letter) => {
        text.innerHTML += letter;
    }

    const removeActive = () => {
        for (const operator of operators) {
            if (operator.classList.contains("active")) {
                operator.classList.remove("active");
            }
        }
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
            removeActive();
            if (text.innerHTML.length < maxLength) {
                if (text.innerHTML === "-0") {
                    text.innerHTML = "-" + number.textContent.trim();
                } else {
                    text.innerHTML += number.textContent.trim();
                }
            }
            lastOperation = null;
        });
    }

    document.getElementById("decimal").addEventListener("click", () => {
        const content = text.innerHTML;
        const check = content.includes(".");
        if (!check && content.length < maxLength - 1) {
            text.innerHTML += ".";
        }
        lastOperation = null;
        percentMode = false;
    })

    for (const operator of operators) {
        operator.addEventListener("click", () => {
            const numberToAdd = Number(text.innerHTML);
            callStack.addToStack(numberToAdd);
            callStack.addToStack(operator.textContent.trim());
            text.innerHTML = "";
            operator.classList.add("active");

            for (const number of numbers) {
                if (number.hasAttribute("disabled")) {
                    number.removeAttribute("disabled");
                }
            }
            document.getElementById("decimal").removeAttribute("disabled");
            lastOperation = null;
            percentMode = false;
        });
    }

    document.getElementById("equals").addEventListener("click", () => {
        const currentNumber = text.innerHTML;
        callStack.addToStack(Number(currentNumber));
        text.innerHTML = "";
        const ops = ["+", "-", "x", "÷"];
        let result = 0;

        if (callStack.stack.length >= 3) {

            callStack.stack.forEach(element => {

                if (ops.includes(element)) {

                    const position = callStack.stack.indexOf(element);
                    const number1 = callStack.stack[position - 1];
                    const number2 = callStack.stack[position + 1];

                    const zeroDivisionCheck = (element === "÷" && (number2 === 0 || number2 === 0.0)) ? true : false;

                    if (!zeroDivisionCheck) {
                        result = calculator.operate(number1, number2, element);
                        callStack.stack = callStack.stack.slice(position + 1);
                        callStack.stack[0] = result;
                    } else {
                        alert("Whoa there...maths hasn't quite sussed out dividing by zero yet!")
                        result = null;
                    }
                }
            });

            if (result !== null) {

                const formatResult = (num) => {
                    let formatted = num.toFixed(10);
                    formatted = formatted.replace(/\.?0+$/, "") || formatted.slice(0, -9);
                    if (formatted === "-0") formatted = "0";
                    return formatted
                }

                const formattedResult = formatResult(result);

                if (formattedResult.length > maxLength) {
                    text.innerHTML = Number(formattedResult).toPrecision(maxLength - 1);
                } else {
                    text.innerHTML = formattedResult;
                }

                for (const number of numbers) {
                    number.setAttribute("disabled", "disabled");
                }
                document.getElementById("decimal").setAttribute("disabled", "disabled");
            }
        }
        lastOperation = "equals";
        percentMode = false;
    });

    document.getElementById("clear").addEventListener("click", () => {
        text.innerHTML = "";
        callStack.stack = [];
        for (const number of numbers) {
            if (number.hasAttribute("disabled")) {
                number.removeAttribute("disabled");
            }
        }
        document.getElementById("decimal").removeAttribute("disabled");
        lastOperation = null;
        percentMode = false;
    });

    document.getElementById("back").addEventListener("click", () => {
        const currentContent = text.innerHTML;
        text.innerHTML = currentContent.slice(0, currentContent.length - 1);
        lastOperation = null;
        percentMode = false;
    });

    document.getElementById("sign").addEventListener("click", () => {
        let currentContent = text.innerHTML;

        if (lastOperation !== "equals" || currentContent === "0" || currentContent === "") { // Remove this to unfix the bug
            if (currentContent === "0" || currentContent === "") {
                currentContent = "-";
            } else if (currentContent === "-") {
                currentContent = "";
            } else if (currentContent.charAt(0) === "-") {
                currentContent = currentContent.substring(1);
            } else {
                currentContent = "-" + currentContent;
            }
            text.innerHTML = currentContent;
        }
        percentMode = false;
    });

    document.getElementById("percent").addEventListener("click", () => {

        if (lastOperation == "equals") {
            const currentContent = text.innerHTML;
            if (!percentMode) {
                
                text.innerHTML = currentContent / 100;
                percentMode = true;
            } else {
                text.innerHTML = currentContent * 100;
                percentMode = false;
            }
        }
    })

    document.addEventListener("keydown", (event) => {

        const key = event.key;

        if (numberKeys.includes(key)) {
            const keyElement = document.getElementById(key);
            if (keyElement) {
                keyElement.click();
            }
        } else if (key === "Enter") {
            document.getElementById("equals").click();
        } else if (key === "Backspace") {
            document.getElementById("back").click();
        } else if (key === ".") {
            document.getElementById("decimal").click();
        } else if (key === "c") {
            document.getElementById("clear").click();
        } else if (key === "m") {
            document.getElementById("sign").click();
        }
        else if (key === "p") {
            document.getElementById("percent").click();
        } else {
            const operatorsMap = {
                "+": "+",
                "-": "-",
                "*": "x",
                "/": "÷"
            };

            if (operatorsMap[key]) {
                if (key === "/") {
                    event.preventDefault();
                }
                const operatorButton = Array.from(document.querySelectorAll(".operator")).find(op => op.textContent.trim() === operatorsMap[key]);
                operatorButton.click();
            }
        }
    });
});