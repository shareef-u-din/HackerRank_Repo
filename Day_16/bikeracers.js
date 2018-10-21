function processData(input) {
  _ = require('lodash');
  input = input.split('\n');
  var params = input.shift().split(' ').map(Number)
  var N = params[0]
  var M = params[1]
  var K = params[2]

  var origMatrix = []
  var workMatrix = []
  var sortArr = []

  for (var i = 0; i < N; i++) {
    origMatrix[i] = []
    workMatrix[i] = []
    for (var j = 0; j < M; j++) {

      var bikerX = Number(input[i].substr(0, input[i].indexOf(' ')))
      var bikerY = Number(input[i].substr(input[i].indexOf(' ') + 1))
      var bikeX = Number(input[j + N].substr(0, input[j + N].indexOf(' ')))
      var bikeY = Number(input[j + N].substr(input[j + N].indexOf(' ') + 1))
      var v = Math.pow(Math.abs(bikerX -  bikeX), 2) + Math.pow(Math.abs(bikerY - bikeY), 2)
      origMatrix[i][j] = v;
      workMatrix[i][j] = v;
      sortArr.push(v);
    }
  }

  sortArr.sort((a,b) => a - b);

  var left = 0;
  var mid = 0;
  var right = sortArr.length - 1;
  var ans = _.last(sortArr);

  while (left <= right) {
    mid = left +  Math.ceil((right - left) / 2)
    for (var i = 0; i < N; i++) {
      for (var j = 0; j < M; j++) {
        if (origMatrix[i][j] <= sortArr[mid]) workMatrix[i][j] = 0;
        else workMatrix[i][j] = origMatrix[i][j]
      }
    }

    var matchN = maxBipartiteMatch(workMatrix, (x) => !x);

    if (matchN < K) {
      left = mid + 1;
    } else {
      right = mid - 1;
      ans = Math.min(ans, sortArr[mid])
    }
  }
  console.log(ans)
}

function maxBipartiteMatch (matrix, isConnected) {
  var N = matrix.length;
  var M = matrix[0].length;
  var visited = new Array(M);
  var matches = new Array(M);
  var res = 0;
  isConnected = isConnected || function(x) {return x}

  function hasMatch(u) {
    for (var v = 0; v < M; v++) {
      if (isConnected(matrix[u][v]) && !visited[v]) {
        visited[v] = 1;

        if (matches[v] === -1 || hasMatch(matches[v])) {
          matches[v] = u;
          return true;
        }
      }
    }

    return false;
  }

  for (var i = 0; i < M; i++) {
    matches[i] = -1;
  }

  for (var u = 0; u < N; u++) {
    for (var k = 0; k < M; k++) {
      visited[k] = 0;
    }

    if (hasMatch(u)) {
      res++;
    }
  }

  return res;
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});