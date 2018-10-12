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

// Complete the timeInWords function below.
function timeInWords(h, m) {
    var hourMap = new Map(
        [
            [ 1,"one"],
            [ 2, "two" ],
            [ 3, "three" ],
            [ 4, "four" ],
            [ 5, "five" ],
            [ 6, "six" ],
            [ 7, "seven" ],
            [ 8, "eighth" ],
            [ 9, "nine" ],
            [ 10, "ten" ],
            [ 11, "eleven" ],
            [ 12, "twelve" ]
        ]);
        var minutesMap = new Map(
        [
            [ 1, "one"],
            [ 2, "two" ],
            [ 3, "three" ],
            [ 4, "four" ],
            [ 5, "five" ],
            [ 6, "six" ],
            [ 7, "seven" ],
            [ 8, "eighth" ],
            [ 9, "nine" ],
            [ 10, "ten" ],
            [ 11, "eleven" ],
            [ 12, "twelve" ],
            [ 13, "thirteen" ],
            [ 14, "fourteen" ],
            [ 15, "fifteen" ],
            [ 16, "sixteen" ],
            [ 17, "seventeen" ],
            [ 18, "eighteen" ],
            [ 19, "nineteen" ],
            [ 20, "twenty" ],
            [ 21, "twenty one" ],
            [ 22, "twenty two" ],
            [ 23, "twenty three" ],
            [ 24, "twenty four" ],
            [ 25, "twenty five" ],
            [ 26, "twenty six" ],
            [ 27, "twenty seven" ],
            [ 28, "twenty eighth" ],
            [ 29, "twenty nine" ]
        ]);
        console.log(minutesMap.get(13));
        var timeinWord = "";
        var minute2 = Math.abs(m - 60);
        if (m <= 30)
        {
            switch (m)
            {
                case 1:
                    timeinWord += minutesMap.get(m)+" minute past " + hourMap.get(h);
                    break;
                case 0:
                    timeinWord += hourMap.get(h) + " o' clock";
                    break;
                case 15:
                    timeinWord += "quarter past " + hourMap.get(h);
                    break;
                case 30:
                    timeinWord += "half past " + hourMap.get(h);
                    break;
                default:
                    timeinWord += minutesMap.get(m)+ " minutes past " + hourMap.get(h);
                    break;
            }

        }
        else
        {
            switch (m)
            {
                case 59:
                    timeinWord += minutesMap.get(minute2)+" minute to "+ hourMap.get(h+1);
                    break;
                case 45:
                    timeinWord += "quarter to " + hourMap.get(h+1);
                    break;
                default:
                    timeinWord += minutesMap.get(minute2) + " minutes to " + hourMap.get(h+1);
                    break;
            }
        }
        return timeinWord;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const h = parseInt(readLine(), 10);

    const m = parseInt(readLine(), 10);

    let result = timeInWords(h, m);

    ws.write(result + "\n");

    ws.end();
}