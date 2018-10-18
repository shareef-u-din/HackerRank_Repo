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

/////////////// ignore above this line ////////////////////

function anotherMinimaxProblem(a) {
    if(a.length == 2)
        return a[0] ^ a[1];
    var max = Math.max(...a);
    var min = Math.min(...a);
    if(max == min) return 0;
    while(true){
        max = Math.max(...a);
        var numberBitsToEncodeMax = max.toString(2).length;
        var biggestElementEndedByZero = Math.pow(2, numberBitsToEncodeMax - 1) - 1;

        var positionsOfElementsEndedByZero = [];
        var positionsOfElementsEndedByOne = [];
        for(var i = 0; i < a.length; i++){
            if(a[i] > biggestElementEndedByZero){
                positionsOfElementsEndedByOne.push(i);
            }
            else {
                positionsOfElementsEndedByZero.push(i);
            }      
        }
        if (positionsOfElementsEndedByZero.length == 0) {
            for(var i = 0; i < a.length; i++) {
                a[i] = a[i] - biggestElementEndedByZero - 1;
            }
        }
        else {
            break;
        }
    }
    var minScore = 0
    for(var i = 0; i < positionsOfElementsEndedByOne.length; i++) {
        for(var j = 0; j < positionsOfElementsEndedByZero.length; j++) {
            firstNumber = a[positionsOfElementsEndedByOne[i]];
            secondNumber = a[positionsOfElementsEndedByZero[j]];
            var result = firstNumber^secondNumber;
            if(minScore == 0 || result < minScore ) {
                minScore = result;
            }
        }
    }
    return minScore;
}

function main() {
    var n = parseInt(readLine());
    a = readLine().split(' ');
    a = a.map(Number);
    var result = anotherMinimaxProblem(a);
    process.stdout.write("" + result + "\n");

}