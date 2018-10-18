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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function bobAndBen(trees) {

    // Don't play unless you see at least a tree!
    if (trees.length < 1) return "BEN"

    // Don't play unless it's a starting to look like a forest!
    if (trees.length === 1) return "BOB"

    // Let the fun begin
    let GN = [];
    let p = 0;

    trees.forEach(tree => {

        if(tree[0]%2 == 1)
            p = p^1;
        else if(tree[0] > 2)
            p = p^2;

    });

    return p != 0 ? 'BOB' : 'BEN'
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const g = parseInt(readLine(), 10);

    for (let gItr = 0; gItr < g; gItr++) {
        const n = parseInt(readLine(), 10);

        let trees = Array(n);

        for (let treesRowItr = 0; treesRowItr < n; treesRowItr++) {
            trees[treesRowItr] = readLine().split(' ').map(treesTemp => parseInt(treesTemp, 10));
        }

        let result = bobAndBen(trees);

        ws.write(result + "\n");
    }

    ws.end();
}