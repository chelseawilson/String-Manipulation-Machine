//Machine class stores a list of functions that modify a string of 1s and 0s
//has methods run, print, and methods to modify the list
class Machine {
  constructor() {
    this.funcList = [];
  }
  reset() {
    //clears the list of functions
    this.funcList.splice(0, this.funcList.length);
  }
  add(func) {
    //adds a funtion to the end of the list
    this.funcList.push(func);
  }
  remove(index1, index2) {
    //removes functions from the list (removal includes first index, but not second)
    let diff = index2 - index1;
    this.funcList.splice(index1, diff);
  }
  print() {
    //prints out a representation of the list, surrounded by ' -- '
    //each function is represented by a letter and is separated by '-'
    //'v' corresponds to reverse, 'i' to invert, 'a' to addChar, 'l' to removeLast,
    //and 'o' to order
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
    console.log(" -- " + symbols.join("-") + " -- ");
  }
  run(str) {
    //runs the input string through all of the modifying functions in the list
    //each time the string is modified, the resulting string is printed
    var i;
    for (var i = 0; i < this.funcList.length; i++) {
      let temp = this.funcList[i](str);
      console.log(temp);
      str = temp
    }
  }
}


//functions modifying the string
function reverse(str) {
  //reverses the order of the numbers in the string
  let li = str.split("");
  var i;
  let back = [];
  for (i = li.length - 1; i > -1; i--) {
    back.push(li[i]);
  }
  return back.join("");
}
function invert(str) {
  //inverts the string, turning 1s to 0s and 0s to 1s
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
  //adds the first number in the string to the end of the string
  let li = str.split("");
  li.push(li[0]);
  return li.join("");
}
function removeLast(str) {
  //removes the last number of the string
  let li = str.split("");
  li.pop(li[li.length - 1]);
  return li.join("");
}
function order(str) {
  //orders the numbers in the string, putting all of the 0s before the 1s
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


//setup to recieve and process user input
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
let mac = new Machine();
let funcs = {v:reverse, i:invert, a:addChar, l:removeLast, o:order};
let current = '';
let rem1 = -1;
var rem2;

//tells the user possible inputs and runs different methods of the machine
//according to the inputs
console.log("add, remove, reset, print, run, or exit");
rl.on('line', function (line) {
  //checks if in the process of gathering input for a specific Machine method
  //if not, asks the user for the next method to run
  //if so, asks for information needed to run the previously specified method,
  // then runs it
  if (current == '') {
    //if exit is entered, finishes taking input
    if (line == "exit") {
      process.exit();
    }
    //runs the method prompted by the input, or sets up variables to run it
    if (line == "add") {
      console.log("reverse(v), invert(i), addChar(a), removeLast(l), or order(o)");
      current = 'add';
    } else if (line == "remove") {
      console.log("enter the index to start removing from");
      current = 'remove';
    } else if (line == "print") {
      mac.print();
      console.log("add, remove, reset, print, run, or exit");
    } else if (line == "reset") {
      mac.reset();
      console.log('machine was reset');
      console.log("add, remove, reset, print, run, or exit");
    } else if (line == 'run') {
      console.log('enter string of 1s and 0s');
      current = 'run';
    }
  //collects and uses additional information needed to run the previously
  //specified method, then returns to asking for another method to run
  } else {
    if (current == 'add') {
      mac.add(funcs[line]);
      current = '';
      console.log("add, remove, reset, print, run, or exit");
    } else if (current == 'remove') {
      if (rem1 == -1) {
        rem1 = parseInt(line, 10);
        console.log('enter the index at which to stop removing');
      } else {
        //take away rem2 later
        rem2 = parseInt(line, 10);
        mac.remove(rem1, rem2);
        current = '';
        rem1 = -1
        console.log("add, remove, reset, print, run, or exit");
      }
    } else if (current == 'run') {
      mac.run(line);
      current = '';
      console.log("add, remove, reset, print, run, or exit");
    }
  }
});
