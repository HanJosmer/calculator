const elInput = document.querySelector("#current-number");
const elWorkspace = document.querySelector("#rolling-calc");
const elNumbers = document.querySelectorAll(".number");
const elOperators = document.querySelectorAll(".operator");
const elDelete = document.querySelector("#delete");
const elOperate = document.querySelector("#equals");

// grab division symbol
const divide = document.querySelector("#division").firstElementChild.textContent;

let displayValue = "";
let storedValue = "";
let operation = "";

elInput.textContent = "";

elNumbers.forEach(number => {
    number.addEventListener('click', enterNumber)
});

elOperators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        storedValue = displayValue; operation = e.target.firstChild.textContent;
        updateWorkspace(e); clearDisplay();
    })
})

elOperate.addEventListener('click', () => {
    displayValue = operate(operation);
    updateDisplay(); clearWorkspace();
});

elDelete.addEventListener('click', clearDisplay);

function enterNumber(e) {
    if (elInput.textContent.length < 11) {
        displayValue += e.target.firstChild.textContent;
        updateDisplay(); 
    }
}

function clearDisplay () {
    if (elInput.textContent === "") {
        elWorkspace.textContent = "";
    }
    elInput.textContent = "";
    displayValue = "";
}

function clearWorkspace () {
    elWorkspace.textContent = "";
}

function updateDisplay() {
    elInput.textContent = displayValue;
}

function updateWorkspace(e) {
    elWorkspace.textContent = storedValue + " " + e.target.firstChild.textContent;
}

function operate(operation) {
    switch (operation) {
        case "+":
            return addition(storedValue, displayValue);
        case "-":
            return subtraction(storedValue, displayValue);
        case "x":
            return multiplication(storedValue, displayValue);
        case divide:
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