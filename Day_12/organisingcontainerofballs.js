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

// Complete the organizingContainers function below.
function organizingContainers(container) {
    var ballCount = [];
    var containerCapacity = [];
    for(var i = 0;i<container.length;i++) {
        var sum = 0;
        for(var j=0;j<container.length;j++) {
            sum += container[j][i];
        }
        ballCount.push(sum);
    }
    for(var i = 0;i<container.length;i++) {
        var sum = 0;
        for(var j=0;j<container.length;j++) {
            sum += container[i][j];
        }
        containerCapacity.push(sum);
    }
    ballCount.sort(function(a,b){return a-b;});
    containerCapacity.sort(function(a,b){return a-b;});
    console.log(ballCount);
    console.log(containerCapacity);
    for(var i = 0;i < ballCount.length; i++) {
        if(ballCount[i] != containerCapacity[i]) {
            return "Impossible";
        }
    }
    return "Possible";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine(), 10);

        let container = Array(n);

        for (let i = 0; i < n; i++) {
            container[i] = readLine().split(' ').map(containerTemp => parseInt(containerTemp, 10));
        }

        let result = organizingContainers(container);

        ws.write(result + "\n");
    }

    ws.end();
}