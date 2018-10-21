function processData(input) {
    var arr = parseInput(input);
    var ret = 0, stack = [], i;
    for (let h of arr) {
        i = stack.length - 1;
        if (stack.length > 0 && stack[i].v <= h) {
            while (i >= 0 && stack[i].v < h) {
                stack.pop(); i--;
            }
            if (i >= 0 && stack[i].v === h) {
                ret += stack[i].c;
            }
        }
        if (i >= 0 && stack[i].v === h) {
            stack[i].c++;
        } else {
            stack.push({c: 1, v: h});
        }
    }
    console.log(ret * 2);
}

function parseInput(input) {
    var arr = input.split('\n');
    return arr[1].split(' ').map(Number);
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