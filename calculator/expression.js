const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '÷'];


export function validateExpression(expresion) {
    function isIn(val, array) {
        return array.indexOf(val) != -1;
    }

    function canPutCharacter(current, previous) {
        console.log(previous, current);
        if(!previous) {
            console.log("empty");
            return isIn(current, [...digits, '-', '(']);
        }
    
        if(isIn(previous, digits)) {
            console.log("digits");
            return isIn(current, [...digits, ...operators, ')', '.']);
        }

        if(previous == '(') {
            return isIn(current, [...digits, '-']);
        }

        if(previous == ')') {
            return isIn(current, [...operators, ')']);
        }

        if(previous == '.') {
            return isIn(current, digits);
        }
        
        if(isIn(previous, operators)) {
            console.log("operators");
            return isIn(current, [...digits, '(']) || (previous != '-' && current == '-');
        }
        
        return false;
    }

    let parCount = 0, current = expresion.charAt(0), previous = null;
    for(let i = 1; i < expresion.length - 1; ++i) {
        if(current == '(')
            ++parCount;
        else if(current == ')')
            --parCount;
        if(!canPutCharacter(current, previous))
            return false;
        current = expresion.charAt(i + 1);
        previous = expresion.charAt(i);
    }
    return parCount == 0;
}

export function toInfixConvention(string) {
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