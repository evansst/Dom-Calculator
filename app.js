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


  const pushButton = (button) => {
    if (!error()) {
      isEquals(button) ? evaluate() : appendToScreen(filterButton(button));
    }
  };

  const error = () => ($screen.textContent === 'Error');

  const clearScreen = () => {
    $screen.textContent = '';
    // return false;
  };
  
  const evaluate = () => {
    const expression = $screen.textContent;
    clearScreen();
   
    try { 
      appendToScreen(doMath(expression));
    } catch { 
      appendToScreen('Error'); 
    }
  };
  
  const appendToScreen = (input) => {
    if (input !== false && input !== undefined) { $screen.textContent = $screen.textContent + input; }
  };

  const isClear = (button) => (button === 'C' || button === 'Escape' || button === 'Clear') ? 'C' : false;
  
  const isEquals = (button) => (button === '=' || button === 'Enter');
  
  const filterButton = (button) => isNumber(button) || isOperator(button);

  const isNumber = (input) => ('0123456789').includes(input) ? input : false;

  const isOperator = (input) => {
    const operators = {
      '+': '+',
      '-': '-',
      'x': '*',
      '*': '*',
      '/': '/',
      '÷': '/'
    };
    return operators[input];
  };


  const doMath = (string) => {
    const expression = string.match(/[^\d()]+|[\d.]+/g);

    const math = {
      '+': (a, b) => { return +a + +b; },
      '-': (a, b) => { return +a - +b; },
      '*': (a, b) => { return +a * +b; },
      '/': (a, b) => { return +a / +b; }
    };
    
    return (expression.length > 3) ? 'Error' : math[expression[1]](expression[0], expression[2]);
  };
});
