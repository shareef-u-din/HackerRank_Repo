function processData(input) {
    var temp = input.split("\n")
    var linecount = 1;
    for (var i = 0; i < temp[0]; i++){
        var n = temp[linecount];
        linecount++;
        var arr = []
        for (var j = linecount; j < linecount + 2 * n; j++){
            arr.push(temp[j].split(" ").map(Number))
        }
        linecount += 2 * n; 
        var table = []
        for (j = 0; j < n * n; j++){
            table[j] = 0
        }
        for (j = 0; j < 2 * n; j++){
            for (var k = 0; k < 2 * n; k++){
                var hash = (Math.min(k, 2 * n - k - 1) * n) + Math.min(j, 2 * n - j - 1)
                if (arr[j][k] > table[hash])
                    table[hash] = arr[j][k]
            }
        }
        console.log(table.reduce((x,y) => x + y))
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