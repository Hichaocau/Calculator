const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const currentValueText = $('.current')
const preValueText = $('.previous')
const numberBtns = $$('.btn-number')
const operationBtns = $$('.btn-operation')
const clearBtn = $('.btn-clear')
const deleteBtn = $('.btn-delete')
const equalBtn = $('.btn-equal')
const dotBtn = $('.btn-dot')
let count = 0;

class calculatorMain {
  constructor(currentValueText, preValueText) {
    this.currentValueText = currentValueText;
    this.preValueText = preValueText;
    this.clear();
  }

  clear() {
    this.currentValue = "";
    this.preValue = "";
    this.operation = "";
  }

  delete() {
    if (this.currentValue != "Error") {
      this.currentValue = this.currentValue.slice(0, -1);
    }
  }

  addNumber(number) {
    count = 0;
    if (this.currentValue != "Error") {
      this.currentValue +=  number;
    }
  }

  checkDots(dot) {
    if (this.currentValue != "Error") {
      this.currentValue += dot;
    }
    let currentValueArray = this.currentValue.split('');
    // if (currentValueArray.includes('.') && currentValueArray.lastIndexOf('.') != currentValueArray.indexOf('.')) {
    //   console.log('hello')
    //   currentValueArray.splice(-1, 1)
    // }
    // console.log(currentValueArray);
    if ( (currentValueArray[currentValueArray.length - 1 ]) === (currentValueArray[currentValueArray.length - 2 ]) ){
      currentValueArray.splice(-1, 1);
    }
    this.currentValue = currentValueArray.join("");
  }

  chooseOperation(operation) {
    count = 0;
    if (this.currentValue === "" || this.currentValue == "Error") return
    this.currentValue +=  operation;

    let currentValueArray = this.currentValue.split('');
    if ( this.isOperand(currentValueArray[currentValueArray.length - 1 ]) && this.isOperand(currentValueArray[currentValueArray.length - 2 ]) ){
      currentValueArray.splice(-2, 2, operation);
    }
    this.currentValue = currentValueArray.join("");
  }

  isOperand(value) {
    let arrOperand = ["+", "-", "*", "/"];
    let checkOperand = arrOperand.some(operand => {
      return operand === value;
    })
    return checkOperand;
  }

  calculate() {
    if (count > 0) return
    try {
      count++;
      let result;
      result = eval(this.currentValue);
      this.preValue = this.currentValue;

      if (result === Infinity) {
        result = "Not a number";
      } else {
        this.currentValue = result;
      }
      this.operation = "";
      this.currentValue = result;
    }
    catch {
      this.currentValue = "Error";
    }
  }

  render() {
    this.currentValueText.innerText = this.currentValue.toLocaleString();
    if (this.operation != null) {
      this.preValueText.innerText = `${(this.preValue)} ${this.operation}`;
    }
    else {
      this.preValueText.innerText = "";
    }
  }
}
const calculatorObj = new calculatorMain(currentValueText, preValueText)

numberBtns.forEach(number => {
  number.addEventListener('click', () => {
    calculatorObj.addNumber(number.innerHTML);
    calculatorObj.render();
  })
})
operationBtns.forEach( operation => {
  operation.addEventListener('click', () => {
    calculatorObj.chooseOperation(operation.innerHTML);
    calculatorObj.render();
  })
})
equalBtn.addEventListener('click', () => {
  calculatorObj.calculate();
  calculatorObj.render();
})
dotBtn.addEventListener('click', () => {
  calculatorObj.checkDots(dotBtn.innerHTML);
  calculatorObj.render();
})
clearBtn.addEventListener('click', () => {
  calculatorObj.clear();
  calculatorObj.render();
})
deleteBtn.addEventListener('click', () => {
  calculatorObj.delete();
  calculatorObj.render();
})
// type keyboard
document.addEventListener('keydown', e => {
  if (e.keyCode > 48 && e.keyCode <= 56 && !e.shiftKey || e.keyCode == 57 || e.keyCode == 48) {
    calculatorObj.addNumber(e.key);
    calculatorObj.render();
  }
  if (e.keyCode == 188 || (e.keyCode == 190 && !e.shiftKey)) {
    calculatorObj.addNumber(".");
    calculatorObj.render();
  }
  if ((e.keyCode == 189 && !e.shiftKey ) || ( e.keyCode == 187 && e.shiftKey ) || ( e.keyCode == 56 && e.shiftKey ) || ( e.keyCode == 191 && !e.shiftKey )) {
    calculatorObj.chooseOperation(e.key);
    calculatorObj.render();
  }
  if (e.keyCode == 13) {
    calculatorObj.calculate();
    calculatorObj.render();
  }
  if (e.keyCode == 8) {
    calculatorObj.delete();
    calculatorObj.render();
  }
  if (e.keyCode == 27) {
    calculatorObj.clear();
    calculatorObj.render();
  }
})

// real time
function anc() {
  let date = new Date();
  let newDate = date.toString();
  let divItem = document.querySelector('.time');
  divItem.innerHTML = newDate.slice(16,21);
}
anc()
setInterval(anc, 1000)


