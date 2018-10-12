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

function isUpper(aChar)
   {
      var myCharCode = aChar.charCodeAt(0);
   
      if((myCharCode > 64) && (myCharCode <  91))
      {
         return true;
      }
   
   return false;
   }

// Complete the camelcase function below.
function camelcase(s) {
    var input=[];
    var count =0;
    for(let i=0;i<s.length;i++) {
        input.push(s.charAt(i));
    }
    for(let i=0;i<input.length;i++) {
        if(isUpper(input[i]))
            count++;
    }
    return count+1;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = camelcase(s);

    ws.write(result + "\n");

    ws.end();
}