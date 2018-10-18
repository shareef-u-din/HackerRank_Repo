function processData(input) {
   let newArr = input.split('\n');
    for(let i=0; i<newArr[0]; i++) {
        let n = newArr[3*(i+1)-2],
            A = newArr[3*(i+1)-1].split(' ').map(el => parseInt(el, 10)),
            B = newArr[3*(i+1)].split(' ').map(el => parseInt(el, 10)),
            Sum = A.map((item, idx) => item + B[idx]),
            P1 = 0,
            P2 = 0,
            index
        for(let j=0; j<n/2; j++) {
            index = Sum.indexOf(Math.max(...Sum));
            if(index > -1) {
                P1 += A[index];
                A.splice(index, 1);
                B.splice(index, 1);
                Sum.splice(index, 1);
            }
            index = Sum.indexOf(Math.max(...Sum));
            if(index > -1) {
                P2 += B[index];
                A.splice(index, 1);
                B.splice(index, 1);
                Sum.splice(index, 1);
            }
        }
        if(P1 > P2) console.log('First');
        else if(P1 < P2) console.log('Second');
        else if(P1 === P2) console.log('Tie');
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