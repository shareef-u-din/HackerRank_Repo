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
// ab, bc, cd
// abcd
function passwordCracker(pass, attempt) {
    let passwordSolution = []
    let passwordSet = new Set()
    
    for (let password of pass) passwordSet.add(password)
    
    passwordSolution[-1] = []
    
    for (let n=0; n<attempt.length; n++) {
        for (let i=Math.max(-1, n-10); i<n; i++) {
            if (passwordSolution[i] !== undefined) {
                let str = attempt.substring(i+1, n+1)
                if (passwordSet.has(str)) {
                    passwordSolution[n] = [...passwordSolution[i], str]
                    break
                }
            }
        }
    }
    
    if (passwordSolution[attempt.length - 1] === undefined) return 'WRONG PASSWORD'
    else return passwordSolution[attempt.length - 1].join(' ')
}

function main() {
    var t = parseInt(readLine());
    for(var a0 = 0; a0 < t; a0++){
        var n = parseInt(readLine());
        pass = readLine().split(' ');
        var attempt = readLine();
        var result = passwordCracker(pass, attempt);
        process.stdout.write("" + result + "\n");
    }

}