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

// Complete the minimumNumber function below.
function minimumNumber(n, password) {
    const containsDigit = (password.match(/[0-9]/) || []).length > 0;
    const containsLower = (password.match(/[a-z]/) || []).length > 0;
    const containsUpper = (password.match(/[A-Z]/) || []).length > 0;
    const containsSpecial = (password.match(/[!@#$%^&*\(\)\-+]/) || []).length > 0;
    const needChars = (!containsDigit + !containsLower + !containsUpper + !containsSpecial);
    const need2 = Math.max(0, 6 - password.length);
    return Math.max(0, need2, needChars);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const password = readLine();

    let answer = minimumNumber(n, password);

    ws.write(answer + "\n");

    ws.end();
}