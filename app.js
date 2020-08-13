document.addEventListener('DOMContentLoaded', () => {
  
  const $screen = document.querySelector('#screen');
  const $buttons = document.querySelectorAll('span');
  
  $screen.style.display = 'flex';
  $screen.style.justifyContent = 'flex-end';

  $buttons.forEach($button => {
    $button.addEventListener('click', () => isClear($button.textContent)
     ? clearScreen()
     : pushButton($button.textContent));
  });

  document.addEventListener('keydown', (event) => isClear(event.key)
    ? clearScreen()
    : pushButton(event.key));  


  const pushButton = (button) => isEquals(button) ? evaluate() : appendToScreen(filtered(button));

  const error = () => ($screen.textContent === 'Error');

  const clearScreen = () => $screen.textContent = '';
  
  const evaluate = () => {
    const expression = $screen.textContent;
    clearScreen();
   
    try { appendToScreen(doMath(expression)); }
    catch { appendToScreen('Error'); }
  };
  
  const appendToScreen = (input) => {
    if (!error() && input) {
      $screen.textContent = $screen.textContent + input;
    }
  };

  const filtered = (button) => isNumber(button) || isOperator(button);

  const isClear = (button) => (button === 'C' || button === 'Escape' || button === 'Clear');
  
  const isEquals = (button) => (button === '=' || button === 'Enter');

  const isNumber = (button) => ('0123456789').includes(button) ? button : false;

  const isOperator = (button) => {
    const operators = {
      '+': '+',
      '-': '-',
      'x': 'x', 
      '*': '*',
      '/': '/',
      '÷': '÷',
      '.': '.'
    };

    return operators[button];
  };

  const doMath = (expression) => {
    const [a, operator, b] = expression.match(/[^\d()]+|[\d.]+/g);  // no idea how this regex works

    const math = {
      '+': (a, b) => +a + +b,
      '-': (a, b) => +a - +b,
      '*': (a, b) => +a * +b,
      'x': (a, b) => +a * +b,
      '/': (a, b) => +a / +b,
      '÷': (a, b) => +a / +b
    };

    const result = math[operator](a, b);
    
    return result.toString().substring(0,12);
  };
});
