import { styled } from "styled-components";

const LoadingPage = () => {
  return (
    <WrapperStyled>
      <img src="/assets/paw.png" />
      <div>🅒 2023. 42PAW. all rights reserved.</div>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  position: absolute;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background: linear-gradient(
    210deg,
    #878abe 30%,
    #d1c1cd 78.34%,
    #e6dade 86.75%
  );
  background-repeat: no-repeat;
  img {
    width: 90px;
    aspect-ratio: 1 / 1;
  }
  div {
    position: absolute;
    bottom: 30px;
    font-size: 1.2rem;
    color: var(--white);
    font-family: "Lexend", sans-serif;
  }
`;

export default LoadingPage;
