const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
const OPERATORS = ["+", "-", "*", "/"]

const elInput = document.querySelector("#current-number");
const elWorkspace = document.querySelector("#rolling-calc");
const elNumbers = document.querySelectorAll(".number");
const elOperators = document.querySelectorAll(".operator");
const elDelete = document.querySelector("#delete");
const elOperate = document.querySelector("#equals");
const elDecimal = document.querySelector("#decimal");

// grab division symbol
const divide = document.querySelector("#division").firstElementChild.textContent;

let displayValue = "Hello!"; elInput.textContent = displayValue;
let storedValue = ""; elWorkspace.textContent = storedValue;
let operation = "";

// keyboard support
document.addEventListener('keypress', keypress);

elNumbers.forEach(number => {
    number.addEventListener('click', enterNumber)
});

elOperators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        // prevent performing operations on non-numbers
        if (Object.is(+displayValue, NaN)) {return};
        // evaluate queued calculation before accepting new calculation
        if (elWorkspace.textContent != "" && elInput.textContent != "") {
            storedValue = operate(operation); operation = e.target.firstChild.textContent;
            updateWorkspace(operation); clearDisplay(); updateDisplay();
        } else if (elWorkspace.textContent != "" && elInput.textContent == "") {
            operation = e.target.firstChild.textContent;
            updateWorkspace(operation);
        } else {
            storedValue = displayValue; operation = e.target.firstChild.textContent;
            updateWorkspace(operation); clearDisplay();   
        }
    })
})

elOperate.addEventListener('click', () => {
    // prevent performing operations on non-numbers
    if (Object.is(+displayValue, NaN)) {return};

    displayValue = operate(operation);
    updateDisplay(); clearWorkspace();
});

elDelete.addEventListener('click', clearDisplay);

function enterNumber(e) {
    // if display value is not a number, clear display and proceed
    if (Object.is(+displayValue, NaN)) {clearDisplay()}; 
    // check for event type and update display
    if (e.type == "click" && elInput.textContent.length < 13) {
        // if display value contains decimal already, do nothing
        if (e.target.firstChild.textContent === "." && displayValue.indexOf('.') !== -1) {return};
        displayValue += e.target.firstChild.textContent;
        updateDisplay(); 
    } else if (e.type == "keypress" && elInput.textContent.length < 12) {
        // if display value contains decimal already, do nothing
        if (e.key === "." && displayValue.indexOf('.') !== -1) {return};
        displayValue += e.key;
        updateDisplay();
    }
}

function keypress(e) {
    const key = e.key;
    if (NUMBERS.includes(key)) {
        enterNumber(e);
    } else if (OPERATORS.includes(key)) {
        // prevent performing operations on non-numbers
        if (Object.is(+displayValue, NaN)) {return};
        // evaluate queued calculation before accepting new calculation
        if (elWorkspace.textContent != "" && elInput.textContent != "") {
            storedValue = operate(operation); operation = e.key;
            updateWorkspace(operation); clearDisplay(); updateDisplay();
        } else if (elWorkspace.textContent != "" && elInput.textContent == "") {
            operation = e.key;
            updateWorkspace(operation);
        } else {
            storedValue = displayValue; operation = e.key;
            updateWorkspace(operation); clearDisplay();  
        }
    } else if (key == "Enter") {
        // prevent performing operations on non-numbers
        if (Object.is(+displayValue, NaN)) {return};

        displayValue = operate(operation);
        updateDisplay(); clearWorkspace();
    }
}

function clearDisplay () {
    if (elInput.textContent === "") {
        elWorkspace.textContent = "";
    }
    displayValue = "";
    updateDisplay();
}

function clearWorkspace () {
    elWorkspace.textContent = "";
}

function updateDisplay() {
    elInput.textContent = displayValue.toString().substr(0, 12);
}

function updateWorkspace(operation) {
    elWorkspace.textContent = storedValue + " " + operation;
}

function operate(operation) {    
    switch (operation) {
        case "+":
            return addition(storedValue, displayValue);
        case "-":
            return subtraction(storedValue, displayValue);
        case "x":
        case "*":
            return multiplication(storedValue, displayValue);
        case divide:
        case "/":
            return division(storedValue, displayValue);
        default:
            break;
    }
}

function addition(x, y) {
    return (+x) + (+y);
}

function subtraction(x, y) {
    return (+x) - (+y);
}

function multiplication (x, y) {
    return (+x) * (+y);
}

function division(x, y) {
    if (+y === 0) {return "DIV BY ZERO"}
    return (+x) / (+y);
}