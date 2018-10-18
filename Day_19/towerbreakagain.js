function countFactor(size) {
  var count = 0;
  if(size % 2 == 0) count++;
  while(size % 2 == 0) {
    size  = size / 2;
  }
  for(var i = 3; i*i <= size; i++) {
    while(size % i == 0) {
      size = size / i;
      if(i % 2 != 0) count++; 
    }
  }
  if(size > 2) count++;
  return count;
}

function processData(input) {
  var inputArray = input.split("\n");
  for(var i = 2; i < inputArray.length; i += 2) {
    var towers = inputArray[i].split(" ");
    var nim = 0;
    towers.forEach(function(tower) {
      nim ^= countFactor(Number(tower));
    });
    nim == 0 ? console.log("2") : console.log("1");
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