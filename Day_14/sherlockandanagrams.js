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



// Complete the sherlockAndAnagrams function below.
function sherlockAndAnagrams(s) {
    let count = 0;
    var m = {};
    for (let i = 0; i < s.length; i++) {
        for (let j = i+1; j <= s.length; j++) {
            var str = s.substring(i,j).split('').sort().join('');
            if (str in m) {
                m[str].push(i)
            } else {
               m[str] = [i] 
            }
        }
    }
    
    for (let i in m) {
        let item = m[i].length;
        if (item > 1) {
            count += fact(item) / (fact(2) * fact(item-2));
        }
    }
    
    return count;
}
function fact(x){
    var f = 1;
    for (let j=1; j<=x; j++) {
        f *= j;
    }
    
    return f;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        let result = sherlockAndAnagrams(s);

        ws.write(result + "\n");
    }

    ws.end();
}