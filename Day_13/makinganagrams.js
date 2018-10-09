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

// Complete the makingAnagrams function below.
function makingAnagrams(s1, s2) {
    var flagfors1=new  Array(s1.length);
    for(var i=0;i<s1.length;i++) {
        flagfors1[i]=0;
    }
    var flagfors2=new  Array(s2.length);
    for(var i=0;i<s2.length;i++) {
        flagfors2[i]=0;
    }
    var common=0;
    for(var i=0;i<s1.length;i++) {
        for(var j=0;j<s2.length;j++) {
            if((s1[i]==s2[j])&&(flagfors2[j]==0)&&(flagfors1[i]==0)) {
                flagfors2[j]=1;
                flagfors1[i]=1;
                common++;
            }
                
        }
    }
    var deletions=(s1.length-common)+(s2.length-common);
   return deletions;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s1 = readLine();

    const s2 = readLine();

    let result = makingAnagrams(s1, s2);

    ws.write(result + "\n");

    ws.end();
}