const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let operator = '';
let previousInput = '';
let resultDisplayed = false;

// Function to handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.getAttribute('data-value');
        
        // Clear button
        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
            display.innerText = '0';
            resultDisplayed = false;

        // Equals button
        } else if (value === '=') {
            if (currentInput && previousInput && operator) {
                currentInput = calculate(previousInput, currentInput, operator);
                display.innerText = currentInput;
                previousInput = '';
                operator = '';
                resultDisplayed = true;
            }

        // Operator buttons
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput) {
                if (previousInput && !resultDisplayed) {
                    currentInput = calculate(previousInput, currentInput, operator);
                }
                previousInput = currentInput;
                currentInput = '';
                operator = value;
                resultDisplayed = false;
            }

        // Number and decimal buttons
        } else {
            if (resultDisplayed) {
                currentInput = value;
                resultDisplayed = false;
            } else {
                currentInput += value;
            }
            display.innerText = currentInput || '0';
        }
    });
});

// Function to perform calculations
function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);

    if (isNaN(a) || isNaN(b)) return '';

    switch (op) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case '*':
            return (a * b).toString();
        case '/':
            return b !== 0 ? (a / b).toString() : 'Error';
        default:
            return '';
    }
}
