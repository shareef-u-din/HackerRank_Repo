function isPowerOf2(input) {
    return Number(input).toString(2).match(/1/g).length === 1;
}

function isOver(i) {
    return i === 1;
}

function getMaxPowerOf2(input) {
    return Math.pow(2, Number(input).toString(2).length - 1);
}

function runTurn(input, isRichard) {
    if (isOver(input)) return isRichard;
    
    if (isPowerOf2(input)) {
        return runTurn(input / 2, !isRichard);
    }
    
    return runTurn(input - getMaxPowerOf2(input), !isRichard);
}

function runGame(input) {
    if (runTurn(input, true)) {
        return 'Richard';
    }
    
    return 'Louise';
}

function processData(input) {
    //Enter your code here
    var inputs = input.split('\n');
    inputs.shift();
    inputs.map(Number).forEach((i) => {
        if (!i) return;
        console.log(runGame(i));
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