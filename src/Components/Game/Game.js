import React, { useState, useEffect, useCallback } from 'react';
import Grid from './Grid';
import Snake from './Snake';
import Pellet from './Pellet';

const Game = () => {
  // width and height define game grid area
  const width = 20;
  const height = 20;
  const [grid] = useState(new Grid(width, height));
  const [snake, setSnake] = useState(new Snake(width, height));
  const [pellet, setPellet] = useState(new Pellet(width, height, snake.positions));
  const [direction, setDirection] = useState([0, 0]);  // Initial direction state required

  // Handler for direction input by user via arrow keys
  const handleKeyPress = (event) => {
    const key = event.key;
    if (key === 'ArrowUp' && direction[1] !== 1) setDirection([0, -1]);
    if (key === 'ArrowDown' && direction[1] !== -1) setDirection([0, 1]);
    if (key === 'ArrowLeft' && direction[0] !== 1) setDirection([-1, 0]);
    if (key === 'ArrowRight' && direction[0] !== -1) setDirection([1, 0]);
  };

  // define Snake and movement
  const moveSnake = useCallback(() => {
    const head = snake.head();
    const newHeadPosition = [head[0] + direction[0], head[1] + direction[1]];
  
    // Check if snake hits outside corners of grid
    if (
      newHeadPosition[0] < 0 || newHeadPosition[0] >= width ||
      newHeadPosition[1] < 0 || newHeadPosition[1] >= height
    ) {
      // console.error("Snake hit the wall"); // Don't need this as an error right now
      return;  // Todo: Game over?
    }
    // console.log("Snake positions before pellet:", snake.positions); // Use for debug of movement
    let pelletEaten = false; // Reset pellet flag
    // Check if snake has eaten pellet
    if (pellet.checkCollision(newHeadPosition)) {
      // If the snake head collides with a pellet, grow the snake
      // console.log("Snake positions pellet collision:", snake.positions);
      snake.grow();  // This should only add one segment
      // console.log("Snake positions after snake.grow:", snake.positions);
      const newPellet = new Pellet(width, height, snake.positions); // Create a new pellet
      // console.log("Snake positions after const newPellet:", snake.positions);
      newPellet.move(snake.positions); // Move new pellet to a new location
      // console.log("Snake positions after newPellet.move:", snake.positions);
      setPellet(newPellet);  // Update pellet state
      // console.log("Snake positions after setPellet:", snake.positions);
      pelletEaten = true; // Flag the pellet as eaten
    }
    // console.log("Snake positions after pellet:", snake.positions);
    // Update game grid to clear snake segment (tail) if not eating a pellet
    // Todo: is this logic intuitive...? Maybe change in future
    const tail = snake.positions[snake.positions.length - 1];
    if (!pelletEaten) {
      grid.updateCell(tail[0], tail[1], null); // Removes tail
    }
  
    // Update new head position for snake
    grid.updateCell(newHeadPosition[0], newHeadPosition[1], "S");
  
    // Update snake array to change position, grows new segment if pellet has been eaten
    const newPositions = pelletEaten 
      ? [newHeadPosition, ...snake.positions] // Movement and grow new segment
      : [newHeadPosition, ...snake.positions.slice(0, -1)]; // Normal movement without growth
  
    // Create new Snake object with updated positions
    const newSnake = new Snake(width, height);
    newSnake.positions = newPositions;
  
    // Update snake state
    setSnake(newSnake); // Triggers state update
  }, [direction, pellet, snake, width, height, grid]);
  
  const renderGrid = () => {
    const newGrid = Array(height).fill().map(() => Array(width).fill(null));

    // Update grid with snake segment positions
    snake.positions.forEach(([x, y]) => {
      if (x >= 0 && x < width && y >= 0 && y < height) {
        newGrid[y][x] = "S";
      } else {
        console.error("Invalid snake position:", x, y); // throw error if something goes wrong
      }
    });

    // Update grid with pellet position
    const [pelletX, pelletY] = pellet.position;
    if (pelletX >= 0 && pelletX < width && pelletY >= 0 && pelletY < height) {
      newGrid[pelletY][pelletX] = "P";
    } else {
      console.error("Invalid pellet position:", pelletX, pelletY); // throw error if something goes wrong
    }

    return newGrid;
  };

  // Listen for arrow key input by user
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 100); // Speed of snake movement
    return () => clearInterval(interval);
  }, [moveSnake]);


  // Styling
  return (
    <div>
      <h1>Snake Game</h1>
      <div className="grid">
        {renderGrid().map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              // Styling for each grid cell
              <div
                key={colIndex}
                className={`cell ${cell === "S" ? "snake" : cell === "P" ? "pellet" : ""}`}
                style={{
                  width: "20px",
                  height: "20px",
                //  border: "1px solid #ccc", // Creates border around each cell
                  display: "inline-block",
                  backgroundColor: cell === "S" ? "green" : cell === "P" ? "red" : "white",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
