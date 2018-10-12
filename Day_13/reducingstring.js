'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the superReducedString function below.
function superReducedString(s) {
    var input=[];
    var result="";
    for(let i=0;i<s.length;i++) {
        input.push(s.charAt(i));
    }
    for(let i=0;i<input.length;i++) {
        if(input[i]==input[i+1]) {
            input.splice(i,2);
            i=-1;
        }
    }
    if(input.length===0) {
        result = "Empty String";
    } else {
        result = input.join('');
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = superReducedString(s);

    ws.write(result + '\n');

    ws.end();
}