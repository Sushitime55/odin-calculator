function operate(operator, x, y) {
  switch (operator) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
    case "^":
      return exponent(x, y);
  }
}

// store inputs ( x, operator, y)
// once inputs are 3, call operate with inputs
// inputs are stored on screen, so change screen somehow
function onButtonPress(key) {
  const screen = document.querySelector(".screen");
  screen.textContent += key;
  console.log(screen.textContent);

  // ignore pemdas for now
  if (key == "=") {
    let nums = getNumbers(screen.textContent);
    let operators = getOperators(screen.textContent);
    console.log(nums);
    console.log(operators);

    // assuming nums.length == operators.length + 1
    let result = parseFloat(nums[0]);
    for (let i = 0; i < operators.length; i++) {
      console.log(`running: operate(${operators[i]}, ${result}, ${nums[i + 1]})`);
      result = operate(operators[i], result, parseFloat(nums[i + 1]));
      console.log(`result: ${result}`);
    }

    const resultScreen = document.querySelector(".result");
    resultScreen.textContent = screen.textContent + result;
    screen.textContent = "";
  }
}

function addButtonFunctionality() {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.addEventListener("click", onButtonPress.bind(event, button.textContent));
  });
}

function getNumbers(str) {
  // exclude all except 0-9 and '.'
  return str.split(/[^0-9.]/);
}

function getOperators(str) {
  // exclude 0-9, '=' and '.'
  return str.match(/\D/g).filter((char) => char != "=" && char != ".");
}

// MATH FUNCTIONS
function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y == 0) return "Can't divide by 0 dummy";

  return x / y;
}

function exponent(base, exp) {
  return base ** exp;
}

// comment this out to run tests
addButtonFunctionality();

module.exports = {
  operate,
  getNumbers,
  getOperators,
  add,
  subtract,
  multiply,
  divide,
  exponent,
};
