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

// Complete the designerPdfViewer function below.
function designerPdfViewer(h, word) {
    
   
    var tall = 0;
    for(var i = 0; i < word.length; i++){
        var ht = word.charCodeAt(i);
        ht = ht-97;
        if(h[ht] > tall){
            tall = h[ht];
        }
    }
    
    return  tall * word.length;
    
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const h = readLine().split(' ').map(hTemp => parseInt(hTemp, 10));

    var word = readLine();

    let result = designerPdfViewer(h, word);

    ws.write(result + "\n");

    ws.end();
}