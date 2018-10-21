function processData(input) {
    var BigNumber = require('bignumber.js');
    
    //Enter your code here
    input = input.split('\n')[0].split(' ');
    var a = new BigNumber(input[0]);
    var b = new BigNumber(input[1]);
    var n = parseInt(input[2],10);
    //console.log(a+" "+b+" "+n)
    var f = function(a,b){
        //return a + Math.pow(b,2)
        return b.times(b).plus(a);
    };
    
    var i;
    var o = new BigNumber(0);
    for (i=2; i<n; i++) {
        o = f(a,b);        
        a = b;
        b = o;        
    }
    console.log(o.toFixed(0));
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