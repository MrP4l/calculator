let CurrentNumber = document.getElementById("current-number");
let equalButton = document.getElementById("equal");
let plusButton = document.getElementById("plus");
let minusButton = document.getElementById("minus");
let multiplyButton = document.getElementById("multiply");
let divisionButton = document.getElementById("division");
let DataStorage = "";
let UserInput = "";
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;
let dotCounter = "";

CurrentNumber.innerHTML = 0;

// #1 First to occur when buttons are pressed
// Store all the values in DataStorage as strings and only the last digit in UserInput
function Display(Input) { 
    DataStorage += Input; 
    if (operator != null && UserInput == "+" || operator != null && UserInput == "-" || operator != null && UserInput == "*" || operator != null && UserInput == "/") { // mettere che matcha tutti gli operatori
        UserInput = ""
    } else {
        UserInput = Input;
    }
    CurrentNumber.innerHTML = DataStorage
    DontDisplayDoubleDot()
}

// To prevent the digits of more than one dots in a number, the second dot is replaced with the next UserInput  
function DontDisplayDoubleDot() {
    dotCounter = (DataStorage.match(/\./g)||[]).length;
    if (dotCounter > 1) {
        DataStorage = DataStorage.slice(0,-1);
    }
}

// To delete the last digit  
function DeleteLastChar() {
    if (firstOperand === null && secondOperand === null) {
        DataStorage = DataStorage.toString() //
        DataStorage = DataStorage.slice(0, -1)
        return CurrentNumber.innerHTML = DataStorage;
    } else if (firstOperand != null) {
        result = result.toString()
        result = result.slice(0, -1)
        return CurrentNumber.innerHTML = result;
    }
}

// Function that get the firstOperand, the secondOperand and the operator
function getNumbers() {
    if (firstOperand == null && secondOperand == null) {
        if (UserInput === "+" || UserInput === "-" || UserInput === "*" || UserInput === "/") {
            operator = UserInput
            firstOperand = DataStorage;
            firstOperand = parseFloat(firstOperand.slice(0, -1));
            DataStorage = "";
        }
    }
    if (firstOperand != null && secondOperand == null && DataStorage !== "") {
        if (UserInput === "+" || UserInput === "-" || UserInput === "*" || UserInput === "/" || UserInput === "=") {
            secondOperand = DataStorage;
            secondOperand = parseFloat(secondOperand.slice(0, -1));
            DataStorage = ""
        }
    }
    if (firstOperand != null && secondOperand != null) {
        Operate(firstOperand, operator, secondOperand)
        setTheNewFirstOperator()
    }
}

// After the Operate function the result of operation become the firstOperator and it'll be used for the next call
function setTheNewFirstOperator() {
    firstOperand = null
    secondOperand = null
    firstOperand = result
    DataStorage = "";
    operator = ""
    operator = UserInput
}

// Does the operations considering the firstOperand, operator and the secondOperand
function Operate(firstOperand, operator, secondOperand) {
    switch (operator) {
        case "+":
            CurrentNumber.innerHTML = Add(firstOperand, secondOperand);
            break;
        case "-":
            CurrentNumber.innerHTML = Subtract(firstOperand, secondOperand);
            break;
        case "*":
            CurrentNumber.innerHTML = Multiply(firstOperand, secondOperand);
            break;
        case "/":
            CurrentNumber.innerHTML = Division(firstOperand, secondOperand);
            break;
        default:
            return;
    }
}

function Add(firstOperand, secondOperand) {
    result = (firstOperand + secondOperand);
    result = parseFloat(result.toFixed(2))
    return result;
}

function Subtract(firstOperand, secondOperand) {
    result = (firstOperand - secondOperand);
    result = parseFloat(result.toFixed(2))
    return result;
}

function Multiply(firstOperand, secondOperand) {
    result = (firstOperand * secondOperand);
    result = parseFloat(result.toFixed(2))
    return result;
}

function Division(firstOperand, secondOperand) {
    result = (firstOperand / secondOperand);
    result = parseFloat(result.toFixed(2))
    return result;
}

// Number displayed // 100
function Percent() {
    if (firstOperand === null && secondOperand === null) {
        DataStorage = parseFloat(DataStorage)
        DataStorage = (DataStorage / 100).toFixed(2);
        return CurrentNumber.innerHTML = DataStorage
    } else if (firstOperand != null) {
        result = parseFloat(result)
        result = (result / 100).toFixed(2)
        return CurrentNumber.innerHTML = result
    }
}

// The AC function, it cleans everything
function Clear() {
    DataStorage = "";
    CurrentNumber.innerHTML = 0;
    firstOperand = null;
    secondOperand = null;
}

equalButton.addEventListener('click', getNumbers);
plusButton.addEventListener('click', getNumbers);
minusButton.addEventListener('click', getNumbers);
multiplyButton.addEventListener('click', getNumbers);
divisionButton.addEventListener('click', getNumbers);