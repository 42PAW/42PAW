import styled, { keyframes } from "styled-components";

const LoadingAnimation = () => {
  return <LoadingAnimationStyled />;
};

const rainbowAnimation = keyframes`
  0% { background-position: 0% 100%; }
  50% { background-position: 100% 200%; }
  100% { background-position: 0% 100%; }
`;

// Create the styled-component
const LoadingAnimationStyled = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(
    124deg,
    #3b1784,
    #d1c1cd,
    #e6dade,
    #3b1784,
    #d1c1cd,
    #e6dade
  );
  background-size: 900% 900%;
  animation: ${rainbowAnimation} 9s ease infinite;
`;

export default LoadingAnimation;
