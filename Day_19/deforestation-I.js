function Node(value) {
    this.value = value;
    this.children = [];

    this.addChild = function(node) {
        this.children[this.children.length] = node;
    }

    this.getChildren = function() {
        return this.children;
    }
    
    this.printAll = function(){
        console.log (this.value);
        if (this.children !== null){
            for (var i = 0; i < this.children.length; i++){
                this.children[i].printAll();
            }
        }
    }
}


function processData(input) {
    function findChild(arr, value){
        if (arr[value]){
            return arr[value];
        } 
        return null;
    }
    
    function nimSum(node){
        var nSum = 0;
        if (node.children.length === 0 && node !== root){
            return 1;
        } else if (node.children.length === 0 && node === root){
            return 0;
        } else if (node.children.length === 1){
            return 1 + nimSum(node.children[0]);
        } else if (node === root){
            for (var i = 0; i < node.children.length; i++){
                nSum = nSum ^ nimSum(node.children[i]);
            }
        } else{
            for (var i = 0; i < node.children.length; i++){
                nSum = nSum ^ nimSum(node.children[i]);
            }
            nSum++;
        }
        return nSum;
    }
    
    function genTree(arr, rArray, index){
        arr[index].forEach(function(e){
            var node = findChild(rArray,index);
            if (findChild(rArray,e)){            
            } else{
                var temp = new Node(e);
                node.addChild(temp);
                rArray[e] = temp;
                genTree(arr, rArray, e);
            }
        });   
    }
    
    var t = parseInt((input.split("\n"))[0]);
    var arr = (input.split("\n")).splice(1);
    for (var i = 0; i < t; i++){
        var root = new Node(1);
        var n = parseInt(arr[0]);
        var links = [];
        var refArray = Array(n+1);
        refArray[1] = root;
        for (var k = 0; k <=n; k++){
            links.push([]);
        }
        for (var j = 1; j < n; j++){
            var x = parseInt((arr[j].split(" "))[0]);
            var y = parseInt((arr[j].split(" "))[1]);
            links[x].push(y);
            links[y].push(x);
        }
        genTree(links, refArray, 1);
        // at this point, the tree is filled.
        arr = arr.splice(n);
        if (nimSum(root) === 0){
            console.log("Bob");
        } else{
            console.log("Alice");
        }
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