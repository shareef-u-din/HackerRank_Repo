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

// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {

   var rank=1;
        for(var i=alice.length-1,j=0;i>=0;i--){

        for(;j<scores.length;j++){

            if(j!=scores.length-1 && (alice[i]<scores[j]) && (scores[j]!=scores[j+1])){
                rank++;
            }
            else if(alice[i]>=scores[j]){
                 break;
             }
            else if(j==scores.length-1 && (alice[i]<scores[j])){
                  rank++;
            }

        }
        alice[i]=rank;


    }

        return alice;


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const scoresCount = parseInt(readLine(), 10);

    const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const aliceCount = parseInt(readLine(), 10);

    const alice = readLine().split(' ').map(aliceTemp => parseInt(aliceTemp, 10));

    let result = climbingLeaderboard(scores, alice);

    ws.write(result.join("\n") + "\n");

    ws.end();
}