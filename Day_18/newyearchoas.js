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
    var T = parseInt(readLine());
    for(var a0 = 0; a0 < T; a0++){
        var n = parseInt(readLine());
        q = readLine().split(' ');
        q = q.map(Number);
        var steps = 0;
        var swaped = true;
        while (swaped) {
            swaped = false;
            for (var i = 0; i < n - 1; i++) {
                var init = q[i];
                if (init - i > 3) {
                    console.log('Too chaotic');
                    swaped = false;
                    break;
                } else if (init > q[i+1]) {
                    swaped = true;
                    steps ++;
                    var temp = init;
                    q[i] = q[i+1];
                    q[i+1] = temp;
                }
            }   
        }
        if (i === n - 1) {
            console.log(steps)            
        }
    }

}