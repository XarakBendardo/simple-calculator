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
            && operatorsPriority.get(stack.top()) >= operatorsPriority.get(token))
                converted.push(stack.pop());
            stack.push(token);
        }
        else if(isNumber(token))
            converted.push(token);
        else
            throw new Error("Incorrect token");
    }

    while(stack.top())
        converted.push(stack.pop());

    return converted;
}

export function evaluate(expresion) {
    console.log(toReversedPolishConvention(expresion));
}