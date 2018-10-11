'use strict';

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
function almostSorted(A) {
    var l = 0;
    var N=A.length;
    var r = A.length - 1;
    while(l < r && A[l] <= A[l+1]){
      ++l;
    }
    if(l == r){
      return "yes";
    }
    while(r > l && A[r] >= A[r-1]){
      --r;
    }
    
    if((l > 0 && A[r] < A[l-1]) || (r < N-1 && A[l] > A[r+1])){
      return "no";
    }
   var m;
    for(m = l+1; m < r && A[m] >= A[m+1]; ++m){}
    if(m == r){
      return "yes\n" + ((r-l < 2) ? "swap " : "reverse ") + (l+1) + " " + (r+1);
    }
    if(m-l > 1 || A[l] < A[r-1] || A[r] > A[l+1]){
      return "no";
    }

    for(var k = r-1; m < k && A[m] <= A[m+1]; ++m){}
    return (r-m > 1) ? "no" : "yes\nswap " + (l+1) + " " + (r+1);
  }



function main() {
    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    var s="";
    s=almostSorted(arr);
    console.log(s);
}