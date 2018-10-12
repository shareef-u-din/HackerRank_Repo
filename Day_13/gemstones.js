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

// Complete the gemstones function below.
function gemstones(arr){
  var first = arr[0].split("");
  var gemstone = [];

  for(var i = 0;i < first.length; i++) {
    var valid = true;
    for(var j = 1;j < arr.length; j++) {
      if(arr[j].indexOf(first[i]) === -1) {
        valid = false;
        break;
      }
    }
      
    if(valid && gemstone.indexOf(first[i]) === -1) {
      gemstone.push(first[i]);
    }
  }

  return gemstone.length;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let arr = [];

    for (let i = 0; i < n; i++) {
        const arrItem = readLine();
        arr.push(arrItem);
    }

    let result = gemstones(arr);

    ws.write(result + "\n");

    ws.end();
}