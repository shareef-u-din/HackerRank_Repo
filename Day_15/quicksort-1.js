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

// Complete the quickSort function below.
function quickSort(arr) {

    var left = [];
    var right = [];
    var pivot = arr[0];
    
    for(var i = 1; i < arr.length; i++) {
        if(arr[i] < pivot) {
           left.push(arr[i]);
           }
        else {
            right.push(arr[i]);
        } 
    }
    var result = left.concat([pivot]);
    var array = result.concat(right);
 return array;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = quickSort(arr);

    ws.write(result.join(" ") + "\n");

    ws.end();
}