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

/*
 * Complete the equalStacks function below.
 */
function equalStacks(h1, h2, h3) {
      var sum1=0,sum2=0,sum3=0;
        for(var val of h1){
            sum1+=val;
        }
        for(var val of h2){
            sum2+=val;
        }
        for(var val of h3){
            sum3+=val;
        }
        let l1=0,l2=0,l3=0;
        while(sum1 != sum2 || sum1!=sum3 || sum2 != sum3){
            if(l1==h1.length || l2==h2.length || l3==h3.length){
                return 0;
            }
            if(sum1==0 || sum2==0 || sum3==0) {
                return 0;
            }
            if(sum1 >= sum2 && sum1 >= sum3 ) {
                sum1=sum1-h1[l1++];
            }else if(sum2 >= sum1 && sum2 >= sum3) {
                sum2=sum2-h2[l2++];
            }
            else if(sum3 >= sum2 && sum3 >= sum1) {
                sum3=sum3-h3[l3++];
            }
        }
        return sum1;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n1N2N3 = readLine().split(' ');

    const n1 = parseInt(n1N2N3[0], 10);

    const n2 = parseInt(n1N2N3[1], 10);

    const n3 = parseInt(n1N2N3[2], 10);

    const h1 = readLine().split(' ').map(h1Temp => parseInt(h1Temp, 10));

    const h2 = readLine().split(' ').map(h2Temp => parseInt(h2Temp, 10));

    const h3 = readLine().split(' ').map(h3Temp => parseInt(h3Temp, 10));

    let result = equalStacks(h1, h2, h3);

    ws.write(result + "\n");

    ws.end();
}
