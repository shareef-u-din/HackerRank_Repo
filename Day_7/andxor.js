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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the andXorOr function below.
 */
function andXorOr(a) {
    const stack = [a[0]];
    let last, next, max = Number.MIN_VALUE;

    for (let i =1; i < a.length; i++) {
        while (stack.length) {
            last = stack[stack.length - 1];
            next = last ^ a[i];
            max = Math.max(next, max);
            if (last > a[i]) stack.pop();
            else break;
        }
        stack.push(a[i]);
    }
    return max;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const aCount = parseInt(readLine(), 10);

    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    let result = andXorOr(a);

    ws.write(result + "\n");

    ws.end();
}
