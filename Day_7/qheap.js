class MinHeap {
  constructor() {
        this.size = 0;
        this.Heap = [];
  }
  parent(k) {
      var i=parseInt(k);
     var j=(i-1)/2;
      if(j<=0)
          return 0;
      return parseInt(j);
  
  } 
  
  left(i) { return (2*i + 1); } 
  
   right(i) { return (2*i + 2); } 
    
    swap(fpos,spos)
    {
        var tmp;
        tmp = this.Heap[fpos];
        this.Heap[fpos] = this.Heap[spos];
        this.Heap[spos] = tmp;
    }
    minHeapify(i)
    {
        var l = this.left(i); 
        var r = this.right(i); 
        var smallest = i; 
        if (l < this.size && this.Heap[l] < this.Heap[i]) 
            smallest = l; 
        if (r < this.size && this.Heap[r] < this.Heap[smallest]) 
            smallest = r; 
        if (smallest != i) 
        { 
            this.swap(i, smallest); 
            this.minHeapify(smallest); 
        } 
    }
    insert(currentElement)
    {
        var element=parseInt(currentElement);
        this.size++; 
        var i = this.size - 1; 
        this.Heap[i] = element; 
        while (i != 0 && (this.Heap[this.parent(i)] > this.Heap[i])) 
        { 
           this.swap((i), this.parent(i)); 
           i = this.parent(i); 
        }  
    }
    print()
    {
        if(this.Heap.length > 0)
          console.log(this.Heap[0]);
    }
    remove(values)
    {
        var val=parseInt(values);
        var index=0;
        for(var x of this.Heap){
            if(x==val){
                break;
            }
            index++;
        }
        var popped = this.Heap[(this.size)-1];
        this.Heap[index]=popped;
        this.size--;
        this.minHeapify(index);
    } 
   
}
function processData(input) {
   
    const mh=new MinHeap();
    var a=0;
    const inputData = input.split('\n');
    for(var line of inputData){
        const lineData = line.split(' ');
        var len=lineData.length;
        if(len==2){
            if(lineData[0]==1) {
                mh.insert(lineData[1]);
            }else if(lineData[0]==2) {
                mh.remove(lineData[1]);
            }      
        }else if(len==1){
             mh.print();
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
