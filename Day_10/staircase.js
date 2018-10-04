'use strict';

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

// Complete the staircase function below.
function staircase(n) {
    for(var i=0;i<n;i++) {
        var str="";
        for(var space=0;space < n-1-i;space++){
            str=str+" ";
        }
        while(space < n) {
            str=str+"#";
            space++;
        }
        console.log(str);
    }

}

function main() {
    const n = parseInt(readLine(), 10);

    staircase(n);
}
