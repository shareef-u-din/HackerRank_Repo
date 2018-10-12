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

// Complete the weightedUniformStrings function below.
function weightedUniformStrings(s, queries) {

        let weights = new Set();
        let prev = s.charAt(0);
        let sum = 0;
        s=s.toLowerCase();
        for(let i = 0; i < s.length; i++){
                if(s.charAt(i) != prev){
                    prev = s.charAt(i);
                    sum = 0;
                }
                sum += s.charAt(i).charCodeAt()-97+1;
                weights.add(sum);
        }
        
        let ra=[];
        
        for(let a0 = 0; a0 < queries.length; a0++){
            let x = queries[a0];
            if(weights.has(x)) {
                ra.push("Yes");
            } else {
                ra.push("No");
            }
            
        }
    return ra;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const queriesCount = parseInt(readLine(), 10);

    let queries = [];

    for (let i = 0; i < queriesCount; i++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    let result = weightedUniformStrings(s, queries);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
