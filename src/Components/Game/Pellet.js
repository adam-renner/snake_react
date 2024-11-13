class Pellet {
  constructor(width, height, snakeBody) {
    this.width = width;
    this.height = height;
    this.snakeBody = snakeBody; // Snake body segment positions, i.e. [[10, 10], [10, 11]]
    this.position = this.getRandomPosition();
  }

  // Randomly generates placement of pellet
  getRandomPosition() {
    let position;
    do {
      position = [
        Math.floor(Math.random() * this.width),
        Math.floor(Math.random() * this.height),
      ];
    } while (this.snakeBody.some(([x, y]) => x === position[0] && y === position[1])); // Do not generate in position occupied by snake
    return position;
  }

  move(snakeBody) {
    this.snakeBody = snakeBody;
    this.position = this.getRandomPosition();
  }

  // Check if pellet collides with snake head
  checkCollision(snakeHead) {
    return this.position[0] === snakeHead[0] && this.position[1] === snakeHead[1];
  }
}


export default Pellet;
