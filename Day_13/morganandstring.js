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

// Complete the morganAndString function below.
function morganAndString(a, b) {
var ans='';
    a += 'z',b += 'z';
    for (;;) {
        if (a<b) {
            var charA=a.charAt(0);
            ans += charA;
            a=a.slice(1);
        }
        else {
            var charB=b.charAt(0);
            ans += charB;
            b=b.slice(1);
        }
        if (a=='z') {
            b=b.slice(0,-1)
            ans += b;
            break;
        }
        if (b=='z') {
            a=a.slice(0,-1)
            ans += a;
            break;
        }
     
    }
    return ans;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const a = readLine();

        const b = readLine();

        let result = morganAndString(a, b);

        ws.write(result + "\n");
    }

    ws.end();
}
