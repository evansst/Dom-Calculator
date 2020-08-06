document.addEventListener('DOMContentLoaded', () => {
  
  const $screen = document.getElementById('screen');
  const $buttons = document.querySelectorAll('span');
  
  $buttons.forEach($button => {
    $button.addEventListener('click', (event) => {
      const button = $button.textContent;
      
      pushButton(button);
    });
    
  });

  document.addEventListener('keydown', (event) => {
    const key = event.key;

    pushButton(key);
  });  

  function pushButton(button) {
    if (isClear(button)) {
      clear();
    } else {
      if (error()) {
        return '';
      } else if(isEquals(button)) {
        equals($screen.textContent);
      } else {
        appendToScreen(isAButton(button));
      }
    }
  }

  function error() {
    return ($screen.textContent === 'Error') ? 
      true : 
      false;
  }

  function clear() {
    $screen.textContent = '';
  }
  
  function equals(screen) {
    clear();
   
    try { 
      appendToScreen(eval(screen));
    } catch { 
      appendToScreen('Error'); 
    }
    
  }
  
  function appendToScreen(input) {
    if(input) {
      $screen.textContent = $screen.textContent + input;
    }
  }

  function isClear(button) {
    return (button === 'C' || button === 'Escape' || button === 'Clear');
  }

  function isEquals(button) {
    return (button === '=' || button === 'Enter');
  }

  function isAButton(input) {
    if (('0123456789+-*/x÷.').includes(input)){
      if (input === 'x') { input = '*'; }
      if (input === '÷') { input = '/'; }

      return input;
    } else {
      return false;
    }
  }
  
  function doMath(string) {
    
  }

});