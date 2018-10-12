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

// Complete the highestValuePalindrome function below.
function highestValuePalindrome(s, n, k) {
    let start = 0;
    let end = n-1;
    let limit = k;
    let stringArr = s.split("");
    while(start < end){
        if(stringArr[start] != stringArr[end]){
            stringArr[end] = stringArr[start] = Math.max(stringArr[start],stringArr[end] );
            limit--;
        }
        if(limit < 0)
            return -1;
        start++;
        end--;
    }
    
    if(limit == 0){
        return stringArr.join("");
    }else{
        console.log(limit)
        start = 0;
        end = n-1;
        while(start <= end){
            if(start == end && limit == 1){
                stringArr[start] = 9;
                limit--;
            }else if(limit >= 2 && stringArr[start] < 9 && stringArr[start] === s[start]){
                
                stringArr[start] = stringArr[end] = 9;
                console.log("asd")
                limit -= 2;
            }else if(limit >= 1 && stringArr[start] < 9 && stringArr[start] !== s[start]){
                stringArr[start] = stringArr[end] = 9;
                limit--;
            }
            start++;
            end--;
        }
        
        console.log(stringArr.join(""))
        return stringArr.join("");
    }
    
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const s = readLine();

    let result = highestValuePalindrome(s, n, k);

    ws.write(result + "\n");

    ws.end();
}