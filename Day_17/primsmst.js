function buildAdjMatrix( arr, start, end ){
    var res = [];
    for ( var i = start; i <= end; i++){
        var line = arr[i].split(' ');
        if ( res[+line[0]] === undefined ){
            res[+line[0]] = [];
        }
        res[+line[0]][+line[1]] = +line[2];
        if ( res[+line[1]] === undefined ){
            res[+line[1]] = [];
        }
        res[+line[1]][+line[0]] = +line[2];          
    }
    return res;
}

function processData(input) {
    var arr = input.split('\n');
    var nm = arr[0].split(' ');
    var n = +nm[0];
    var m = +nm[1];
    var s = +arr[arr.length-1].charAt(0);
    var adjMat = buildAdjMatrix( arr, 1, m ); 
    var visited = [];
    var visitedMap = {};
    var totalDistance = 0;
    visited.push(s);
    visitedMap[s] = 1;
    while ( visited.length < n ){
        var newVisited = -1;
        var distance = Number.MAX_VALUE;
        for ( var i = 0; i < visited.length; i++ ){
            var cur = visited[i];
            for ( var j = 1; j <= n; j++ ){ 
                if ( adjMat[cur][j] !== undefined && adjMat[cur][j] < distance && visitedMap[j] !== 1){
                    newVisited = j;
                    distance = adjMat[cur][j];
                }
            }
        }
        
        totalDistance += distance;
        visited.push(newVisited);
        visitedMap[newVisited] = 1;
        
    }
    console.log(totalDistance);
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