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

// Complete the caesarCipher function below.
function caesarCipher(s, k) {

    
    var str = "";
    for(var i = 0; i < s.length; i++) {
       
        if(s[i] >= 'a' && s[i] <= 'z') {
            
           var c = ((s.charCodeAt(i)+k - 97)%26)+97;
           
            var char = String.fromCharCode(c);
           str = str+char;
           }
        
           else if(s[i] >= 'A' && s[i] <= 'Z') {
           
           var c = ((s.charCodeAt(i)+k - 65)%26)+65;
           
            var char = String.fromCharCode(c);
           str = str+char;
           }
        else {
            str = str + s[i];
        }
        }
    
 return str;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    const k = parseInt(readLine(), 10);

    let result = caesarCipher(s, k);

    ws.write(result + "\n");

    ws.end();
}