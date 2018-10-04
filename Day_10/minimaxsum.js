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

// Complete the miniMaxSum function below.
function miniMaxSum(arr) {
    let min=Number.MAX_VALUE,max=Number.MIN_VALUE;
    for(var i=0;i<5;i++) {
        var sum=0;
        for(var j=0;j<5;j++) {
            if(j==i)continue;
            sum=sum+arr[j];
        }
        if(sum > max) max=sum;
        if(sum < min) min=sum;
    }
    console.log(min+" "+max);
}

function main() {
    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    miniMaxSum(arr);
}
