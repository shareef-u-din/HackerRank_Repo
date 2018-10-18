function processData(input) {
    function isIncreasing(arr) {
        var last = 0;  
        for (var i = 0; i < arr.length; i++) {  
            if (arr[i] > 0){  
                if(last > arr[i]) return false;  
                last = arr[i];  
            }  
        }  
        return true;
    }
    function isAliceWin(arr, map) {
        var h = arr.join(',');
        if (map[h]) {
            return true;  
        }
        for (var i = 0; i < arr.length; i++) {  
            if (arr[i] > 0){  
                var temp = arr[i] ;  
                arr[i] = 0;  
                if(isIncreasing(arr)){  
                    map[h] = true;  
                    arr[i] = temp;  
                    return true;  
                }  
                if(!isAliceWin(arr, map)) {  
                    map[h] = true;  
                    arr[i] = temp;  
                    return true;  
                }  
                arr[i] = temp;  
            }  
        }
        return false;
    }
    var input = input.trim().split('\n');
    for (var i = 2; i < input.length; i += 2) {
        var arr = input[i].trim().split(' ').map(Number);
        var map = {};
        if (isAliceWin(arr, map)) {
            console.log('Alice');
        } else {
            console.log('Bob');
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