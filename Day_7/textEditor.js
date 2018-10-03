class ManipulateString {
    constructor() {
        this.string="";
        this.stack=[];
    }
    append(str) {
        this.stack.push(1+" "+str);
        this.string = this.string + str;
    }
    delete(k) {
        var len=this.string.length;
        if(len >= k) {
            var l=len-k;
            this.stack.push(2+" "+this.string.substring(l));
            if(l == 0)
                this.string="";
            else
            this.string=this.string.substring(0,l);
        }
    }
    print(k) {
        var len=this.string.length;
        if(len >= k) {
            console.log(this.string[k-1]);
        }
    }
    undo() {
        var last=this.stack.pop();
        var ch=last.charAt(0);
        var str=last.substring(2);
        
        if(ch == 1) {
            var k=str.length;
            var len=this.string.length;
            let nlen=len - k;
            if(nlen == 0){
                 this.string = "";
                  return;
            }
            if(nlen > 0) {
                this.string = this.string.substring(0,nlen);
            }
        }
        if(ch == 2) {
            this.string = this.string + str;
        }
        
    }
}
function processData(input) {
     const inputData = input.split('\n');
    const object=new ManipulateString();
    for(var line of inputData){
        let lineData = line.split(' ');
        var len=lineData.length;
            
        if(len==2){
            if(lineData[0]==1) {
                object.append(lineData[1].trim());
            } 
            if(lineData[0]==2) {
                 object.delete(parseInt(lineData[1]));   
             }
             if(lineData[0] == 3) {
                object.print(parseInt(lineData[1]));
            }
        }else if(len==1){
             if(lineData[0]==4) {
                 object.undo();
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
