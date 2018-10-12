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

// Complete the insertionSort function below.
function insertionSort(arr) {
    
    let count = 0;
    
    const countInversions = arr => {
        
        if (arr.length <= 1) 
            return arr;
        const leftArr = countInversions(arr.slice(0, arr.length / 2)),
              rightArr = countInversions(arr.slice(arr.length / 2));

        let i = 0, j = 0, k = 0, ret = [];

        while ((i <= leftArr.length -1) && (j <= rightArr.length - 1)) {
            
            if (leftArr[i] <= rightArr[j]) {
                
                ret[k++] = leftArr[i++];
                
            } else {
                
                ret[k++] = rightArr[j++];
                
                count += (leftArr.length - i);
            }
        }

        while(i < leftArr.length) { 
            ret[k++] = leftArr[i++];
        }
        while(j < rightArr.length) {
            ret[k++] = rightArr[j++];
        }

        return ret;
    };
    
    countInversions(arr);
    
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

        let result = insertionSort(arr);

        ws.write(result + "\n");
    }

    ws.end();
}