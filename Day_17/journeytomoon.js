var tree_lengths = []
var tree = []
var visited = []

function tree_size(node) {
    var size = 1
    var node_array = tree[node];
    //visited.push(node)
    for (var i = 0; i < node_array.length; i++) {
        if (node_array[i] && visited.indexOf(i) == -1) {
            visited.push(i)
            size = size + tree_size(i)
        }
    }
    return size
}

function processData(input) {
    input = input.split('\n')
    var first = input.shift().split(' ')
    var i = first[1];

    for (var j = 0; j < first[0]; j++) {
        tree[j] = []
    }
    for (var j = 0; j < i; j++) {
        var nodes = input.shift().split(' ')
        var node1 = nodes[0]
        var node2 = nodes[1]
        tree[node1][node2] = 1
        tree[node2][node1] = 1
    }
    for (var j = 0; j < first[0]; j++) {
        if (visited.indexOf(j) == -1) {
            visited.push(j);
            var temp_size = tree_size(j);
            if (temp_size != 1) {
                tree_lengths.push(temp_size);
            }
        }
    }
    var total_ways = (first[0] * (first[0] - 1)) / 2;

    var same_ways = 0;
    for (var k = 0; k < tree_lengths.length; k++) {
        var perm = (tree_lengths[k] * (tree_lengths[k] - 1)) / 2;
        same_ways = same_ways + perm;
    }
    console.log(total_ways - same_ways);
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