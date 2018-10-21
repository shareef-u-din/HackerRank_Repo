function printGraph(g) {
    for (var i=0; i<g.length; i++) {
        console.log(i);
        for (var j=0; j<g[i].length; j++) {
            console.log('  ->',g[i][j])
        }
    }
}

// g: grafo
// n: nodo actual
// v: lista de visitados
function dfs(g, n, v) {
    if ( v.indexOf(n) != -1 ) return 1;
    v.push(n);
    //console.log(n);
    var ret = 1;
    var trypos = 0;
    while (ret == 1 && g[n].length > trypos) {
        ret = dfs(g, g[n][trypos], v);
        trypos++;
    }
}

function processData(input) {
    var d = input.split('\n');
    var n = Number(d.shift().split(' ')[0]);
    var TRIES = 500;
    var g = new Array(n+1);
    for (var i=0; i<g.length; i++) {
        g[i] = [];
    }
    var edge = d.shift();
    while (edge) {
        edge = edge.split(' ').map(Number);
        g[edge[0]].push(edge[1]);
        g[edge[1]].push(edge[0]);
        edge = d.shift();
    }
    //printGraph(g);
    var try_i = 1;
    var v_result = [];
    var v = [];
    while (try_i < TRIES && try_i < g.length) {
        v = [];
        dfs(g, try_i, v);
        if (v.length > v_result.length) v_result = v;
        if (v_result.length == n) break;
        try_i++;
    }
    console.log(v_result.length);
    console.log(v_result.join(' '));
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