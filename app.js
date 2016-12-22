var cellSize = 20;
var height = 500;
var width = 500;
var grid = [];

function setup() {
    createCanvas(500, 500);
    background(51);
    for (var y = 0; y < floor(height / cellSize); y++) {
        for (var x = 0; x < floor(width / cellSize); x++) {
            var cell = new Cell(x, y);
            grid.push(cell);
        }
    }
}

function draw() {
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}

function Cell(x, y) {
    var i = x * cellSize;
    var j = y * cellSize;
    
    this.show = function () {
        stroke(255,255,255);
        // top line
        line(i, j, i + cellSize, j);
        // right line
        line(i + cellSize, j, i + cellSize, j + cellSize);
        // bottom line
        line(i, j + cellSize, i + cellSize, j + cellSize);
        // left line
        line(i, j, i, j + cellSize);
    }
}