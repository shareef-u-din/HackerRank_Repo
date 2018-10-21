'use strict';

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
 * Complete the whatsNext function below.
 */
function whatsNext(arr) {
    var BigNumber = require('bignumber.js');
    arr = arr.map(v => new BigNumber(v));
    var len = arr.length;
    if (len % 2 == 0) {
        var zero = arr.pop(),
            ones = arr.pop() || new BigNumber(0),
            zero2 = arr.pop() || new BigNumber(0);
        arr.push(zero2.minus(1), new BigNumber(1), zero.plus(1), ones.minus(1));
    } else {
        var ones = arr.pop(),
            zero = arr.pop() || new BigNumber(0);
        arr.push(zero.minus(1), new BigNumber(1), new BigNumber(1), ones.minus(1));
    }
    if (arr[0] < 1) arr.shift();
    if (arr[arr.length - 1] < 1) arr.pop();
    
    for (var i = 1; i < arr.length; )
        if (arr[i].toString() == "0")
            arr.splice(i - 1, 3, arr[i - 1].plus(arr[i + 1]));
        else
            i++;

    console.log(arr.length);
    console.log(arr.map(n => n.toString()).join` `);
}

function main() {
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const arrCount = parseInt(readLine(), 10);

        const arr = readLine().split(' ').map(arrTemp => arrTemp);

        whatsNext(arr);
    }
}