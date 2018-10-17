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

// Complete the cost function below.
function cost(B) {
    var a = 0;
    var b = 0;
    for(var i = 1; i < B.length; i++) {
        var newA = a;
        var newB = b;
        newA = Math.max(a, b + B[i - 1] - 1);
        newB = Math.max( a + B[i] - 1, b + Math.abs(B[i] - B[i - 1]));
        a = newA;
        b = newB;
    }
    return Math.max(a, b);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const B = readLine().split(' ').map(BTemp => parseInt(BTemp, 10));

        let result = cost(B);

        ws.write(result + "\n");
    }

    ws.end();
}