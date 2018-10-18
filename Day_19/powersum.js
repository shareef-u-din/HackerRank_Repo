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

// Complete the powerSum function below.
function powerSum(X, N, num) {
  const pow = Math.pow(num, N)
  console.log(pow)
  if(pow < X){
    return powerSum(X,N, num+1) + powerSum(X-pow,N, num+1)
  }else if(pow == X){
    return 1
  }
  return 0

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const X = parseInt(readLine(), 10);

    const N = parseInt(readLine(), 10);

    let result = powerSum(X, N, 1);

    ws.write(result + "\n");

    ws.end();
}