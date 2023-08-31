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
  z-index: 10;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 110vw;
  height: 4px;
  background: linear-gradient(
    124deg,
    #7951c9,
    #d1c1cd,
    #e6dade,
    #7951c9,
    #d1c1cd,
    #e6dade
  );
  background-size: 900% 900%;
  animation: ${rainbowAnimation} 8s ease infinite;
`;

export default LoadingAnimation;
