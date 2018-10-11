'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function countSort(arr) {
      
    let n=arr.length;
    let ar=new Array(n);
    for(let j=0;j<n;j++) {
        ar[j]="";
    }
    for(let i = 0; i < n/2; i++){
        let x = arr[i][0];
        
        let s =arr[i][1];
        
        ar[x] = ar[x] + "-" + " ";
        
    }
    
    for(let i = n/2; i < n; i++){
        let x = arr[i][0];
        let s =arr[i][1];
        ar[x] = ar[x] + s + " ";
    }
    
    let str="";
    for(let i = 0; i < n; i++)
       str=str+ar[i];
     console.log(str);
   
        
}
function main() {
    const n = parseInt(readLine().trim(), 10);

    let arr = Array(n);

    for (let i = 0; i < n; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ');
    }

    countSort(arr);
}
