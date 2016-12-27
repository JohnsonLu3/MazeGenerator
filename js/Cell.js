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
