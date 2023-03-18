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
    let res;
    if (operator == '+') res = add(a, b);
    if (operator == '-') res =  subtract(a, b);
    if (operator == 'X') res =  multiply(a, b);
    if (operator == '/') res = divide(a, b);
    if (String(res).length >= 17) {
        res = Math.round(res*100000000000000)/100000000000000;
    }
    return res;

}

function createRows() {
    const numbers = new Set(["1","2","3","4","5","6","7","8","9","0","+/-","."]);
    const symbols = new Set(["X","/","+","-","="]);
    const arr = ["7","8","9",'<=','CLR',"4","5","6",'X','/',"1","2","3",'+','-',"0",'.','+/-',`P`,'='];
    let ind = 0;
    for (let r = 0; r < 4; ++r) {
        let row = document.createElement('div');
        row.classList.add('button-row');
        for (let col = 0; col < 5; ++col) {
            let button = document.createElement('div');
            button.classList.add('button');
            let content = arr[ind];
            button.textContent = content;
            if (numbers.has(content)) button.addEventListener('click', () => {pressNumber(content)});
            else if (symbols.has(content)) button.addEventListener('click', () => {pressSymbol(content)});
            else if (content == 'CLR') button.addEventListener('click', pressClear);
            else if (content == '<=') button.addEventListener('click', pressBack);
            ++ind;
            row.append(button);
        }
        buttons.append(row);
    }

}
let operand1 = "";
let operand2 = "";
let operator = "";
createRows();

function pressNumber(num) {
    if (operand1 != "ERROR") {
        if (num == '+/-') num = '-';
        if (operator == "") {
            // if operand1 is a number, previous operation was equals so start fresh
            if (typeof operand1 == 'number') operand1 = "";
            if (num == '-' && operand1 != "") return;
            if (num == '0' && operand1.slice(0) == '0') return;
            operand1 = operand1.concat(num);
            display.textContent = operand1;
        }
        else { // if operator is set, you're either chaining or simply setting operand2
            if (num == '-' && operand2 != "") return
            if (num == '0' && operand2.slice(0) == '0') return
            operand2 = operand2.concat(num);
            display.textContent = operand2;
        }
    }
}

function pressSymbol(symbol) {
    if (operand1 != "ERROR") {
        if (operand1 != "" && operand2 != "" && operator != "") {
            operand1 = operate(operator, +operand1, +operand2); // operand1 is now a number, not a string
            display.textContent = operand1;
            if (symbol != "=") operator = symbol;
            else operator = "";
            operand2 = "";
        }
        else if (operand1 == "" || operator != "") {
            operand1 = "ERROR";
            display.textContent = operand1;
        }
        else if (symbol != "=") {        // symbol is not equals
            operator = symbol;
            display.textContent = operator;
        }
    }
}

function pressBack() {
    if (operand1 != "ERROR") { 
        if (operand2 != "") {
            operand2 = operand2.slice(0, operand2.length-1);
            display.textContent = operand2;
        }
        else if (operand1 != "" && operator == "") {
            operand1 = operand1.slice(0, operand1.length-1);
            display.textContent = operand1;
        }
    }
}

function pressClear() {
    [operand1, operand2, operator] = ["", "", ""];
    display.textContent = operand1;
}