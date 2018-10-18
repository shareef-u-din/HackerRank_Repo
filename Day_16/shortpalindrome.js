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

var power = Math.pow(10, 9) + 7;
// Complete the shortPalindrome function below.
function shortPalindrome(s) {

    var arr1 = new Array(26).fill(0);
    var arr2 = new Array(26);
    for (var i = 0; i < arr2.length; i++) {
        arr2[i] = new Array(26).fill(0);
    }
    var arr3 = new Array(26).fill(0);
    var result = 0;

    for (var i = 0; i < s.length; i++) {

        var idx = s.charCodeAt(i) - "a".charCodeAt(0);

        //console.log(idx);
        result += arr3[idx];
        result = result % power;
        for (var j = 0; j < 26; j++) {
            arr3[j] += arr2[j][idx];
            arr3[j] = arr3[j] % power;
        }

        for (var j = 0; j < 26; j++) {
            arr2[j][idx] += arr1[j];
            arr2[j][idx] = arr2[j][idx] % power;
        }

        arr1[idx]++;
        arr1[idx] = arr1[idx] % power;
    }


    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = shortPalindrome(s);

    ws.write(result + "\n");

    ws.end();
}