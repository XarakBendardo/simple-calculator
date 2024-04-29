const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '÷'];
const parsed_operators = [...operators, 'u-'];
const operatorsPriority = new Map([
    ['+', 0],
    ['-', 0],
    ['*', 1],
    ['÷', 1],
    ['u-', 2], // unary minus, like -5, -(4 + 3), etc.
]);

function isNumber(str) {
    // Regular expression to match a float number
   return /^-?\d+(\.\d+)?$/.test(str);
}

function createStack() {
    return {
        items : [],
        push(item) {
            this.items.push(item);
        },

        pop() {
            return this.items.pop();
        },

        top() {
            if(this.items.length == 0) return null;
            return this.items[this.items.length - 1];
        }
    };
}

function isIn(val, array) {
    return array.indexOf(val) != -1;
}

function validateExpression(expresion) {
    function canPutCharacter(current, previous) {
        if(isIn(previous, digits)) {
            return isIn(current, [...digits, ...operators, ')', '.']);
        }

        if(previous == '(') {
            return isIn(current, [...digits, '-', '(']);
        }

        if(previous == ')') {
            return isIn(current, [...operators, ')']);
        }

        if(previous == '.') {
            return isIn(current, digits);
        }
        
        if(isIn(previous, operators)) {
            return isIn(current, [...digits, '(']) || (previous != '-' && current == '-');
        }
        
        return false;
    }
    if(expresion.length == 1)
        return isIn(expresion.charAt(0), digits);
    if(!isIn(expresion.charAt(0), [...digits, '(', '-']))
        return false;

    let parCount = expresion.charAt(0) == '(' ? 1 : 0;
    let current, previous;
    for(let i = 0; i < expresion.length - 1; ++i) {
        current = expresion.charAt(i + 1);
        previous = expresion.charAt(i);
        if(current == '(')
            ++parCount;
        else if(current == ')')
            --parCount;
        if(!canPutCharacter(current, previous))
            return false;
    }
    return parCount == 0;
}

export function extractTokens(string) {
    function isNumericElement(char) {
        return ((char >= '0' && char <= '9') || char == '.');
    }

    let expresion = [];
    let number;
    let i = 0, j;
    while(i < string.length) {
        number = "";
        if(string.charAt(i) == '-' && (i == 0 || !isNumericElement(string.charAt(i - 1)))) {
            expresion.push('u-');
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

function toReversedPolishConvention(expresion) {
    let converted = [], element, stack = createStack();
    for(element of expresion) {
        if(element == '(') {
            stack.push(element);
        }
        else if(element == ')') {
            while(stack.top() && stack.top() != '(') converted.push(stack.pop());
            stack.pop();
        }
        else if(isIn(element, parsed_operators)) {
            while(stack.top() && isIn(stack.top(), parsed_operators)
            && operatorsPriority.get(stack.top()) >= operatorsPriority.get(element))
                converted.push(stack.pop());
            stack.push(element);
        }
        else {
            //Numbers
            converted.push(element);
        }
    }

    while(stack.top())
        converted.push(stack.pop());

    return converted;
}

export function evaluate(string) {
    if(!validateExpression(string))
        throw new Error("Incorrect expression");
    let expresion = toReversedPolishConvention(extractTokens(string));

    let numbersStack = createStack();
    let numb1, numb2;
    for(let token of expresion) {
        if(isNumber(token)) {
            numbersStack.push(parseFloat(token));
        }
        else if (token == 'u-') {
            numbersStack.push(-numbersStack.pop());
        }
        else {
            numb2 = numbersStack.pop();
            numb1 = numbersStack.pop();
            switch(token) {
            case '+':
                numbersStack.push(numb1 + numb2);
                break;
            case '-':
                numbersStack.push(numb1 - numb2);
                break;
            case '*':
                numbersStack.push(numb1 * numb2);
                break;
            case '÷':
                if(numb2 == 0) throw new Error("Division by 0!");
                numbersStack.push(numb1 / numb2);
                break;
            }
        }
    }
    return numbersStack.pop();
}