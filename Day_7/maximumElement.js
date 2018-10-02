class Stack 
{  
    constructor(){
        this.stack=[];
    }
}
function processData(input) {
    const st=new Stack();
    var a=0;
    const inputData = input.split('\n');
    for(var line of inputData){
        let lineData = line.split(' ');
        var len=lineData.length;
        
        if(len==2){
            if(lineData[0]==1) {
                
               st.stack.push(parseInt(lineData[1]));
            }   
        }else if(len==1){
             if(lineData[0]==2) {
                 st.stack.pop();
                 
             }else if(lineData[0]==3) {
                 console.log(Math.max(...st.stack));
             }
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
