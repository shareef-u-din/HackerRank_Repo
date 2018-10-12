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

// Complete the closestNumbers function below.
function closestNumbers(arr) {

   arr.sort(function(a,b){return a-b;});
    var diffarray = [];
    for(var i = 0; i < arr.length-1; i++) {
        diffarray.push(arr[i+1]-arr[i]);
    }
    var mindiff = Math.min.apply(null,diffarray);
    var result = [];
    //console.log(arr);
    for(var i=0; i<diffarray.length; i++) {
        if(diffarray[i] == mindiff) {
            
            result.push(arr[i]);
            result.push(arr[i+1]);
    
        }
    }
    
return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = closestNumbers(arr);

    ws.write(result.join(" ") + "\n");

    ws.end();
}