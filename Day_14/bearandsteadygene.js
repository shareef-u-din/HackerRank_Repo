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

// Complete the steadyGene function below.
function steadyGene(gene) {
    
        var n =gene.length;
        var map = new Map();

        map.set('A', 0);
        map.set('C', 0);
        map.set('G', 0);
        map.set('T', 0);
        var chars = [...gene];
        for (var c of chars) {
            map.set(c, map.get(c) + 1);
        }

        var left = 0, right = 0, min = Number.MAX_VALUE;
        while(right < n - 1){
            var rc = chars[right++];
            map.set(rc, map.get(rc) - 1);
            while(isSteady(map,n)){
                min = Math.min(min, right - left);
                var lc = chars[left++];
                map.set(lc, map.get(lc) + 1);
            }
        }
        return min;
    }

function isSteady(map, n) {
        for (var i of map.values())
            if (i > n / 4) return false;
        return true;
    }

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const gene = readLine();

    let result = steadyGene(gene);

    ws.write(result + "\n");

    ws.end();
}