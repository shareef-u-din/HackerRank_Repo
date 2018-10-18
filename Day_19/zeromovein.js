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
        p = readLine().split(' ');
        p = p.map(Number);
        var res = 0;
        for(var i=0;i<p.length;i++){
            if(p[i]%2==0){
                res ^= (p[i]-1);
            } else {
                res ^=  (p[i]+1);
            }
        }
        if(res){
            console.log("W")
        }  else {
            console.log("L")
        }
    }

}