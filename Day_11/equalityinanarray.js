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

// Complete the equalizeArray function below.
function equalizeArray(arr) {
arr.sort(function(a,b){return a-b;})
    var maxCount = 1;
    var maxOccurrence = Number.MIN_VALUE;
    for(var i = 0 ;i <arr.length-1;i++) {
        if(arr[i] == arr[i + 1]) {
            maxCount++;
            if(maxOccurrence < maxCount) {
                maxOccurrence = maxCount;
            }
        }
        else {
            if(maxOccurrence < maxCount) {
                maxOccurrence = maxCount;
            }
            maxCount = 1;
        }
    }
    return arr.length - maxOccurrence;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = equalizeArray(arr);

    ws.write(result + "\n");

    ws.end();
}