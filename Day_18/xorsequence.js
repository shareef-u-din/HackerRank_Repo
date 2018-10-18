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

// Complete the xorSequence function below.
function xorSequence(l, r) {
    var diff = r - l;
    var result = 0;
    var start = l - diff % 2; // where to start
    
    result = xor(xorTil2(r), xorTil2(start));
    if (diff % 2 === 0) result = xor(result, xorTil(l));
    
    return result;

}

function xorTil(a) {
    switch (a % 4) {
        case 3: return 0;xor
        case 2: return a + 1;
        case 1: return xor(a, a - 1);
        case 0: return a;
    }
}

function xorTil2(a) {
    switch (a % 8) {
        case 7: case 6: return 0;
        case 5: case 4: return a + 2;
        case 3: case 2: return xor(a, a - 2);
        case 1: case 0: return a;
    }
}

function dtb(a) {
    var arr = new Array(64);
    var index = 0;
    if (a === 0) {
        arr[0] = 0;
        return arr;
    }
    while (a > 1) {
        arr[index++] = a % 2;
        a = Math.floor(a / 2);
    }
    arr[index] = 1;
    return arr;
}

function btd(a) {
    var index = 0;
    var result = 0;
    while (a[index] !== undefined) {
        result += Math.pow(2, index) * a[index];
        index++;
    }
    return result;
}

function xor(a, b) {
    var arr = new Array(64);
    a = dtb(a);
    b = dtb(b);
    for (var i = 0; i < 64; i++) {
        if (a[i] === undefined && b[i] === undefined) break;
        else if (b[i] === undefined) arr[i] = a[i];
        else if (a[i] === undefined) arr[i] = b[i];
        else arr[i] = a[i] ^ b[i];
    }
    return btd(arr);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const lr = readLine().split(' ');

        const l = parseInt(lr[0], 10);

        const r = parseInt(lr[1], 10);

        let result = xorSequence(l, r);

        ws.write(result + "\n");
    }

    ws.end();
}