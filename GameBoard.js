import React, { useState, useEffect } from 'react';
import Snake from './Snake';
import Pellet from './Pellet';

const GameBoard = () => {
  // Define your state and logic here

  return (
    <div>
      <Snake />
      <Pellet />
    </div>
  );
};

export default GameBoard;
