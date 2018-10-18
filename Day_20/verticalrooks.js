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
 * Complete the verticalRooks function below.
 */
function verticalRooks(r1, r2) {
    /*
     * Write your code here.
     */
    let moves = 0;
    for (let i = 0; i < r1.length; i++) {
        const diff = Math.abs(r1[i] - r2[i]) - 1;
        moves ^= diff;
    }
    if (moves == 0) {
        return 'player-1';
    }
    return 'player-2';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        let r1 = [];

        for (let r1Itr = 0; r1Itr < n; r1Itr++) {
            const r1Item = parseInt(readLine(), 10);
            r1.push(r1Item);
        }

        let r2 = [];

        for (let r2Itr = 0; r2Itr < n; r2Itr++) {
            const r2Item = parseInt(readLine(), 10);
            r2.push(r2Item);
        }

        let result = verticalRooks(r1, r2);

        ws.write(result + "\n");
    }

    ws.end();
}