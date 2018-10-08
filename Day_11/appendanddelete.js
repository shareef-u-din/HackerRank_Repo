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

// Complete the appendAndDelete function below.
function appendAndDelete(s, t, k) {
      var result ="";
        
      if (k >= (s.length + t.length)) {
          result="Yes";
      } 
      else {
      var flag = -1;
      var i = 0;

     
          while (i < s.length && i < t.length) {
            if (s.charAt(i) != t.charAt(i)) {
              flag = i;
              break;
            }
            i++;
          }
          if (flag == -1) {
            flag = Math.min(s.length, t.length);
          }

          var numDeletions = (s.length - flag);
          var numAdditions = (t.length - flag);

          k = k - numDeletions;

       
          if (k >= numAdditions && ((k % 2) == (numAdditions % 2))) {
             result="Yes";
          }
          else {
             result="No";
          }
    }

return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const t = readLine();

    const k = parseInt(readLine(), 10);

    let result = appendAndDelete(s, t, k);

    ws.write(result + "\n");

    ws.end();
}
