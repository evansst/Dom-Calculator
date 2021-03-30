document.addEventListener('DOMContentLoaded', () => {
  
  const $screen = document.querySelector('#screen');
  const $buttons = document.querySelectorAll('span');
  
  $screen.style.display = 'flex';
  $screen.style.justifyContent = 'flex-end';

  $buttons.forEach((button) =>
      button.addEventListener('click', ({target: { textContent }}) => push(textContent)));

  document.addEventListener('keydown', ({key}) => push(key));

  const push = (button) => isClear(button) || isEquals(button) || isInput(button);
  
  const noError = () => $screen.textContent !== 'Error';
  const clearScreen = () => {
    $screen.textContent = ''
    return true
  };

  const evaluate = () => {
    const expression = $screen.textContent;
    clearScreen();
   
    try { append(evaluated(expression)); }
    catch { append('Error'); }
    return true;
  };

  const append = (input) => {
    if (noError() && input) {
      $screen.textContent += input
      return true
    }
    return false;
  };

  const isInput = (input) => (isNumber(input) || isOperator(input)) ? append(input) : false;
  const isClear = (input) => (input.toUpperCase() === 'C' || input === 'Escape' || input === 'Clear') ? clearScreen() : false;  
  const isEquals = (input) => (input === '=' || input === 'Enter') ? evaluate() : false;
  const isNumber = (input) => input.match(/[0-9]/);
  
  const isOperator = (input) => ({
      '+': '+',
      '-': '-',
      'x': 'x',
      '*': '*',
      '/': '/',
      '÷': '÷',
      '.': '.'
    })[input];

  const evaluated = (expression) => {
    const [a, operator, b] = expression.match(/[^\d()]+|[\d.]+/g);  // no idea how this regex works

    return {
      '+': (a, b) => +a + +b,
      '-': (a, b) => +a - +b,
      '*': (a, b) => +a * +b,
      'x': (a, b) => +a * +b,
      '/': (a, b) => +a / +b,
      '÷': (a, b) => +a / +b
    }[operator](a, b).toString().substring(0,12);
  };
});
