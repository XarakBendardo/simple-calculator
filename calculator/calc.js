import { evaluate } from "./expression.js";


let calcDisplay = document.getElementById("calcDisplay");

Array.from(document.getElementsByClassName("exprElementsButton")).forEach(button => {
    button.addEventListener("click", () => {
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
        console.log(evaluate(calcDisplay.value));
    } catch(e) {
        console.error(e.message);
    }
});