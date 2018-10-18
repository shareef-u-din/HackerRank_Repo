function convertCases(input) {
  var args = input.split(/\r?\n/);
  var arr;
  var casesCount;
  var cases = [];
  var k;
  var matrix;
  var m;
  var n;
  var i;
  var j;
  
  function toInt(input) {
    return parseInt(input, 10);
  }

  function toArray(input) {
    return input.split(' ').map(function(n) { return parseInt(n); });
  }
  
  casesCount = toInt(args[0]);
  args = args.slice(1);
  
  for (j = 0; j < casesCount; j++) {
    arr = toArray(args[0]);
    m = arr[0];
    n = arr[1];
    args = args.slice(1);

    matrix = [];
    for (i = 0; i < m; i++) {
      matrix.push(args[i].split(''));
    }
    args = args.slice(m);

    k = toInt(args[0]);
    args = args.slice(1);
    
    cases.push({matrix: matrix, k: k});
  }
  
  cases.forEach(function(_case) {
    for(i = 0; i < _case.matrix.length; i++) {
      for(j = 0; j < _case.matrix[0].length; j++) {
        if (_case.matrix[i][j] === 'M') {
          _case.start = {i: i, j: j};
        }

        if (_case.matrix[i][j] === '*') {
          _case.finish = {i: i, j: j};
        }
      }
    }
  });
  
  return cases;
}

function run(matrix, start, finish, k) {
  var maxI = matrix.length - 1;
  var maxJ = matrix[0].length - 1;
  var directions = [];
  var i;
  
  if (start.i === finish.i && start.j === finish.j) {
    return k;
  }
  
  // Go up
  if (start.i > 0 && matrix[start.i - 1][start.j] !== 'X') {
    directions.push({i: start.i - 1, j: start.j});
  }
  // Go left
  if (start.j < maxJ && matrix[start.i][start.j + 1] !== 'X') {
    directions.push({i: start.i, j: start.j + 1});
  }
  // Go down
  if (start.i < maxI && matrix[start.i + 1][start.j] !== 'X') {
    directions.push({i: start.i + 1, j: start.j});
  }
  // Go right
  if (start.j > 0 && matrix[start.i][start.j - 1] !== 'X') {
    directions.push({i: start.i, j: start.j - 1});
  }
  
  if (directions.length > 1) {
    k++;
  }
  
  for (i = 0; i < directions.length; i++) {
    matrix[start.i][start.j] = 'X';
    var res = run(matrix, directions[i], finish, k);
    if (res !== undefined) {
      return res;
    }
    matrix[start.i][start.j] = '.';
  }
}

function solve(_case) {
  var res = run(_case.matrix, _case.start, _case.finish, 0);
  if (res === _case.k) {
    console.log('Impressed');
  } else {
    console.log('Oops!');
  }
}

function processData(input) {
  var cases = convertCases(input);
  cases.forEach(function(_case) {
    solve(_case);
  });
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