"use client"
import React, { useState } from 'react';

const DraggableMenuBar = () => {
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);

  const handleToggleButtonClick = () => {
    setIsMenuBarOpen(!isMenuBarOpen);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffsetX(e.clientX - parseInt(document.getElementById('menuBar').style.right));
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newRight = e.clientX - offsetX;
      document.getElementById('menuBar').style.right = `${newRight}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div>
      <div className="menu-bar" id="menuBar">
        <p>This is your menu content</p>
      </div>

      <div
        className="toggle-button"
        id="toggleButton"
        onClick={handleToggleButtonClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></div>
    </div>
  );
};

export default DraggableMenuBar;
