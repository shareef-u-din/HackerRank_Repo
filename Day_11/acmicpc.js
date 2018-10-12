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

// Complete the acmTeam function below.
function acmTeam(topic) {
    var count = 1;
    var subCount = Number.MIN_VALUE;
    for(var i=0; i < topic.length-1; i++){
        for(var j = i+1; j < topic.length; j++){
            var tempSubCount = 0;
            for(var k = 0; k < topic[i].length; k++){
                if(topic[i].charAt(k)=='1' || topic[j].charAt(k)=='1') {
                    tempSubCount++;
                }
            if (tempSubCount > subCount){
                subCount = tempSubCount;
                count = 1;
            }
            else if (tempSubCount == subCount)
                count++;
            }
        }
    }
    var res = [subCount, count];
    return res;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    let topic = [];

    for (let i = 0; i < n; i++) {
        const topicItem = readLine();
        topic.push(topicItem);
    }

    let result = acmTeam(topic);

    ws.write(result.join("\n") + "\n");

    ws.end();
}