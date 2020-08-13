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
   
    try { appendToScreen(doMath(expression)); }
    catch { appendToScreen('Error'); }
  };
  
  const appendToScreen = (input) => {
    if (input !== false && input !== undefined) { $screen.textContent = $screen.textContent + input; }
  };

  const filterButton = (button) => isNumber(button) || isOperator(button);

  const isClear = (button) => (button === 'C' || button === 'Escape' || button === 'Clear');
  
  const isEquals = (button) => (button === '=' || button === 'Enter');

  const isNumber = (input) => ('0123456789').includes(input) ? input : false;

  const isOperator = (input) => {
    const operators = {
      '+': '+',
      '-': '-',
      'x': '*',
      '*': '*',
      '/': '/',
      '÷': '/',
      '.': '.'
    };
    return operators[input];
  };

  const doMath = (string) => {
    const [a, operator, b] = string.match(/[^\d()]+|[\d.]+/g);  // no idea how this regex works
    const math = {
      '+': (a, b) => { return +a + +b; },
      '-': (a, b) => { return +a - +b; },
      '*': (a, b) => { return +a * +b; },
      '/': (a, b) => { return +a / +b; }
    };

    const result = math[operator](a, b);
    
    return result.toString().substring(0,12);
  };
});
