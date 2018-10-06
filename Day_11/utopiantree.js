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

// Complete the utopianTree function below.
function utopianTree(n) {

    
    if( n == 0 ) {
        return 1;
    } else if(n == 1) {
        return 2;
    }else {
        var x=0;
        var ht = 0;
        while( x != n+1 ) {
          if(x % 2 == 0) {
                ht = ht + 1;
            } else {
                ht = ht * 2;
            }
            x++;
        }
        return ht;
    }
    
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        let result = utopianTree(n);

        ws.write(result + "\n");
    }

    ws.end();
}