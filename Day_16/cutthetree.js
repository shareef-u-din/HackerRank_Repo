function processData(input) {
    var lines = input.split('\n');
    var n = lines[0];
    var nodes = lines[1].split(' ').map(function(x){
        return {
            edges:[],
            data:parseFloat(x),
            sum:parseFloat(x),
            children:0,
            contributed:0
        };
    });
    for (var i = 2; i < lines.length; ++i) {
        var ab = lines[i].split(' ').map(function(x){return parseInt(x)-1;})
        nodes[ab[0]].edges.push(ab[1]);
        nodes[ab[1]].edges.push(ab[0]);
    }
    
    var queue = [0];
    while (queue.length) {
        var ptr = queue[queue.length-1];
        var node = nodes[ptr];
        
        if (!node.visited) {
            for (var i = 0; i < node.edges.length; ++i) {
                var childPtr = node.edges[i];
                var child = nodes[childPtr];
                if (child.visited)
                    continue;
                node.children++;
                child.parent = ptr;
                queue.push(childPtr);
            }
        }
        node.visited = true;

        if (node.contributed == node.children) {
            queue.pop();
            if (node.hasOwnProperty('parent')) {
                var parent = nodes[node.parent];
                parent.sum += node.sum;
                parent.contributed++;
            }
        }
    }
    
    var best = nodes[0].sum;
    for (var i = 0; i < nodes.length; ++i) {
        best = Math.min(best, Math.abs(nodes[0].sum-2*nodes[i].sum));
    }
    console.log(best);
  
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