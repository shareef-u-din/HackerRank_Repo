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

// Complete the pickingNumbers function below.
function pickingNumbers(a,n) {
    a.sort();
    var k=0;
    var maximum=0;
    for(var i=0;i<a.length-1;i++) {
        var count=1;
        for(var j=i+1;j<a.length;j++) {
           var diff = Math.abs(a[j]-a[i]);
            if(diff<=1) {
                count++;
            }
            else
                break;
        }
        if(maximum<count)
            maximum=count;
        
    }
return maximum;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    let result = pickingNumbers(a,n);

    ws.write(result + "\n");

    ws.end();
}