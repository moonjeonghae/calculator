window.onload = function() {
    const numberDisplay = document.querySelector('.number');
    const numBtns = document.querySelectorAll('.num');
    const pointBtn = document.querySelector('.point');
    const signToggleBtn = document.querySelector('.sign');

    let currentNum = '';
    let previousNum = '';
    let operator = '';
    let isResult = false;

    numBtns.forEach(numBtn => {
        numBtn.addEventListener('click', () => {
            if (isResult) {
                currentNum = '';
                isResult = false;
            }

            const newNum = numBtn.textContent;
           
            if(currentNum === '0') {
                if(newNum === '0') {
                    return;
                } else if(newNum !== '.') {
                    currentNum = newNum;
                }
                else {
                    currentNum += newNum;
                }
            }
            else {
                currentNum += newNum;
            }

            numberDisplay.textContent = currentNum;
        });
    });

    pointBtn.addEventListener('click', () => {
        if (isResult) {
            currentNum = '';
            isResult = false;
        }
        
        if(!currentNum.includes('.')) {
            if(currentNum === '') {
                currentNum = '0';
            }
            currentNum += '.';
            numberDisplay.textContent = currentNum;
        }
    });

    signToggleBtn.addEventListener('click', () => {
        if(numberDisplay.textContent === '') return;
    
        let displayNum = numberDisplay.textContent;

        if(displayNum.startsWith('-')) {
            displayNum = displayNum.substring(1);
        } else {
            displayNum = '-' + displayNum;
        }

        numberDisplay.textContent = displayNum;

        if (!isResult) {
            currentNum = displayNum;
        } else {
            previousNum = displayNum;
        }
    });

    const clearBtn = document.querySelector('.clear');
    const clearEntryBtn = document.querySelector('.clear-entry');

    clearBtn.addEventListener('click', () => {
        numberDisplay.textContent = '';
        currentNum = '';
        previousNum = '';
        operator = '';
    });

    clearEntryBtn.addEventListener('click', () => {
        numberDisplay.textContent = '';
        currentNum = '';
    });

    const operatorBtns = document.querySelectorAll('.operator');

    operatorBtns.forEach(operatorBtn => {
        operatorBtn.addEventListener('click', () => {
            if(currentNum === '' && previousNum === '') 
                return;

            if (currentNum !== '' && previousNum === '') {
                previousNum = currentNum;
                currentNum = '';
            }
            else if (currentNum !== '' && previousNum !== '') {
                previousNum = calculate(previousNum, currentNum, operator);
                numberDisplay.textContent = previousNum;
                currentNum = ''; 
            }

            operator = operatorBtn.textContent;
            isResult = false;
        });
    });

    function calculate(num1, num2, operator) {
        num1 = Number(num1);
        num2 = Number(num2);

        let result;

        switch(operator) {
            case '+' : result = num1 + num2;
            break;
            case '-' : result = num1 - num2;
            break;
            case 'x' : result = num1 * num2;
            break;
            case '/' : result = num1 / num2;
            break;
            case '%' : result = num1 % num2;
            break;
            default : result = num2;
            break;
        }
        return result;
    }

    const resultBtn = document.querySelector('.result');

    resultBtn.addEventListener('click', () => {
        if (currentNum !== '' && previousNum !== '' && operator !== '') {
            previousNum = calculate(previousNum, currentNum, operator);
            numberDisplay.textContent = previousNum;
            currentNum = ''; 
            operator = '';
            isResult = true;
        }
    });
}