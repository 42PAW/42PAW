import styled, { keyframes } from "styled-components";

const LoadingCircleAnimation = () => {
  return (
    <LoadingCircleAnimationStyled>
      <CircularLoader viewBox="25 25 50 50">
        <LoaderPath cx="50" cy="50" r="20" />
      </CircularLoader>
    </LoadingCircleAnimationStyled>
  );
};

const LoadingCircleAnimationStyled = styled.div`
  position: absolute;
  top: 50%;
  width: 50px;
  height: 50px;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;

const circularLoaderAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const CircularLoader = styled.svg`
  animation: ${circularLoaderAnimation} 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: auto;
`;

const loaderPathAnimation = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
`;

const colorAnimation = keyframes`
  0% {
    stroke: var(--transparent2);
  }
  40% {
    stroke: var(--transparent2);
  }
  66% {
    stroke: var(--transparent2);
  }
  80%,
  90% {
    stroke: var(--transparent2);
  }
`;

const LoaderPath = styled.circle`
  stroke-dasharray: 150, 200;
  stroke-dashoffset: -10;
  animation: ${loaderPathAnimation} 1.5s ease-in-out infinite,
    ${colorAnimation} 6s ease-in-out infinite;
  stroke-linecap: round;
  fill: none;
  stroke-width: 2;
  stroke: var(--transparent2);
`;

export default LoadingCircleAnimation;
