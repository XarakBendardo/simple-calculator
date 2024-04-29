import { evaluate } from "./expression.js";

let promptOnScreen = false;


let calcDisplay = document.getElementById("calcDisplay");

Array.from(document.getElementsByClassName("exprElementsButton")).forEach(button => {
    button.addEventListener("click", () => {
        if(promptOnScreen) {
            calcDisplay.value = button.textContent;
            promptOnScreen = false;
        }
        else
            calcDisplay.value += button.textContent;
    });
});

document.getElementById("backspace").addEventListener("click", () => {
    calcDisplay.value = calcDisplay.value.slice(0, -1);
});

document.getElementById("clear").addEventListener("click", () => {
    calcDisplay.value = "";
});

document.getElementById("equals").addEventListener("click", () => {
    try {
        calcDisplay.value = evaluate(calcDisplay.value);
    } catch(e) {
        calcDisplay.value = e.message;
        promptOnScreen = true;
    }
});