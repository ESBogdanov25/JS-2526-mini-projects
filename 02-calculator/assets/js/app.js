let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

function appendToDisplay(value) {
    if (value === '.' && currentInput.includes('.')) {
        return;
    }
    
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput === '' && previousInput === '') {
            return;
        }
        
        if (operator && currentInput !== '') {
            calculate();
        }
        
        operator = value;
        previousInput = currentInput || previousInput;
        currentInput = '';
        updateDisplay(previousInput + ' ' + (value === '*' ? '×' : value) + ' ');
    } else {
        currentInput += value;
        if (operator && previousInput !== '') {
            updateDisplay(previousInput + ' ' + (operator === '*' ? '×' : operator) + ' ' + currentInput);
        } else {
            updateDisplay(currentInput);
        }
    }
}

function updateDisplay(value) {
    display.value = value;
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay('');
}

function deleteLast() {
    if (currentInput) {
        currentInput = currentInput.slice(0, -1);
        if (operator && previousInput !== '') {
            updateDisplay(previousInput + ' ' + (operator === '*' ? '×' : operator) + ' ' + currentInput);
        } else {
            updateDisplay(currentInput);
        }
    } else if (operator) {
        operator = '';
        currentInput = previousInput;
        previousInput = '';
        updateDisplay(currentInput);
    }
}

function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') {
        return;
    }
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) {
        return;
    }
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                updateDisplay('Error');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    result = Math.round(result * 100000000) / 100000000;
    
    updateDisplay(result);
    currentInput = result.toString();
    operator = '';
    previousInput = '';
}