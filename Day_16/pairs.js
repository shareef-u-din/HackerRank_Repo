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

// Complete the pairs function below.
function pairs(k, arr) {
    arr.sort((a, b) => { return a - b });
    let i = 0, j = 1;
    let count = 0;
    let size = arr.length;
    // Search for a pair 
    while (i < size && j < size) {
        if (i != j && arr[j] - arr[i] == k) {
            count++;
            j++;
        }
        else if (arr[j] - arr[i] < k) {
            j++;
        }
        else {
            i++;
        }
    }
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = pairs(k, arr);

    ws.write(result + "\n");

    ws.end();
}