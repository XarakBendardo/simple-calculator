import { evaluate, isIn, operators, digits } from "./expression.js";

let promptOnScreen = false;
let calcDisplay = document.getElementById("calcDisplay");
let inputExpression = [];
let lastInput = "";

function addToExpression(token) {
    if(isIn(token, [...digits, '.']) && isIn(lastInput, [...digits, '.']))
        inputExpression[inputExpression.length - 1] += token;
    else if(token == "-" && isIn(lastInput, [...operators, "", '(']))
        inputExpression.push('~');
    else
        inputExpression.push(token);
    lastInput = token;
}

function removeFromExpression() {
    if(inputExpression[inputExpression.length - 1].length > 1)
        inputExpression[inputExpression.length - 1] = inputExpression[inputExpression.length - 1].slice(0, -1);
    else
        inputExpression.pop();
    if(inputExpression.length > 0)
        lastInput = inputExpression[inputExpression.length - 1];
    else
        lastInput = "";
}

Array.from(document.getElementsByClassName("exprElementsButton")).forEach(button => {
    button.addEventListener("click", () => {
        if(promptOnScreen) {
            calcDisplay.value = button.textContent;
            promptOnScreen = false;
        }
        else
            calcDisplay.value += button.textContent;
        addToExpression(button.textContent);
        console.log(inputExpression);
    });
});

document.getElementById("backspace").addEventListener("click", () => {
    calcDisplay.value = calcDisplay.value.slice(0, -1);
    if(inputExpression.length == 0)
        return;
    
    removeFromExpression();
    console.log(inputExpression);
});

document.getElementById("clear").addEventListener("click", () => {
    calcDisplay.value = "";
    lastInput = "";
    inputExpression = [];
});

document.getElementById("equals").addEventListener("click", () => {
    try {
        let val = evaluate(inputExpression);
        calcDisplay.value = val;
        inputExpression = [val];
    } catch(e) {
        calcDisplay.value = "Incorrect input";
        promptOnScreen = true;
        inputExpression = [];
    }
});