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

function reverse(n)
{
    n = n + "";
    return n.split("").reverse().join("");
}
// Complete the beautifulDays function below.
function beautifulDays(i, j, k) {

    var counter = 0;
    for(var index = i; index <= j; index++ ) {
        var a = Math.abs(index - reverse(index)) ;
        if(a % k == 0){
            counter++;
        }
    }
    return counter;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const ijk = readLine().split(' ');

    const i = parseInt(ijk[0], 10);

    const j = parseInt(ijk[1], 10);

    const k = parseInt(ijk[2], 10);

    let result = beautifulDays(i, j, k);

    ws.write(result + "\n");

    ws.end();
}