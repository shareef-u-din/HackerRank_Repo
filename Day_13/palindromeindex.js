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

// Complete the palindromeIndex function below.
function palindromeIndex(s) {

var len = s.length;
    for( var i=0; i<len; i++ ){
        if( s[i] != s[len-1-i] ){
            var subStr1 = s.substring(0,i) + s.substring(i+1) ;
            if( subStr1.split("").reverse().join("") == subStr1 ){
               return i;
            } else {
                var subStr2 = s.substring(0,len-1-i) + s.substring(len-1-i+1) ;
                if( subStr2.split("").reverse().join("") == subStr2 ){
                    return len-1-i;
                }    
            }
        }
    }
    return -1;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        let result = palindromeIndex(s);

        ws.write(result + "\n");
    }

    ws.end();
}