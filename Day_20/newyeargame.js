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



function main() {
    const T = parseInt(readLine(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const n = parseInt(readLine(), 10);

        const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

        // Write Your Code Here
        const modThreeArray = a.map(v => v % 3);
        const ones = modThreeArray.filter(v => v == 1).length;        
        const twos = modThreeArray.filter(v => v == 2).length;
        // if there are an odd number of 1s or 2s, then Balsa wins
        if ((ones % 2 == 1) || (twos % 2 == 1)) {
            console.log('Balsa');
        } else {
            console.log('Koca');
        }
        
    }
}