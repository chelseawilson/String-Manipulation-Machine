class Machine {
  constructor() {
    this.funcList = [];
  }
  reset() {
    this.funcList.splice(0, this.funcList.length);
  }
  add(func) {
    this.funcList.push(func);
  }
  remove(index1, index2) {
    let diff = index2 - index1;
    this.funcList.splice(index1, diff);
  }
  print() {
    let symbols = [];
    var i;
    for (i = 0; i < this.funcList.length; i++) {
      if (this.funcList[i] == reverse) {
        symbols.push("v");
      } else if (this.funcList[i] == invert) {
        symbols.push("i");
      } else if (this.funcList[i] == addChar) {
        symbols.push("a");
      } else if (this.funcList[i] == removeLast) {
        symbols.push("l");
      } else if (this.funcList[i] == order) {
        symbols.push("o");
      }
    }
    console.log(symbols).join("-");
  }
  run(str) {
    var i;
    for (var i = 0; i < this.funcList.length; i++) {
      let temp = this.funcList[i](str);
      console.log(temp);
      str = temp
    }
  }
}


function reverse(str) {
  let li = str.split("");
  var i;
  let back = [];
  for (i = li.length - 1; i > -1; i--) {
    back.push(li[i]);
  }
  return back.join("");
}

function invert(str) {
  let li = str.split("");
  var i;
  let inverted = [];
  for (i = 0; i < li.length; i++) {
    if (li[i] == "0") {
      inverted.push("1");
    } else if (li[i] == "1") {
      inverted.push("0");
    } else {
      inverted.push("-");
    }
  }
  return inverted.join("");
}

function addChar(str) {
  let li = str.split("");
  li.push(li[0]);
  return li.join("");
}

function removeLast(str) {
  let li = str.split("");
  li.pop(li[li.length - 1]);
  return li.join("");
}

function order(str) {
  let li = str.split("");
  var i;
  let num0 = 0;
  let num1 = 0;
  for (i = 0; i < li.length; i++) {
    if (li[i] == "0") {
      num0 += 1;
    } else if (li[i] == "1") {
      num1 += 1;
    }
  }
  let out = "";
  for (i = 0; i < num0; i++) {
    out += "0";
  }
  for (i = 0; i < num1; i++) {
    out += "1";
  }
  return out;
}


let funcs = [reverse, invert, addChar, removeLast, order];
let mac = new Machine();
mac.add(funcs[0]);
mac.add(funcs[1]);
mac.print();
mac.run("100");
