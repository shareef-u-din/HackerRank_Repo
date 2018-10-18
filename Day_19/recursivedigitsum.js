'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the digitSum function below.
function digitSum(n, k) {
    let nString = n.toString();
    let num = 0;
    
    for (let i = 0; i < nString.length; i++) {
        num += Number(nString[i])
    }
    num = num * k;
    
    while (!(num.toString().length === 1)) {
        nString = num.toString();
        num = 0;
        for (let i = 0; i < nString.length; i++) {
            num += Number(nString[i])
        }
    }
    return num;


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = nk[0];

    const k = parseInt(nk[1], 10);

    const result = digitSum(n, k);

    ws.write(result + '\n');

    ws.end();
}