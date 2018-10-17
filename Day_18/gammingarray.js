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

function main() {
    var g = parseInt(readLine());
    for(var a0 = 0; a0 < g; a0++){
        var n = parseInt(readLine());
        var arr = readLine().split(' ').map(Number);
        var turns = 0;
        var max = 0;
        for (var i=0; i<n; i++) {
            if (max < arr[i]) {
                max = arr[i];
                turns++;
            }
        }
        if (turns%2 == 0) {
            console.log('ANDY');
        } else {
            console.log('BOB');
        }
    }

}