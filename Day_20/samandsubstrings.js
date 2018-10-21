var BigNumber = require('bignumber.js');

function processData(arr) {
    var sum = new BigNumber(0);
    var modulo = new BigNumber(1000000000).plus(7);

    for(var i = arr.length - 1, start = new BigNumber(1); i >= 0; i--) {
        if(arr[i] != '0') {
            var a = new BigNumber((arr[i] - '0') * (i + 1)).times(start);
        
            sum = sum.plus(a);
        }
        
        start = start.times(10).plus(1).modulo(modulo);
    }

    console.log(sum.modulo(modulo).toFixed());
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