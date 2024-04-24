let calcDisplay = document.getElementById("calcDisplay");

Array.from(document.getElementsByClassName("numButton")).forEach(button => {
    button.addEventListener("click", () => {
        displayText(button.textContent);
    });
});

function displayText(buttonText) {
    console.log(buttonText);
    if(buttonText == "backspace")
        calcDisplay.value = calcDisplay.value.slice(0, -1); 
    else
        calcDisplay.value += buttonText;
}

function toInfixConvention(string) {
    function isNumericElement(char) {
        return ((char >= '0' && char <= '9') || char == '.');
    }

    let expresion = [];
    let number;
    let i = 0, j;
    while(i < string.length) {
        number = "";
        if(string.charAt(i) == '-' && (i == 0 || !isNumericElement(string.charAt(i - 1)))) {
            number += string.charAt(i);
            ++i;
        }
        for(j = i; isNumericElement(string.charAt(j)) && j < string.length; ++j)
            number += string.charAt(j);
        
        if(number != "") {
            expresion.push(number);
            i = j;
        }
        else {
            expresion.push(string.charAt(i));
            ++i;
        }
    }

    return expresion;
}

// console.log(toInfixConvention("1.5+(12-4)*-5.6+2"));