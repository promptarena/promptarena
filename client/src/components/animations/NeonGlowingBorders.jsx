import React from 'react';
import styled from 'styled-components';

const NeonGlowingBorders = () => {
  return (
    <StyledWrapper>
      <div className="container">
        {Array.from({ length: 21 }, (_, i) => (
          <div className="item" style={{ '--i': i }} key={i} />
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    position: absolute;
    top: 40%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item {
    position: absolute;
    background-color: transparent;
    width: calc(var(--i) * 2.5vmin);
    aspect-ratio: 1;
    border-radius: 50%;
    border: 0.9vmin solid rgb(0, 200, 255);
    transform-style: preserve-3d;
    transform: rotateX(70deg) translateZ(50px);
    animation: my-move 3s ease-in-out calc(var(--i) * 0.08s) infinite;
    box-shadow:
      0px 0px 15px rgb(124, 124, 124),
      inset 0px 0px 15px rgb(124, 124, 124);
  }

  @keyframes my-move {
    0%,
    100% {
      transform: rotateX(70deg) translateZ(50px) translateY(0px);
      filter: hue-rotate(0deg);
    }

    50% {
      transform: rotateX(70deg) translateZ(50px) translateY(-50vmin);
      filter: hue-rotate(180deg);
    }
  }
`;

export default NeonGlowingBorders;
