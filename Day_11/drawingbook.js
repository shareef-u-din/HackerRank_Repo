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
 * Complete the pageCount function below.
 */
function pageCount(n, p) {
    /*
     * Write your code here.
     */
    var minimum;
    if(n%2==0) {
        var currentpage=1;
        
        var count=0;
        while(currentpage<p) {
            count++;
            currentpage+=2;
        }
        minimum=count;
        count=0;
        currentpage=n;
        while(currentpage>p) {
            count++;
            currentpage-=2;
        }
        if(minimum>count) {
            minimum=count;
        }
        
    }
    else {
         var currentpage=1;
        
        var count=0;
        while(currentpage<p) {
            count++;
            currentpage+=2;
        }
        minimum=count;
        count=0;
        currentpage=n-1;
        while(currentpage>p) {
            count++;
            currentpage-=2;
        }
        if(minimum>count) {
            minimum=count;
        }
       
        
    }
return minimum;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const p = parseInt(readLine(), 10);

    let result = pageCount(n, p);

    ws.write(result + "\n");

    ws.end();
}