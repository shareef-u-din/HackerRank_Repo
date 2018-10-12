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

// Complete the minimumLoss function below.
function minimumLoss(price) {
    
    /*Record the original year for each price. The prices will be sorted and erase the
      association, and we'll need to only compute diffs from earlier year to later year.
     */
    let yearsForPrices = [];
    for (let i = 0; i < price.length; i++) {
        yearsForPrices[price[i]] = i;
    }
    price.sort((a, b)=>{return a-b});
    let minPosDiff = Number.MAX_VALUE;
    for (let i = 0; i < price.length - 1; i++) {
        if (yearsForPrices[price[i + 1]] < yearsForPrices[price[i]]) {
            let diff = price[i + 1] - price[i];
            if (diff > 0) {
                minPosDiff = Math.min(minPosDiff, diff);
            }
        }
    }
    return minPosDiff;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const price = readLine().split(' ').map(priceTemp => parseInt(priceTemp, 10));

    let result = minimumLoss(price);

    ws.write(result + "\n");

    ws.end();
}