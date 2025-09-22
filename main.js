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

function calculateExpression(nums, operators) {
  // must follow this order to work
  let pemdas = ["^", "*", "/", "-", "+"];
  for (let i = 0; i < pemdas.length; i++) {
    if (!operators.includes(pemdas[i])) continue; // skip operator if not present

    for (let j = 0; j < operators.length; j++) {
      if (operators[j] == pemdas[i]) {
        console.log(`running: operate(${operators[j]}, ${nums[j]}, ${nums[j + 1]})`);
        result = operate(operators[j], parseFloat(nums[j]), parseFloat(nums[j + 1]));
        console.log(`result: ${result}`);

        nums[j] = null;
        nums[j + 1] = result; // store result(s) as next num for future calcs
        operators[j] = null;
      }
    }

    // remove nums and operators that have been used
    nums = nums.filter((num) => num != null);
    operators = operators.filter((operator) => operator != null);
    console.log(nums);
    console.log(operators);
  }

  return nums[0];
}

function onButtonPress(key) {
  // inputs are stored on screen, so manipulate screen to do things
  const screen = document.querySelector(".screen");

  if (key == "BACK") {
    screen.textContent = screen.textContent.slice(0, -1);
    return;
  }

  if (key == "CLEAR") {
    screen.textContent = "";
    return;
  }

  // prevent invalid duplicate operators and invalid periods (++, *^, /+, .., 6.5.3, etc)
  lastChar = screen.textContent.slice(-1);
  secondLastChar = screen.textContent.slice(-2, -1);
  if (isDuplicateOperator(lastChar, secondLastChar, key)) return;
  if (key == "." && !isValidDecimal(screen.textContent)) return;

  screen.textContent += key;
  console.log(screen.textContent);

  if (key == "=") {
    let nums = getNumbers(screen.textContent);
    let operators = getOperators(screen.textContent);
    console.log(nums);
    console.log(operators);

    let result = calculateExpression(nums, operators);

    const resultScreen = document.querySelector(".result");
    resultScreen.textContent = screen.textContent + result;
    screen.textContent = "";
  }
}

function isDuplicateOperator(lastChar, secondLastChar, key) {
  let operators = ["+", "-", "*", "/", "^", "."];
  // handle "-" differently to account for negatives
  if (key == "-") {
    if ((operators.includes(lastChar) && operators.includes(secondLastChar)) || lastChar == ".") {
      return true;
    }
    return false;
  }

  if (operators.includes(key) && operators.includes(lastChar)) {
    return true;
  }
  return false;
}

function isValidDecimal(currentString) {
  let operators = ["+", "-", "*", "/", "^", "."];
  for (let i = currentString.length; i >= 0; i--) {
    if (operators.includes(currentString[i])) {
      if (currentString[i] != ".") {
        return true;
      }
      return false;
    }
  }
  return true;
}

function getNumbers(str) {
  // any sequence of digits preceded by and including "-" at start of string OR
  // any sequence of digits preceded by and including "-" preceded by a non-digit (assume operator) (i.e *-82) OR
  // any sequence of digits
  return str.match(/^\-\d+\.?\d*|(?<=[^\d])-\d*\.?\d*|\d+\.?\d*/g);
}

function getOperators(str) {
  // "+" OR "*" OR "/" OR "^" OR
  // "-" preceded by any digit
  return str.match(/\+|\*|\/|\^|(?<=\d)-/g);
}

function addButtonFunctionality() {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.addEventListener("click", onButtonPress.bind(event, button.textContent));
  });
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

//TODO: keyboard support
