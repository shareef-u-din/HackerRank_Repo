function processData(input) {
    //Enter your code here
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

function processData(input) {
    var inputs = input.split('\n');
    var n = parseInt(inputs[0]);
    var times = inputs[1].split(' ').map(Number);
    var max = 0;
    var diffArr = [];
    var requiredIndex = 0;
    for (var i=0; i<n; ++i) {
        var rangeEnd = i - times[i] + 1;
        if (rangeEnd < 0) {
            rangeEnd += n;
        }
        var rangeStart = i + 1;
        if (rangeStart >= n) {
            rangeStart -= n;
        }
        diffArr[rangeStart] = (diffArr[rangeStart] || 0) + 1;
        diffArr[rangeEnd] = (diffArr[rangeEnd] || 0) - 1;
    }
    
    var prefixSum = 0;
    for(var j=0; j<n; ++j) {
        prefixSum += diffArr[j];
        if (max < prefixSum) {
            max = prefixSum;
            requiredIndex = j;
        }
    }
    console.log(requiredIndex + 1);
}