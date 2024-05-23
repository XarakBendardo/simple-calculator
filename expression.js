export const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const operators = ['+', '-', '*', '÷'];
export const parsed_operators = [...operators, '~'];
export const operatorsPriority = new Map([
    ['+', 0],
    ['-', 0],
    ['*', 1],
    ['÷', 1],
    ['~', 2], // unary minus, like -5, -(4 + 3), etc.
]);

export class IncorrectExpressionError extends Error {
    constructor() {
        super("Incorrect expression");
    }
};

export function isNumber(str) {
    // Regular expression to match a float number
   return /^-?\d+(\.\d+)?$/.test(str);
}

export function isIn(val, array) {
    return array.indexOf(val) != -1;
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

function toReversedPolishConvention(expression) {
    let converted = [], token, stack = createStack();
    for(token of expression) {
        if(token == '(') {
            stack.push(token);
        }
        else if(token == ')') {
            while(stack.top() && stack.top() != '(')
                converted.push(stack.pop());
            stack.pop();
        }
        else if(isIn(token, parsed_operators)) {
            while(stack.top() && isIn(stack.top(), parsed_operators)
            && operatorsPriority.get(stack.top()) > operatorsPriority.get(token))
                converted.push(stack.pop());
            stack.push(token);
        }
        else if(isNumber(token))
            converted.push(parseFloat(token));
        else
            throw new IncorrectExpressionError();
    }

    while(stack.top())
        converted.push(stack.pop());

    return converted;
}

export function evaluate(expresion) {
    let expressionRPN = toReversedPolishConvention(expresion);

    function evaluateOperator(operator, stack) {
        let first, second, result;
        if(operator == '~') {
            first = stack.pop();
            if(typeof first != "number")
                throw new IncorrectExpressionError();
        }
        else {
            second = stack.pop();
            first = stack.pop();
            if(typeof first != "number" || typeof second != "number")
                throw new IncorrectExpressionError();
        }
        switch (operator) {
            case '~':
                result = -first;
                break;
            case '-':
                result = first - second;
                break;
            case '+':
                result = first + second;
                break;
            case '*':
                result = first * second;
                break;
            case '÷':
                result = first / second;
                break; 
        }
        stack.push(result);
    }

    let stack = createStack();
    for(const token of expressionRPN) {
        if(typeof token == "number") {
            stack.push(token);
        }
        else {
            evaluateOperator(token, stack);
        }
    }

    if(stack.items.length != 1)
        throw new IncorrectExpressionError();
    
    return stack.pop();
}