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
  }
}

// store inputs ( x, operator, y)
// once inputs are 3, call operate with inputs
// inputs are stored on screen, so change screen somehow
function onButtonPress(key) {
  const screen = document.querySelector(".screen");
  screen.textContent += key;
  console.log(screen.textContent);

  let input = screen.textContent;
  if (input.length == 3) {
    console.log(`commencing operate(${input[1]}, ${input[0]}, ${input[2]})`);
    let result = operate(input[1], input[0], input[2]);
    console.log(`result: ${result}`);
    screen.textContent = "";
  }
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
  if (y == 0) return Error;

  return x / y;
}

addButtonFunctionality();

module.exports = {
  operate,
  onButtonPress,
  addButtonFunctionality,
  add,
  subtract,
  multiply,
  divide,
};
