'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the isValid function below.
function isValid(s) {
var list = {};
  for (let i = 0; i < s.length; i++) {
    if (s[i] in list) {
      list[s[i]] += 1;
    } else {
      list[s[i]] = 1;
    }
  }
  var frequency = [];
  var lastIneq;
  var keys = Object.keys(list);
  for (var i = 0; i < keys.length; i++) {
    frequency.push(list[keys[i]]);
  }
  var difference = (Math.max(...frequency) - Math.min(...frequency))
  var count=0;
  for (let i = 1; i < frequency.length; i++) {
    if (frequency[0] !== frequency[i]) {
      count ++;
      lastIneq = i;
    }
  }
  console.log(frequency, count, difference)
  if(count <= 1){
    if(frequency[lastIneq] == 1 || difference <= 1){
     return "YES";
    }
    else{
      return "NO"
    }
  }
  else{
    return "NO";
  }

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = isValid(s);

    ws.write(result + "\n");

    ws.end();
}