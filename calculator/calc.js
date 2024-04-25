import { validateExpression, toInfixConvention } from "./expression.js";


let calcDisplay = document.getElementById("calcDisplay");

Array.from(document.getElementsByClassName("numButton")).forEach(button => {
    button.addEventListener("click", () => {
        displayText(button.textContent);
    });
});

function displayText(buttonText) {
    let textContent = calcDisplay.value;
    console.log(textContent);
    if(buttonText == "backspace")
        calcDisplay.value = calcDisplay.value.slice(0, -1);
    else
        calcDisplay.value += buttonText;
}