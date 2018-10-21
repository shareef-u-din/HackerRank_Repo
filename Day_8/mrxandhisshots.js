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

/////////////// ignore above this line ////////////////////

function main() {
    arr = readLine().split(' ');
    arr = arr.map(Number);

    var N = arr[0];
    var M = arr[1];

    var A = new Array(N).fill(0);
    var B = new Array(N).fill(0);
    var C = new Array(M).fill(0);
    var D = new Array(M).fill(0);


    for(var i=0;i<N;i++){
        arr = readLine().split(' ');
        arr = arr.map(Number);
        
        A[i]=arr[0];
        B[i]=arr[1];
    }
    for(var i=0;i<M;i++){
        arr = readLine().split(' ');
        arr = arr.map(Number);
        
        C[i]=arr[0];
        D[i]=arr[1];
    }

    A.sort((a,b) => a-b);
    B.sort((a,b) => a-b);
    
    var str=0;
    for(var i=0;i<M;i++){
        var l = C[i], r = D[i];
        var count1 = lowerBoundSearch(B, -1, N, l);
        var count2 = N - upperBoundSearch(A, -1, N, r);
        var strength = N - (count1+count2);
        str += strength;   
    }

    console.log(str);
}

function lowerBoundSearch(a, low, high, key)
    {
       while(low+1 < high) 
       {
           var mid = ~~((low+high)/2);
           if(a[mid] < key)
              low = mid;
           else
              high = mid;
       }  
      return high;
    }   

function upperBoundSearch(a, low, high, key)
   {
      while(low+1 < high)
      {
         var mid = ~~((low+high)/2);
         if(a[mid] <= key)
             low = mid;
         else
             high = mid;
      } 
      return high;
   }    
