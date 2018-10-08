
function processData(input) {
    var lines = input.split("\n");
    var data = lines[1].split(' ').map(Number);
    var all = {};
    for(var i=0;i<data.length;i++){
        all[data[i]] = i+1;
    }
    for(var i=1;i<=data.length;i++){
        console.log(all[all[i]]);
    }
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