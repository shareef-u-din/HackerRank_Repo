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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the twoTwo function below.
 */
function twoTwo(a) {
    let i,j,t='1',r=0,n=801;
    for(i=1;i<=n && t.length <= a.length;i++) {
        j=a.indexOf(t);
        while(j>-1) {
            r++;
            j = a.indexOf(t,j+1);
        }
        t=next2(t);
    }
    return r;

    function next2(a) {
        let v='',i,n=a.length,s,c=0;
        for(i=n-1;i>=0;i--) {
            s = (a.charAt(i)-0)*2+c;
            v = (s%10) + v;
            c = Math.floor(s/10);
        }
        if (c>0) v=c+v;
        return v;
    }    
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const a = readLine();

        let result = twoTwo(a);

        ws.write(result + "\n");
    }

    ws.end();
}