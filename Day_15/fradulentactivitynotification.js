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

function findMedian(arr, d) {
    if(d % 2 == 1) {
        const medIdx = Math.floor(d/2);
        let start = -1;
        let curIdx = 0;
        while(curIdx <= medIdx) {
            start += 1;
            curIdx += arr[start];
            
        }
        return start;
    } else {
        const medIdx2 = Math.floor(d/2);
        const medIdx1 = Math.floor(d/2) - 1;
        let start = -1;
        let curIdx = 0;
        while(curIdx <= medIdx1) {
            start += 1;
            curIdx += arr[start];
        }
        const index1 = start;
        while(curIdx <= medIdx2) {
            start += 1;
            curIdx += arr[start];
        }
        const index2 = start;
        return (index1 + index2) / 2
    }
}

function activityNotifications(expenditure, d) {
    let n = expenditure.length;
    let notifications = 0;
    if(d >= n) {
        return 0;
    }
    let memory = new Array(201);
    memory.fill(0);
    
    for(let i = 0; i < d; i++) {
        memory[expenditure[i]] += 1;
    }
    
    for (let i = d; i < expenditure.length; i++ ) {
        const median = findMedian(memory, d);
        if(expenditure[i] >= 2 * median ) {
            notifications += 1;
        }
        memory[expenditure[i-d]] -= 1;
        memory[expenditure[i]] += 1;
    }
    return notifications;   
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nd = readLine().split(' ');

    const n = parseInt(nd[0], 10);

    const d = parseInt(nd[1], 10);

    const expenditure = readLine().split(' ').map(expenditureTemp => parseInt(expenditureTemp, 10));

    let result = activityNotifications(expenditure, d);

    ws.write(result + "\n");

    ws.end();
}