function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return 'ERROR';
    }
    return a / b;
}

function operate(operator, a, b) {
    if (operator == '+') return add(a, b);
    if (operator == '-') return subtract(a, b);
    if (operator == '*') return multiply(a, b);
    if (operator == '/') return divide(a, b);

}

function createRows() {
    const arr = [7,8,9,'<=','CLR',4,5,6,'X','/',1,2,3,'+','-',0,'.','+/-',`P`,'='];
    let ind = 0;
    for (let r = 0; r < 4; ++r) {
        let row = document.createElement('div');
        row.classList.add('button-row');
        for (let col = 0; col < 5; ++col) {
            let button = document.createElement('div');
            button.classList.add('button');
            button.textContent = arr[ind];
            ++ind;
            row.append(button);
        }
        buttons.append(row);
    }

}

createRows();
let operand1 = "";
let operand2 = "";
let operator = "";

function pressNumber(num) {
    if (operand1 != "ERROR") {
        if (operand1 != "" || operator == "") {
            if (num == '-' && operand1 != "") return
            operand1.concat(num);
            display.textContent = operand1;
        }
        else {
            if (num == '-' && operand2 != "") return
            operand2.concat(num);
            display.textContent = operand2;
        }
    }
}

function pressSymbol(symbol) {
    if (operand1 != "ERROR") {
        if (operand1 != "" && operand2 != "" && operator != "") {
            operand1 = operate(operator, operand1, operand2);
            display.textContent = operand1;
            operator = symbol;
        }
        else if (operand1 == "" || operator != "") {
            operand1 = "ERROR";
            display.textContent = operand1;
        }
        else {
            operator = symbol;
            display.textContent = operator;
        }
    }
}