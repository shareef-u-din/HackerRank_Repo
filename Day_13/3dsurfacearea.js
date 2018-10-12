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

// Complete the surfaceArea function below.
function surfaceArea(A) {
    var tvolume=0;     
    for(var i=0;i<A.length;i++){
        for(var j=0;j<A[0].length;j++){
            tvolume += (A[i][j]*4)+2; 
            if(j>=1)tvolume -= Math.min(A[i][j-1],A[i][j])*2;
            if(i>=1)tvolume -= Math.min(A[i-1][j],A[i][j])*2;
        }
    }
    return tvolume;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const HW = readLine().split(' ');

    const H = parseInt(HW[0], 10);

    const W = parseInt(HW[1], 10);

    let A = Array(H);

    for (let i = 0; i < H; i++) {
        A[i] = readLine().split(' ').map(ATemp => parseInt(ATemp, 10));
    }

    let result = surfaceArea(A,H,W);

    ws.write(result + "\n");

    ws.end();
}