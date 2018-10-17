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

// Complete the missingNumbers function below.
function missingNumbers(dup, org) {
    var res = [];
    var duplicateMap = new Map();
    var originalMap = new Map();

    for (let i = 0; i < dup.length; i++) {
        if (!duplicateMap.has(dup[i]))
            duplicateMap.set(dup[i], 1);
        else
            duplicateMap.set(dup[i], duplicateMap.get(dup[i]) + 1);
    }

    for (let i = 0; i < org.length; i++) {
        if (!originalMap.has(org[i]))
            originalMap.set(org[i], 1);
        else
            originalMap.set(org[i], originalMap.get(org[i]) + 1);
    }

    originalMap.forEach((value, key) => {
        //if duplicateMap has originalMap key
        if (duplicateMap.has(key)) {
            let diff = Math.abs(duplicateMap.get(key) - originalMap.get(key));
            //if diff is non zero then push
            if (diff) {
                res.push(key);
            }
        } else {
            res.push(key);
        }
    });
    return res.sort((a, b) => { return a - b });

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const m = parseInt(readLine(), 10);

    const brr = readLine().split(' ').map(brrTemp => parseInt(brrTemp, 10));

    const result = missingNumbers(arr, brr);

    ws.write(result.join(' ') + '\n');

    ws.end();
}