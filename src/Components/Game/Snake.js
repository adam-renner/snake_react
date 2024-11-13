class Snake {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.positions = [[10, 10]];  // Initial snake position at 10, 10 (center of 20,20 size grid)
    // TODO: make initial position based on halfway point instead of specific position for easier changing of grid size
    this.direction = [0, 1];     // Defines initial movement but does this matter? Immediately overwritten in game.js
  }

  head() {
    return this.positions[0];
  }

  // Updates position of snake
  move() {
    const head = this.head();
    const newHead = [head[0] + this.direction[0], head[1] + this.direction[1]];
    
    if (this.isInsideBounds(newHead)) {
      this.positions.unshift(newHead);  // Adds new head to move "forward"
      this.positions.pop();             // Removes last segment (tail) to simulate "forward" movement
    }
  }

  // Check that position is within grid edges
  isInsideBounds(position) {
    return position[0] >= 0 && position[0] < this.width && position[1] >= 0 && position[1] < this.height;
  }

  grow() {
    console.log("Growing snake..."); // For debugging
    const head = this.head();
    const newHead = [head[0] + this.direction[0], head[1] + this.direction[1]]; // Create new head based on direction
    // TODO: remove line above (?) as it may be repeating logic
  }
  


  // Check if snake collides with itself or grid edges
  // TODO: is this working correctly?
  checkCollision() {
    const head = this.head();
    // Check for collisions
    console.log("Collision"); // For debugging
    return this.positions.slice(1).some(pos => pos[0] === head[0] && pos[1] === head[1]);
  }


  // Change snake direction
  // TODO: Need to review this section and potentially remove
  changeDirection(newDirection) {
    // Prevent snake from reversing
    // TODO: Not currently working
    if (
      (this.direction[0] === 0 && newDirection[0] !== 0) ||
      (this.direction[1] === 0 && newDirection[1] !== 0)
    ) {
      this.direction = newDirection;
    }
  }
}

export default Snake;
