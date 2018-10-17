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

// Complete the equal function below.
function equal(arr) {
    var min=Infinity, steps = Infinity;
    
    for(var i=0; i<arr.length; i++) {
        if(min > arr[i])
            min = arr[i];
    }
    
    for(var base=0; base<3; base++) {
        var currentSteps = 0;
            
        for(var i=0; i<arr.length; i++) {
            var delta = arr[i] - min + base;
            currentSteps += Math.floor(delta/5);
            delta = delta % 5;
            
            currentSteps += Math.floor(delta/2);
            currentSteps += delta % 2;
        }
            
        steps = Math.min(steps, currentSteps);
    }
    
    return steps;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

        let result = equal(arr);

        ws.write(result + "\n");
    }

    ws.end();
}