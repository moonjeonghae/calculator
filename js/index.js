window.onload = function() {
    // #숫자 버튼을 누르면 숫자 나오게 하기
    const numberDisplay = document.querySelector('.number');
    const numBtns = document.querySelectorAll('.num');
    const pointBtn = document.querySelector('.point');
    const signToggleBtn = document.querySelector('.sign');

    let currentNum = '';
    let previousNum = '';
    let operator = '';
    // # .버튼을 눌렀을 때 .이 입력되게 하기

    numBtns.forEach(numBtn => {
        numBtn.addEventListener('click', () => {
            const newNum = numBtn.textContent;

            currentNum += newNum;
            numberDisplay.textContent = currentNum;
        });
    });

    // # 소숫점 버튼 눌렀을 때
    pointBtn.addEventListener('click', () => {
        if(currentNum.includes('.')) return;
        currentNum += '.';
        numberDisplay.textContent = currentNum;
    });

    // # 음수/양수 버튼 눌렀을 때
    signToggleBtn.addEventListener('click', () => {
        if(currentNum === '') return;
        
        if(currentNum.startsWith('-')) {
            currentNum = currentNum.substring('1');
        } else {
            currentNum = '-' + currentNum;
        }

        numberDisplay.textContent = currentNum;
    });

    // clear 버튼 누르면 초기화 시키기
    const clearBtn = document.querySelector('.clear');

    clearBtn.addEventListener('click', () => {
        numberDisplay.textContent = '';
        currentNum = '';
        previousNum = '';
        operator = '';
    });

    // #계산 부호 버튼 누르면 해당되는 계산 되게 하기
    const operatorBtns = document.querySelectorAll('.operator');

    operatorBtns.forEach(operatorBtn => {
        operatorBtn.addEventListener('click', () => {
            // ##1. 현재 입력된 숫자가 없을 시
            if(currentNum === '' && previousNum === '') 
                // ##1-1. operator 무시
                return;

            // ##1. 처음 입력한 숫자만 있을 시
            if (currentNum !== '' && previousNum === '') {
                previousNum = currentNum;
                currentNum = '';  // 현재 숫자 리셋
            }
            // ##2. 처음 입력한 숫자와 그 다음에 입력한 숫자가 있을 시
            else if (currentNum !== '' && previousNum !== '') {
                previousNum = calculate(previousNum, currentNum, operator);
                numberDisplay.textContent = previousNum;
                currentNum = '';  // 현재 숫자 리셋
            }

            operator = operatorBtn.textContent;
        });
    });

    // #계산 부호 사용 함수 
    function calculate(num1, num2, operator) {
        num1 = Number(num1);
        num2 = Number(num2);

        let result;

        switch(operator) {
            case '+' : result = num1 + num2;
            break;
            case '-' : result = num1 - num2;
            break;
            case 'X' : result = num1 * num2;
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

    // # 결과 버튼 눌렀을 때
    const resultBtn = document.querySelector('.result');

    resultBtn.addEventListener('click', () => {
        if (currentNum !== '' && previousNum !== '' && operator !== '') {
            previousNum = calculate(previousNum, currentNum, operator);
            numberDisplay.textContent = previousNum;
            currentNum = ''; 
            operator = '';
        }
    });
}