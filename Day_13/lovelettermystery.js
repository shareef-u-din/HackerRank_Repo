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

// Complete the theLoveLetterMystery function below.
function theLoveLetterMystery(s) {
    var j=s.length-1;
    var operation=0;
    for(var i=0;i<s.length/2;i++) {
        while(s[i]!=s[j]) {
            if(s[i]>s[j]) {
                var str=
                s.substring(0, i) + String.fromCharCode(s.charCodeAt(i)- 1) + s.substring(i + 1);
                s=str;
                operation++;
                
            }
            else {
                var str=
                s.substring(0, j) + String.fromCharCode(s.charCodeAt(j)- 1) + s.substring(j + 1);
                s=str;
                operation++;
                
            }
                

        }
         j--;   
    }
 return operation;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        var s = readLine();

        let result = theLoveLetterMystery(s);

        ws.write(result + "\n");
    }

    ws.end();
}