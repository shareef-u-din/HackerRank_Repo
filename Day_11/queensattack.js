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

function main() {
    var n_temp = readLine().split(' ');
    var n = parseInt(n_temp[0]);
    var k = parseInt(n_temp[1]);
    var rQueen_temp = readLine().split(' ');
    var rQueen = parseInt(rQueen_temp[0]);
    var cQueen = parseInt(rQueen_temp[1]);
    
    var obstacles = {};
    for(var a0 = 0; a0 < k; a0++){
        var rObstacle_temp = readLine().split(' ');
        var rObstacle = parseInt(rObstacle_temp[0]);
        var cObstacle = parseInt(rObstacle_temp[1]);
        obstacles[rObstacle + "-" + cObstacle] = true;
    }
    
    var count = 0;
    var r, c;
    //search left
    r = rQueen;
    for (c = cQueen-1; c > 0; c--) {
        if (obstacles.hasOwnProperty(r + "-" + c) == true)
            break;
        else
            count++;
    }
    //search right
    for (c = cQueen+1; c <= n; c++) {
        if (obstacles.hasOwnProperty(r + "-" + c) == true)
            break;
        else
            count++;
    }
    //search up
    c = cQueen;
    for (r = rQueen+1; r <= n; r++) {
        if (obstacles.hasOwnProperty(r + "-" + c) == true)
            break;
        else
            count++;
    }
    //search down
    for (r = rQueen-1; r > 0; r--) {
        if (obstacles.hasOwnProperty(r + "-" + c) == true)
            break;
        else
            count++;
    }
    //search up-left
    for (r = rQueen+1, c = cQueen-1; (r <= n && c > 0); r++, c--) {
        if (obstacles.hasOwnProperty(r + "-" + c) == true)
            break;
        else
            count++;
    }
    //search up-right
    for (r = rQueen+1, c = cQueen+1; (r <= n && c <= n); r++, c++) {
        if (obstacles.hasOwnProperty(r + "-" + c) == true)
            break;
        else
            count++;
    }
    //search down-left
    for (r = rQueen-1, c = cQueen-1; (r > 0 && c > 0); r--, c--) {
        if (obstacles.hasOwnProperty(r + "-" + c) == true)
            break;
        else
            count++;
    }
    //search down-right
    for (r = rQueen-1, c = cQueen+1; (r > 0 && c <= n); r--, c++) {
        if (obstacles.hasOwnProperty(r + "-" + c) == true)
            break;
        else
            count++;
    }
    
    console.log(count);
}