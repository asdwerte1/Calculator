const calculator = {

    add: function(num1, num2) {
        return num1 + num2;
    },

    subtract: function(num1, num2) {
        return num1 - num2;
    },
    
    multiply: function(num1, num2) {
        return num1 * num2;
    },

    divide: function(num1, num2) {
        return num1 / num2;
    },

    operate: function(num1, num2, operation) {
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
    
    addToStack: function(item) {
        this.stack.push(item);
    },

    clearStack: function() {
        this.stack.length = 0;
    }
}

console.log(calculator.operate(2, 3, "+"));
