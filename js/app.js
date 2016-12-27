var cellSize = 20;
var cols, rows;
var h = 840;
var w = 840;
var grid = [];
var currentCell;
var checked = [];
var size = null;

function setup() {
	createCanvas(w, h);
	cols = floor(w / cellSize);
	rows = floor(h / cellSize);

	background(100,100,100);
	for (var y = 0; y < floor(h / cellSize); y++) {
		for (var x = 0; x < floor(w / cellSize); x++) {
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
	currentCell.current = true;
	var next = currentCell.checkNeighbors();
	if (next) {
		next.visit = true;
		checked.push(currentCell);
		removeWalls(currentCell, next);
		currentCell = next;
	} else if (checked.length > 0) {
		currentCell = checked.pop();
	}
}

function index(x, y) {
	if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) {
		return -1;
	}
	return x + y * cols;
}

function removeWalls(a, b) {
	var x = a.i - b.i;
	console.log("x: " + x);
	if (x > 0) {
		a.Walls[3] = false;
		b.Walls[1] = false;
	} else if (x < 0) {
		a.Walls[1] = false;
		b.Walls[3] = false;
	}
	var y = a.j - b.j;
	if (y > 0) {
		a.Walls[0] = false;
		b.Walls[2] = false;
	} else if (y < 0) {
		a.Walls[2] = false;
		b.Walls[0] = false;
	}

}
