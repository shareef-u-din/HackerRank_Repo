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

// Complete the bomberMan function below.
function bomberMan(n, grid) {
    var l = n;
    var first = 1;
    while(n > 0) {
        var temp = grid;
        if(n == 1 ) {
            return grid;
        }
        else if(n == 2  || (l%2 == 0 && l > 3) ) {
            for(var i=0;i<temp.length;i++) {
                for(var j=0;j<temp[i].length;j++) {
                    temp[i] = temp[i].substring(0,j) + "O" + temp[i].substring(j+1);
                }
            }
            return temp;
        }
        else {
            for(var i=0;i<grid.length;i++) {
                for(var j=0;j<grid[i].length;j++) {
                    if(grid[i].charAt(j) == '.') {
                        grid[i] = grid[i].substring(0,j) + "1" + grid[i].substring(j+1);
                    }
                }
            }
            for(var i=0;i<grid.length;i++) {
                for(var j=0;j<grid[i].length;j++) {
                    if(grid[i].charAt(j) == 'O') {
                        if(i-1 >=0) {
                            if(grid[i-1].charAt(j) != 'O') {
                                grid[i-1] = grid[i-1].substring(0,j) + "B" + grid[i-1].substring(j+1);
                            }
                        }
                        if(i+1 < grid.length) {
                            if(grid[i+1].charAt(j) != 'O') {
                                grid[i+1] = grid[i+1].substring(0,j) + "B" + grid[i+1].substring(j+1);
                            }
                        }
                        if(j-1 >= 0) {
                            if(grid[i].charAt(j-1) != 'O') {
                              grid[i] = grid[i].substring(0,j-1) + "B" + grid[i].substring(j);
                            }
                        }
                        if(j + 1 < grid[i].length) {
                            if(grid[i].charAt(j+1) != 'O') {
                                grid[i] = grid[i].substring(0,j+1) + "B" + grid[i].substring(j+2);
                            }
                        }
                    }
                }
            }
            for(var i=0;i<grid.length;i++) {
                for(var j=0;j<grid[i].length;j++) {
                    if(grid[i].charAt(j) == 'B' || grid[i].charAt(j) == 'O') {
                        grid[i] = grid[i].substring(0,j) + "." + grid[i].substring(j+1);
                    }
                    else if(grid[i].charAt(j) == '1'){
                        grid[i] = grid[i].substring(0,j) + "O" + grid[i].substring(j+1);
                    }
                }
            }
            if(first) {
                n = n - 3;
                first = 0;
            }
            else {
                n = n - 2;
            }
        }
        return grid;
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const rcn = readLine().split(' ');

    const r = parseInt(rcn[0], 10);

    const c = parseInt(rcn[1], 10);

    const n = parseInt(rcn[2], 10);

    let grid = [];

    for (let i = 0; i < r; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    let result = bomberMan(n, grid);

    ws.write(result.join("\n") + "\n");

    ws.end();
}