const elInput = document.querySelector("#current-number");
const elWorkspace = document.querySelector("#rolling-calc");
const elNumbers = document.querySelectorAll(".number");
const elDelete = document.querySelector("#delete");
const elAddition = document.querySelector("#addition");
const elSubtraction = document.querySelector("#subtraction");
const elMultiplication = document.querySelector("#multiplication");
const elDivision = document.querySelector("#division");

elInput.textContent = "";

// elInput.addEventListener('click', enterNumber(e))

elNumbers.forEach(number => {
    number.addEventListener('click', enterNumber)
});

elDelete.addEventListener('click', clearEntry);
elAddition.addEventListener('click', addition);
elSubtraction.addEventListener('click', subtraction);
elMultiplication.addEventListener('click', multiplication);
elDivision.addEventListener('click', division);

function enterNumber(e) {
    if (elInput.textContent.length < 11) {
        elInput.textContent += e.target.textContent;
    }
}

function clearEntry () {
    if (elInput.textContent === "") {
        elWorkspace.textContent = "";
    }
    elInput.textContent = "";
}

function updateWorkspace(e) {
    elWorkspace.textContent += " " + elInput.textContent + " " + e.target.textContent;
    elInput.textContent = "";
}

function addition(e, elInput, elWorkspace) {
    updateWorkspace(e);
    // return +elInput.textContent + +elWorkspace.textContent;
}

function subtraction(e, elInput, elWorkspace) {
    updateWorkspace(e);
}

function multiplication (e, elInput, elWorkspace) {
    updateWorkspace(e);
}

function division(e, elInput, elWorkspace) {
    updateWorkspace(e);
}