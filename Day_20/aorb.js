'use strict';

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
 * Complete the aOrB function below.
 */
function aOrB(k, a, b, c) {
    const len = a.length;
    a = Buffer(a),
    b = Buffer(b),
    c = Buffer(c)
    for (let i = 0; i < len && k > -1; i++) {
        a[i] -= a[i] > 57 ? 55 : 48,
        b[i] -= b[i] > 57 ? 55 : 48,
        c[i] -= c[i] > 57 ? 55 : 48;
        for (let j = 16; j ; j >>= 1) {
            if (c[i] & j) {
                if (!((a[i] | b[i]) & j)) {
                    b[i] |= j
                    k--
                }
            } else {
                if (a[i] & j) {
                    a[i] ^= j
                    k--
                }
                if (b[i] & j) {
                    b[i] ^= j
                    k--
                }
            }
        }
    }
    let i = 0,
        j = 16;
    while (k && i < len) {
        if (c[i] & j) {
            if (a[i] & j) {
                if (b[i] & j) {
                    a[i] ^= j
                    k--
                } else if (k > 1) {
                    a[i] ^= j
                    k--
                    b[i] ^= j
                    k--
                }
            }
        }
        j >>= 1
        if (j == 0) {
            i++
            j = 16
        }
    }
    if (k < 0) {
        console.log(-1)
    } else {
        console.log((a.map(v => v + (v > 9 ? 55 : 48)) + "").replace(/^0+/, "") || 0)
        console.log((b.map(v => v + (v > 9 ? 55 : 48)) + "").replace(/^0+/, "") || 0)
    }
        
}

function main() {
    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const k = parseInt(readLine(), 10);

        const a = readLine();

        const b = readLine();

        const c = readLine();

        aOrB(k, a, b, c);
    }
}