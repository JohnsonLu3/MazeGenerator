var cellSize = 20;
var cols, rows;
var height = 500;
var width = 500;
var grid = [];
var currentCell;
var checked = [];

function setup() {
	createCanvas(500, 500);
	cols = floor(width / cellSize);
	rows = floor(height / cellSize);

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
	if(y > 0){
		a.Walls[0] = false;
		b.Walls[2] = false;
	}else if(y < 0){
		a.Walls[2] = false;
		b.Walls[0] = false;
	}

}

function Cell(x, y) {
	this.i = x * cellSize;
	this.j = y * cellSize;
	this.Walls = [true, true, true, true];
	this.visited = false;
	this.current = false;

	this.show = function () {
		stroke(255, 255, 255);
		if (this.Walls[0] === true) {
			// top line
			line(this.i, this.j, this.i + cellSize, this.j);
		}
		if (this.Walls[1] === true) {
			// right line
			line(this.i + cellSize, this.j, this.i + cellSize, this.j + cellSize);
		}
		if (this.Walls[2] === true) {
			// bottom line
			line(this.i, this.j + cellSize, this.i + cellSize, this.j + cellSize);
		}
		if (this.Walls[3] === true) {
			// left line
			line(this.i, this.j, this.i, this.j + cellSize);
		}

		if (this.current) {
			noStroke();
			fill(85, 170, 85, 255);
			rect(this.i, this.j, cellSize, cellSize);
		}

		if (this.visited) {
			noStroke();
			fill(20, 48, 84, 100);
			rect(this.i, this.j, cellSize, cellSize);
			this.current = false;
		}
	}

	this.checkNeighbors = function () {
		var Neighbors = [];

		var top = grid[index(x, y - 1)];
		var right = grid[index(x + 1, y)];
		var bottom = grid[index(x, y + 1)];
		var left = grid[index(x - 1, y)];

		if (top && !top.visited) {
			Neighbors.push(top);
		}
		if (right && !right.visited) {
			Neighbors.push(right);
		}
		if (bottom && !bottom.visited) {
			Neighbors.push(bottom);
		}
		if (left && !left.visited) {
			Neighbors.push(left);
		}
		if (Neighbors.length > 0) {
			return random(Neighbors);
		} else {
			return undefined;
		}
	}
}
