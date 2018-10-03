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
    var input = [];
    var Q = parseInt(readLine());
    for(var a0 = 0; a0 < Q; a0++){
        input.push(parseInt(readLine()));
    }
    var max = Math.max.apply(Math, input);
    var cache = new Int32Array(max+1);
    for (let i = 4; i <= max; i++) {
        solve(cache, i);
    }
    console.log(input.map(v => solve(cache, v)).join('\n'));
}

function solve(cache, v) {
    if (v <= 3) return v;
    if (cache[v]) return cache[v];
    var ret = v, mid = (Math.sqrt(v) | 0);
    for (let i = 2; i <= mid; i++) {
        if (v % i > 0) continue;
        ret = Math.min(ret, solve(cache, i >= v/i ? i : v/i) + 1);
    }
    ret = Math.min(ret, solve(cache, v-1) + 1)
    return cache[v] = ret;
}