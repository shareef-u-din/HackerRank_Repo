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

// Complete the countArray function below.
function countArray(n, k, x) {
    let end1 = k-1;
    let end2 = k-2;
    
    for(let i = 3; i < n; ++i)
    {
        let nend1= end2 *(k-1);
        let nend2 = end2 * (k-2) + end1;
        end1 = nend1 % 1000000007;
        end2 = nend2 % 1000000007;
    }
    if(x == 1)
        {
            return end1;
        }
    return end2;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nkx = readLine().split(' ');

    const n = parseInt(nkx[0], 10);

    const k = parseInt(nkx[1], 10);

    const x = parseInt(nkx[2], 10);

    let answer = countArray(n, k, x);

    ws.write(answer + "\n");

    ws.end();
}