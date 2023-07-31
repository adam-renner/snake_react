// import React from 'react';

// const Snake = (props) => {
//   // Define the snake properties and rendering logic

//   return (
//     <div>
//       {/* Render the snake segments */}
//     </div>
//   );
// };

// export default Snake;

const boardSize = 15;
const cellSize = 20;
const board = document.getElementById('game-board');
board.style.gridTemplateRows = `repeat(${boardSize}, ${cellSize}px)`;
board.style.gridTemplateColumns = `repeat(${boardSize}, ${cellSize}px)`;

let snake = [{ x: 5, y: 5 }];
let food = { x: 10, y: 10 };
let direction = { x: 0, y: 0 };

function update() {
  const head = { ...snake[0] };
  head.x += direction.x;
  head.y += direction.y;

  // Check collision with food
  if (head.x === food.x && head.y === food.y) {
    food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
  } else {
    snake.pop();
  }

  snake.unshift(head);

  // Check collision with walls or self
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= boardSize || head.y >= boardSize ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    snake = [{ x: 5, y: 5 }];
    direction = { x: 0, y: 0 };
  }
}

function draw() {
  // Clear the board
  board.innerHTML = '';

  // Draw the snake
  snake.forEach(segment => {
    const snakeSegment = document.createElement('div');
    snakeSegment.style.left = `${segment.x * cellSize}px`;
    snakeSegment.style.top = `${segment.y * cellSize}px`;
    snakeSegment.classList.add('snake');
    board.appendChild(snakeSegment);
  });

  // Draw the food
  const foodElement = document.createElement('div');
  foodElement.style.left = `${food.x * cellSize}px`;
  foodElement.style.top = `${food.y * cellSize}px`;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
}

function handleKeyPress(e) {
  switch (e.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
}

window.addEventListener('keydown', handleKeyPress);

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 150);
}

gameLoop();
