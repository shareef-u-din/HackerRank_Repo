var cube, sumCube;
var cubeSize;

function processData(input) {
    //Enter your code here
    var lines = input.split("\n");
    
    var numCubes = parseInt(lines[0]);
    var lineIndex = 1;
    
    for (var i = 0; i < numCubes; i++) {
        var info = lines[lineIndex++].split(" ");        
        cubeSize = parseInt(info[0]);
        var numOperations = parseInt(info[1]);
        
        cube = createCube(cubeSize);
        sumCube = createCube(cubeSize);
        for (j = 0; j < numOperations; j++) {
            handleOperation(lines[lineIndex++]);
        }
    }
}

function handleOperation(line) {
    var info = line.split(" ").map(function(v) {
        if (v === "UPDATE" || v === "QUERY") {
            return v;
        }
        return Number(v);
    });
    
    var x0, x1, y0, y1, z0, z1;
    
    if (info[0] === "UPDATE") {
        x0 = info[1];
        y0 = info[2];
        z0 = info[3];
        
        var diff = info[4] - cube[x0][y0][z0];
        
        cube[x0][y0][z0] = info[4];
        
        for (var i = x0; i <= cubeSize; i++) {
            for (var j = y0; j <= cubeSize; j++) {
                for (var k = z0; k <= cubeSize; k++) {
                    sumCube[i][j][k] += diff;
                }
            }
        }
        
    } else if (info[0] === "QUERY") {
        x0 = info[1];
        y0 = info[2];
        z0 = info[3];
        x1 = info[4];
        y1 = info[5];
        z1 = info[6];
        
        var result = sumCube[x1][y1][z1];
        
        result -= sumCube[x0 - 1][y1][z1];        
        result -= sumCube[x1][y0 - 1][z1];        
        result -= sumCube[x1][y1][z0 - 1];
        
        result += sumCube[x0 - 1][y0 - 1][z1];
        result += sumCube[x0 - 1][y1][z0 - 1];
        result += sumCube[x1][y0 - 1][z0 - 1];
        
        result -= sumCube[x0 - 1][y0 - 1][z0 - 1];
        
        console.log(result);
    }
   
}

function createCube(size) {
    var result = new Array(size + 1);
    for (var i = 0; i <= size; i++) {
        result[i] = new Array(size + 1);
        
        for (var j = 0; j <= size; j++) {
            result[i][j] = new Array(size + 1);
            
            for (var k = 0; k <= size; k++) {
                result[i][j][k] = 0;
            }
        }
    }
    
    return result;
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