function processData(input) {
    var lines = input.split('\n');
    var ne = lines[0].split(' ').map(Number);
    var n = ne[0];
    var e = ne[1];

    var edges = [];
    var visited = [];
    var visited2 = [];
    for (var i = 0; i < n; i++) {
        visited[i] = -1;
        visited2[i] = -1;
        edges[i] = [];
    }

    for (var i = 0; i < e; i++) {
        var xyc = lines[i+1].split(' ').map(Number);
        var x = xyc[0] - 1;
        var y = xyc[1] - 1;
        var c = xyc[2];
        edges[x].push({to: y, cost: c});
        edges[y].push({to: x, cost: c});
    }

    var queue = [];
    var queue2 = [];
    queue.push({index: 0, cost: 0});
    queue2.push({index: n-1, cost: 0});
    
    var step = 0;
    while (queue.length > step && queue2.length > step) {
        var q = queue[step];
        var qIndex = step;
        for (var i = step, il = queue.length; i < il; i++) {
            if (queue[i].cost < q.cost) {
                q = queue[i];
                qIndex = i;
            }
        }

        queue[qIndex] = queue[step];
        queue[step] = q;
        
        if (q.index === n - 1) {
            console.log(q.cost);
            return;
        }
        
        if (visited2[q.index] >= 0) {
            console.log(Math.max(q.cost, visited2[q.index]));
            return;
        }
        
        visited[q.index] = q.cost;
        
        var array = edges[q.index];
        for (var i = 0, il = array.length; i < il; i++) {
            if (visited[array[i].to] === -1) {
                queue.push({index: array[i].to, cost: Math.max(q.cost, array[i].cost)});
            }
        }

        var q = queue2[step];
        var qIndex = step;
        for (var i = step, il = queue2.length; i < il; i++) {
            if (queue2[i].cost < q.cost) {
                q = queue2[i];
                qIndex = i;
            }
        }

        queue2[qIndex] = queue2[step];
        queue2[step] = q;
        
        if (q.index === 0) {
            console.log(q.cost);
            return;
        }
        
        if (visited[q.index] >= 0) {
            console.log(Math.max(q.cost, visited[q.index]));
            return;
        }
        
        visited2[q.index] = q.cost;
        
        var array = edges[q.index];
        for (var i = 0, il = array.length; i < il; i++) {
            if (visited2[array[i].to] === -1) {
                queue2.push({index: array[i].to, cost: Math.max(q.cost, array[i].cost)});
            }
        }

        step++;
    }
    
    console.log('NO PATH EXISTS');
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