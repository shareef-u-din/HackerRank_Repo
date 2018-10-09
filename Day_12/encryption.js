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

// Complete the encryption function below.
function encryption(s) {
    let textArray=s.split(" ");
    let len=0;
    let str="";
    for(var x of textArray) {
        len=len + x.length;
        str=str+x;
    }
    let rows=Math.floor(Math.sqrt(len));
    let cols=Math.ceil(Math.sqrt(len));
    if(rows * cols < len) {
        rows++;
    }
    let arr=new Array(rows);
    var j=0;
    for (var i = 0; i < arr.length; i++) {
        if(j+cols < str.length) {
            arr[i] = [str.substring(j,j+cols)];
        }
        else {
            
            arr[i] = [ str.substring(j) ];
            break;
        }
        j=j+cols;
    }
    for(var x of arr) {
        console.log(x);
    }
    let output="";
    for(var i=0;i<cols;i++) {
        var temp="";
        for(var row=0;row < rows;row++) {
            var p=arr[row];
             console.log(temp+p[0][i]);
            if(p[0][i] != undefined)
                temp=temp+p[0][i];
        }
       
        output=output+temp+" ";
    }
    
    return output;
    
    

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = encryption(s);

    ws.write(result + "\n");

    ws.end();
}
