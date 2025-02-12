const screen = document.querySelector(".screen");

let num1 = null;
let operator = null;
let num2 = null;
let isInput = false;
let didEval = false;

const numKeys = document.querySelectorAll(".num");
numKeys.forEach((key) => key.addEventListener("click", clickNum));

function clickNum(e) {
    let counter = 0;
    if (operator !== null && isInput === false) {
        screen.textContent = e.target.textContent;
        counter++;
        isInput = true;
        selectedOperator.classList.remove("op-select");
        selectedOperator.classList.add("hover");
    }
    if (didEval === true) {
        screen.textContent = e.target.textContent;
        didEval = false;
        counter++;
    }
    if (screen.textContent === "0") {
        screen.textContent = e.target.textContent;
        counter++;
    }
    if (counter === 0) screen.textContent += e.target.textContent;
    if (screen.textContent.length == 11) {
        const arr = screen.textContent.split("");
        arr.pop();
        screen.textContent = arr.join("");
    }
}

const operatorKeys = document.querySelectorAll(".op");
operatorKeys.forEach((key) => key.addEventListener("click", clickOperator));

function clickOperator(e) {
    if (num1 === null && isInput === false) {
        num1 = Number(screen.textContent);
        operator = e.target.textContent;
        doChangeOperatorColor(e);
    } else if (num1 !== null && isInput === false) {
        operator = e.target.textContent;
        doChangeOperatorColor(e);
    } else if (isInput === true) {
        num2 = Number(screen.textContent);
        const evalBox = [num1, num2, operator];
        doOperation(evalBox, e);
        operator = e.target.textContent;
        doChangeOperatorColor(e);
    }
}

function doChangeOperatorColor(e) {
    if (selectedOperator === null) {
        selectedOperator = e.target;
        selectedOperator.classList.add("op-select");
        selectedOperator.classList.remove("hover");
    } else {
        previousOperator = selectedOperator;
        selectedOperator = e.target;
        previousOperator.classList.remove("op-select");
        previousOperator.classList.add("hover");
        selectedOperator.classList.add("op-select");
        selectedOperator.classList.remove("hover");
    }
}

const equalkey = document.querySelector(".eq");
equalkey.addEventListener("click", clickEqual);

function clickEqual(e) {
    if (isInput === true) {
        num2 = Number(screen.textContent);
        const evalBox = [num1, num2, operator];
        doOperation(evalBox, e);
    }
}

const acKey = document.querySelector(".ac");
acKey.addEventListener("click", (e) => {
    screen.textContent = 0;
    num1 = operator = num2 = null;
    isInput = didEval = false;
    selectedOperator.classList.remove("op-select");
    selectedOperator.classList.add("hover");
});

function doOperation(evalBox, e) {
    switch (evalBox[2]) {
        case "÷":
            divsion(evalBox, e);
            break;
        case "×":
            product(evalBox, e);
            break;
        case "−":
            tafrigh(evalBox, e);
            break;
        case "+":
            sumation(evalBox, e);
            break;
    }
}

function divsion(evalBox, e) {
    const evaluation = evalBox[0] / evalBox[1];
    doChanges(evaluation, e);
}
function product(evalBox, e) {
    const evaluation = evalBox[0] * evalBox[1];
    doChanges(evaluation, e);
}
function tafrigh(evalBox, e) {
    const evaluation = evalBox[0] - evalBox[1];
    doChanges(evaluation, e);
}
function sumation(evalBox, e) {
    const evaluation = evalBox[0] + evalBox[1];
    doChanges(evaluation, e);
}

function doChanges(result, e) {
    if (result.toString().length >= 10) {
        screen.textContent = result.toExponential(4).toString();
    } else screen.textContent = result.toString();
    num1 = result;
    isInput = false;
    if (e.target.textContent === "=") {
        num1 = null;
        operator = null;
        num2 = null;
        didEval = true;
    } else num2 = null;
    console.log(num1);
    console.log(num2);
    console.log(operator);
}

/* style changes */

let selectedOperator = null;
let previousOperator = null;
