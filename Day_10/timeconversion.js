'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the timeConversion function below.
 */
function timeConversion(s) {
    var arr=s.split(":");
    let hr=arr[0];
    if(arr[2].charAt(2) == 'P'){
        arr[2]=arr[2].replace("PM","");
        hr=parseInt(hr)+12;
        if(hr==24 && arr[1]=="00" && arr[2]=="00")
            hr="00";
        if(hr==24)
            hr=12;
    }else{
        if(hr==12)
           hr="00";
        arr[2]=arr[2].replace("AM","");
        
    }
    var str=hr+":"+arr[1]+":"+arr[2];
    return str;
    

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = timeConversion(s);

    ws.write(result + "\n");

    ws.end();
}
tim