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

// Complete the maximumSum function below.
function maximumSum(a, m) {
    var hs = new Set();
    for (var i = 0; i < a.length; i++) {
        hs.add(a[i]);
    }
    var ar = Array.from(hs);
    var max = Number.MIN_VALUE;
    for (var b in ar) {
        var rem = ar[b] % m;
        if (max < rem) {
            max = rem;
        }
    }
    for (var k = 0; k < a.length - 1; k++) {
        var sum = a[k];
        for (var l = k + 1; l < a.length; l++) {
            sum += a[l];
            var rem = sum % m;
            if (max < rem) {
                max = rem;
            }
        }
    }
    return max;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const nm = readLine().split(' ');

        const n = parseInt(nm[0], 10);

        const m = parseInt(nm[1], 10);

        const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

        let result = maximumSum(a, m);

        ws.write(result + "\n");
    }

    ws.end();
}