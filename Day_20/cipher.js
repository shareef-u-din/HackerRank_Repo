function processData(input) {
    //Enter your code here
    newLine = input.indexOf("\n");
    
    nums = input.substr(0, newLine).split(" ");
    n = parseFloat(nums[0]);
    k = parseFloat(nums[1]);
    result = new Array(n);
    
    
    sum = 0;
    for(var i =  0; i < n ; i++){
        if(i >= k)sum ^= result[i - k];
        result[i]= sum ^ input[i + newLine + 1];
        sum ^= result[i];
        
    }
    
    process.stdout.write( result.join(""));
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