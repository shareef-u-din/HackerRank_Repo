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

// Complete the nonDivisibleSubset function below.
function nonDivisibleSubset(K, S) {
        var f=[];
        let N=S.length;
        for (var i = 0; i < K; i++) {
            f[i]=0;
        }
        for (var i = 0; i < N; i++) {
            var d=S[i] % K;
            f[d]++; 
            
        }
       // if K is even, then update f[K/2] 
        if (K % 2 == 0) 
            f[K/2] = Math.min(f[K/2], 1); 
    
        var res = Math.min(f[0],1); 
    
        for (var i = 1; i <= K/2; i++) 
            res += Math.max(f[i], f[K-i]); 
      
        return res; 

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const S = readLine().split(' ').map(STemp => parseInt(STemp, 10));

    let result = nonDivisibleSubset(k, S);

    ws.write(result + "\n");

    ws.end();
}
