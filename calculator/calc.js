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
    // 3 + (123+44)*5 - (222-4)
    function isDigit(char) {
        return (char >= '0' && char <= '9');
    }

    let expresion = [];
    let number;
    let i = 0, j;
    while(i < string.length) {
        number = "";
        if(!isDigit(string.charAt(i)) && (i == 0 || !isDigit(string.charAt(i - 1)))) {
            if (string.charAt(i) !== '-') throw new Error("Incorrect input format");
            number += string.charAt(i);
            ++i;
        }
        for(j = i; isDigit(string.charAt(j)) && j < string.length; ++j)
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