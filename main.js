class Counter {
  constructor(runFiveTimes) {
    this.counter = 0;
    this.callBack = runFiveTimes;
  }
  increase() {
    this.counter++;

    if (this.counter % 5 === 0) {
      this.callBack && this.callBack(this.counter);
    } else {
      console.log(this.counter);
    }
  }
}

function printSomething(num) {
  console.log(`yo! ${num}`);
}
function alertSomething(num) {
  alert(`yo! ${num}`);
}
const num = new Counter(printSomething);
num.increase();
num.increase();
num.increase();
num.increase();
num.increase();
num.increase();
num.increase();
num.increase();
num.increase();
num.increase();
