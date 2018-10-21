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


function printShortestPath(n, i_start, j_start, i_end, j_end) {
    //  Print the distance along with the sequence of moves.
    const matrix = buildMatrix(n)
    const currPos = [i_start, j_start]
    const target  = [i_end, j_end]
    console.log(BFS(matrix, currPos, target))
}

function BFS(matrix, currPos, target, queue=[], visited={[currPos]: true}, moves={}) {
    if (currPos[0] === target[0] && currPos[1] === target[1]) {
        let pos = currPos
        const path = []
        while (moves[pos]) {
          path.unshift(moves[pos].name)
          pos = moves[pos].parent
        }

        return '' + path.length + "\n" + path.join(' ')
    }
    
    const directions = getAvailableDirections(matrix, currPos)
    for(let i=0; i<directions.length; i++) {
        const newPos = directions[i].coords
        if (!visited[newPos]) {
          queue.push(newPos)
          visited[newPos] = true
          moves[newPos] = {parent: currPos, name: directions[i].moveName}
        }
    }
    
    if (queue.length === 0) return "Impossible"

    const next = queue.shift()
    return BFS(matrix, next, target, queue, visited, moves)
}

function getAvailableDirections(matrix, currPos) {
    
    const row = currPos[0]
    const col = currPos[1]
    const directions = []

    // check UL 
    if (row > 1 && col !== 0) {
        directions.push({coords: [row-2, col-1], moveName: 'UL'})
    }
    // check UR  
    if (row > 1 && col !== matrix[row].length-1) {
        directions.push({coords: [row-2, col+1], moveName: 'UR'})
    }
    // check R 
    if (col < matrix[row].length - 2) {
        directions.push({coords: [row, col+2], moveName: 'R'})    
    }
    // check LR 
    if (row < matrix.length - 2 && col !== matrix[row].length-1) {
        directions.push({coords: [row+2, col+1], moveName: 'LR'})
    }
    // check LL
    if (row < matrix.length - 2 && col !== 0) {
        directions.push({coords: [row+2, col-1], moveName: 'LL'})
    }
    // check L
    if (col > 1) {
        directions.push({coords: [row, col-2], moveName: 'L'})
    }
    
    return directions
}

function buildMatrix(n) {
    const row = new Array(n) 
    const matrix = new Array(n)
    row.fill(0) 
    matrix.fill(row)
    return matrix
}

function main() {
    var n = parseInt(readLine());
    var i_start_temp = readLine().split(' ');
    var i_start = parseInt(i_start_temp[0]);
    var j_start = parseInt(i_start_temp[1]);
    var i_end = parseInt(i_start_temp[2]);
    var j_end = parseInt(i_start_temp[3]);
    printShortestPath(n, i_start, j_start, i_end, j_end);

}