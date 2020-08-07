document.addEventListener('DOMContentLoaded', () => {
  
  const $screen = document.getElementById('screen');
  const $buttons = document.querySelectorAll('span');
  
  $screen.style.display = 'flex';
  $screen.style.justifyContent = 'flex-end';

  $buttons.forEach($button => {
    $button.addEventListener('click', () => {      
      isClear($button.textContent) ? clearScreen() : pushButton($button.textContent);
    });
  });

  document.addEventListener('keydown', (event) => {
    isClear(event.key) ? clearScreen() : pushButton(event.key);
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
      // appendToScreen(doMath(screen));
    } catch { 
      appendToScreen('Error'); 
    }
  };
  
  const appendToScreen = (input) => {
    if (!(input === false || input == undefined)) {
      $screen.textContent = $screen.textContent + input; }
  };

  const isClear = (button) => {
    return (button === 'C' || button === 'Escape' || button === 'Clear') ? 'C' : false;
  };
  
  const isEquals = (button) => {
    return (button === '=' || button === 'Enter');
  };
  
  const filterButton = (button) => {
    return isNumber(button) || isDivision(button) || isMulitplication(button);
    // return isNumber(button);
  };

  const isNumber = (button) => {
    return ('0123456789+-*/÷x').includes(button)? button : false;
  };

  const isDivision = (button) => {
    return (button === '÷') ? '/' : false;
  };

  const isMulitplication = (button) => {
    return (button === 'x') ? '*' : false;
  };

  // const doMath = (string) => {
  //   const array = string.match(/[^\d()]+|[\d.]+/g);

  //   if (array.length > 3) return 'Error';

  //   switch(array[1]) {
  //     case '+':
  //       return +array[0] + +array[2];
  //     case '-':
  //       return +array[0] - +array[2];
  //     case 'x':
  //     case '*': 
  //       return +array[0] * +array[2];
  //     case '÷':
  //     case '/':
  //       return array[2] == 0 ? 'Error' : +array[0] / +array[2];
  //     default:
  //       return array.join();
  //   }
  // };

});