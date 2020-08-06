document.addEventListener('DOMContentLoaded', () => {
  
  const $screen = document.getElementById('screen');
  const $buttons = document.querySelectorAll('span');
  
  $buttons.forEach($button => {
    $button.addEventListener('click', () => {      
      isClear($button.textContent) ? clearScreen() : pushButton($button.textContent);
    });
  });

  document.addEventListener('keydown', (event) => {
    const key = isClear(event.key) ? clearScreen() : event.key;
    if(isAButton(key)) { pushButton(key); }
  });  


  const pushButton = (button) => {
    if (!error()) {
      isEquals(button) ? evaluate() : appendToScreen(filterButton(button));
    }
  };

  const error = () => {
    return ($screen.textContent === 'Error');
  };

  const clearScreen = () => {
    $screen.textContent = '';
    return false;
  };
  
  const evaluate = () => {
    const screen = $screen.textContent;
    clearScreen();
   
    try { 
      appendToScreen(eval(screen));
    } catch { 
      appendToScreen('Error'); 
    }
  };
  
  const appendToScreen = (input) => {
    $screen.textContent = $screen.textContent + input;
  };

  const isAButton = (button) => {
    return isEquals(button) || filterButton(button);
  };

  const isClear = (button) => {
    return (button === 'C' || button === 'Escape' || button === 'Clear') ? 'C' : false;
  };
  
  const isEquals = (button) => {
    return (button === '=' || button === 'Enter');
  };
  
  const filterButton = (button) => {
    return isNumber(button);
  };

  const isNumber = (button) => {
    return ('0123456789+-*/').includes(button)? button : isDivision(button);
  };

  const isDivision = (button) => {
    return (button === '÷') ? '/' : isMulitplication(button);
  };

  const isMulitplication = (button) => {
    return (button === 'x') ? '*' : false;
  };

});