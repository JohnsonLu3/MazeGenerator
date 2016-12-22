var cellSize = 20;
var height = 500;
var width = 500;
var grid = [];
var currentCell;

function setup() {
    createCanvas(500, 500);
    background(25);
    for (var y = 0; y < floor(height / cellSize); y++) {
        for (var x = 0; x < floor(width / cellSize); x++) {
            var cell = new Cell(x, y);
            grid.push(cell);
        }
    }
    currentCell = grid[0];
}

function draw() {
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
    currentCell.visited = true;
}

function Cell(x, y) {
    var i = x * cellSize;
    var j = y * cellSize;
    this.Walls = [true, true, true, true]
    this.visited = false;
    
    this.show = function () {
        stroke(255, 255, 255);
        if (this.Walls[0] === true) {
            // top line
            line(i, j, i + cellSize, j);
        }
        if (this.Walls[1] === true) {
            // right line
            line(i + cellSize, j, i + cellSize, j + cellSize);
        }
        if (this.Walls[2] === true) {
            // bottom line
            line(i, j + cellSize, i + cellSize, j + cellSize);
        }
        if (this.Walls[3] === true) {
            // left line
            line(i, j, i, j + cellSize);
        }

        if(this.visited){
            //fill(93, 165, 78, 100); head color
            fill(153, 72, 125, 100);
            rect(i, j, cellSize, cellSize);
        }
    }
}
