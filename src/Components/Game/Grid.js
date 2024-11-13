// Create array for a grid to be used for generating components
export default class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => null)
    );
  }

  updateCell(x, y, value) {
    if (y >= 0 && y < this.height && x >= 0 && x < this.width) {
      this.cells[y][x] = value;
    } else {
      console.error("Tried to update out-of-bounds cell:", x, y);
    }
  }
  

  renderGrid() {
    this.cells.forEach((row) => {
      console.log(row.map(cell => (cell ? cell : '.')).join(' '));
    });
  }
}
