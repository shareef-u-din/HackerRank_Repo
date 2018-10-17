function processData(input) {
    input = input.split(/[ \n]/);
    var iterator = 0;
    while(input[0]--) {
        iterator++;
        var nodes = [];
        while(input[iterator]--) {
            nodes.push({
                neighbors : [],
                dist : -1
            })
        }
        var edgeCount = input[++iterator];
        while(edgeCount--) {
            var fromNode = input[++iterator] -1;
            var toNode = input[++iterator] -1;
            nodes[fromNode].neighbors.push(nodes[toNode]);
            nodes[toNode].neighbors.push(nodes[fromNode]);
        }
        iterator++;
        bfs(nodes,input[iterator]-1);
        nodes.forEach(function displayResult(node) {
            if(node.dist) {
                process.stdout.write(node.dist + " ");
            }
        });
        process.stdout.write("\n");
    }
}

function bfs(nodes,start) {
    visit(nodes[start],-6);
}

function visit(node, depth) {
    node.dist = depth + 6;
    node.neighbors.forEach(function visitNeighbor(neighbor) {
        if(neighbor.dist == -1 || neighbor.dist > node.dist + 6) {
            visit(neighbor,node.dist);
        }
    })
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