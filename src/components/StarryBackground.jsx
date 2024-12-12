import React, { useEffect } from 'react';
import styled from 'styled-components';

const StarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const StarryBackground = () => {
  useEffect(() => {
    const container = document.querySelector('.star-container');
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      container.appendChild(star);
      
      setTimeout(() => {
        star.remove();
      }, 3000);
    };

    const interval = setInterval(() => {
      createStar();
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return <StarContainer className="star-container" />;
};

export default StarryBackground; 