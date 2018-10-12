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

// Complete the cutTheSticks function below.
function cutTheSticks(arr) {
 var res = [];
    var start = 0;
    arr.sort(function(a,b){ return a-b;});
    for(var i=0;i<arr.length;i++) {
        if(arr[i] != 0) {
            for(var j= i+1;j<arr.length;j++) {
                arr[j] = arr[j] - arr[i];
                start++;
            }
            res.push(start + 1);
            start = 0;
        }
    }
    return res;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = cutTheSticks(arr);

    ws.write(result.join("\n") + "\n");

    ws.end();
}