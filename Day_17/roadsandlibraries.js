process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}


function main() {
    var q = parseInt(readLine());
    for(var a0 = 0; a0 < q; a0++){
        var n_temp = readLine().split(' ');
        var n = parseInt(n_temp[0]);
        var m = parseInt(n_temp[1]);
        var x = parseInt(n_temp[2]);
        var y = parseInt(n_temp[3]);
        
        var forest = [];
        for(var a1 = 0; a1 < m; a1++){
            var city_1_temp = readLine().split(' ');
            var city_1 = parseInt(city_1_temp[0]);
            var city_2 = parseInt(city_1_temp[1]);
            
            if(!forest[city_1]){
                forest[city_1] = [];
            }
            forest[city_1].push(city_2);
            
            if(!forest[city_2]){
                forest[city_2] = [];
            }
            forest[city_2].push(city_1);
        }
        
        if(x<=y) {
            console.log(n*x);
        }
        else {

            var count = 0;
            for(var i=1; i<=n; i++){
                if(forest[i]==undefined){
                    count++;
                }
                if(!Array.isArray(forest[i])){
                    continue;
                }
                var c = ++count;
                var que = [i];
                while(que.length){
                    var j = que.pop();
                    for(var k=0; k<forest[j].length; k++){
                        if(Array.isArray(forest[forest[j][k]]) && que.indexOf(forest[j][k])<0){
                            que.push(forest[j][k]);
                        }
                    }
                    forest[j] = count;
                }
                
               
            }
            
            console.log(x*count+(n-count)*y);
        }
    }

}