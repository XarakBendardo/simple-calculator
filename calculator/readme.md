# Simple JS calculator

## About
This is a simple project made for fun, which purpose was to develop an online calculator for basic operations: +, -, /, *, ().

## Parts
- `calc.html` - the HTML page of the calculator
- `calc.js` - script that manages interaction with the user (event listeners).
- `expression.js` - a simple parser of arithmetic operations.
    - first the string expresion is validated
    - then it is split into tokens
    - then it is converted to RPN
    - at the end the RPN is evaluated and the result is displayed on the screen
- `style.css`, `image.png` - resources for making the calculator prettier