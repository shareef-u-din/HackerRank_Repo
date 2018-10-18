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
 * Complete the sillyGame function below.
 */
function numberOfPrimes(n) {
    n = n + 1
    var upperLimit = Math.sqrt(n), output = [], A = new Array(n).fill(true)

    for (let i = 2; i < upperLimit; i++) {
        if (A[i]) {
            for (let j = i * i; j < n; j = j + i) {
                A[j] = false
            }
        }
    }

    return A.filter(x => x == true).length - 2;
}

function sillyGame(n) {
    if (n < 2) {
        return 'Bob'
    } else {
        let x = numberOfPrimes(n)
        return x % 2 == 0 ? 'Bob' : 'Alice'
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const g = parseInt(readLine(), 10);

    for (let gItr = 0; gItr < g; gItr++) {
        const n = parseInt(readLine(), 10);

        let result = sillyGame(n);

        ws.write(result + "\n");
    }

    ws.end();
}