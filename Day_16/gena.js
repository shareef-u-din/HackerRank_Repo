process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}


function solveProblem(a, n) {
 
let b = [];

function initialize() {

  for (let i = 0; i < n; i++) {
    a[i]--;
  }
  for (let i = 0; i < Math.pow(4, n); i++) {
    b[i] = -1;
  }
}

function convertStateToNumber(arr) {

  let value = 0;
  for (let i = 0; i < n; i++) {
    value = value | (arr[i] << (2*i));
  }
  //console.log(arr, value);
  return value;
}

function convertNumberToState(num) {
  let arr2 = [];
  for (let i = 0; i < n; i++) {
    arr2[i] = num & 3;
    num = num >> 2;
  }
  return arr2;
}

function getTopDiskInRod(tempArr) {
  //let value = -1;
  // console.log(arr)
  let top2 = [];
  for (let j = 0; j < 4; j++) {
    top2[j] = n;
  }
  // console.log(top)
  for (let j = n-1; j >= 0; j--) {
    top2[tempArr[j]] = j;
    // console.log(j, arr[j], top[arr[j]])
  }
  // console.log(top)
  return top2;
}
function findSolution() {
  let num = convertStateToNumber(a);
  let queue = [num];
  let arr;
  b[num] = 0;
  let count = 1, idx = 0;
  while (idx < count) {
    num = queue[idx];
    idx++;
    if (num == 0) return b[num];
    arr = convertNumberToState(num);
    let top = getTopDiskInRod(arr);
    for (i = 0; i < 4; i++) {
      if (top[i] < n) {
        for (j = 0; j < 4; j++) {
          if (top[i] < top[j]) {
            let newArr = arr.slice();
            newArr[top[i]] = j;
            let newNum = convertStateToNumber(newArr);
            if (b[newNum] == -1) {
              queue[count] = newNum;
              count++;
              b[newNum] = b[num] + 1;
            }
          }
        }
      }
    }
  }

}
initialize();
return (findSolution());
 

}

function main() {
    var N = parseInt(readLine());
    a = readLine().split(' ');
    a = a.map(Number);
    console.log(solveProblem(a, N));
}