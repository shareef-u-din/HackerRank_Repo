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

// Complete the beautifulBinaryString function below.
function beautifulBinaryString(b) {
    // Complete this function
    var i, count = 0;
    
    for (i = 0; i < b.length - 2; ) {
        if (b.substr(i, 3) === "010") {
            count++;
            i = i + 3;
        } else i++;
    }
    
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const b = readLine();

    let result = beautifulBinaryString(b,n);

    ws.write(result + "\n");

    ws.end();
}