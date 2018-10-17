var graph = [];
var even_trees = 0;
var visited=[];

function tree_size(node){
    var node_array=graph[node];
    var size=1;
    for(var i=0;i<node_array.length;i++){
        if(node_array[i] && visited.indexOf(i)==-1){
            visited.push(i)
            size= size + tree_size(i)
        }
    }
    if(size%2==0)
       even_trees++

    return size;
}

function processData(input) {
    input=input.split('\n')
    var first=input.shift().split(' ')
    var n=first[0]
    var m=first[1]
    
    for(var i=0;i<n;i++){
        graph[i]=[]
    }
    
    for(var i=0;i<m;i++){
        var t=input.shift().split(' ')
        var node1=t[0],node2=t[1]
        graph[node1-1][node2-1]=1
        graph[node2-1][node1-1]=1
    }
    //console.log(graph)
    tree_size(0)
    console.log(even_trees-1)
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