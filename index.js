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

    function removeActive() {
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
                text.innerHTML += number.textContent.trim()
            }
        })
    }

    for (const operator of operators) {
        operator.addEventListener("click", () => {
            const numberToAdd = Number(text.innerHTML);
            callStack.addToStack(numberToAdd);
            callStack.addToStack(operator.textContent.trim());
            text.innerHTML = "";
            operator.classList.add("active");
        });
    }

    document.getElementById("equals").addEventListener("click", () => {
        callStack.addToStack(Number(text.innerHTML));
        text.innerHTML = "";
        const ops = ["+", "-", "x", "÷"];
        let result = 0;

        callStack.stack.forEach(element => {
            
            if (ops.includes(element)) {
                
                const position = callStack.stack.indexOf(element);
                const number1 = callStack.stack[position - 1];
                const number2 = callStack.stack[position + 1];
                result = calculator.operate(number1, number2, element);
                callStack.stack = callStack.stack.slice(position + 1);
                callStack.stack[0] = result;
            }

            text.innerHTML = result;
            for (const number of numbers) {
                number.setAttribute("disabled", "disabled");
            }
        });
    });

    document.getElementById("clear").addEventListener("click", () => {
        text.innerHTML = "";
        callStack.stack = [];
        for (const number of numbers) {
            if (number.hasAttribute("disabled")) {
                number.removeAttribute("disabled");
            }
        }
    });
});

