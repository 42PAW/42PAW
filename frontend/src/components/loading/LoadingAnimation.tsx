import styled, { keyframes } from "styled-components";

const LoadingAnimation = () => {
  return <RainbowProgressBar />;
};

const rainbowAnimation = keyframes`
  0% { background-position: 0% 100%; }
  50% { background-position: 100% 200%; }
  100% { background-position: 0% 100%; }
`;

// Create the styled-component
const RainbowProgressBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(
    124deg,
    #ff2400,
    #e81d1d,
    #e8b71d,
    #e3e81d,
    #1de840,
    #1ddde8,
    #2b1de8,
    #dd00f3,
    #dd00f3
  );
  background-size: 900% 900%;
  animation: ${rainbowAnimation} 9s ease infinite;
`;

export default LoadingAnimation;
