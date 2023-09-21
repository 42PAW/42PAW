import styled, { keyframes } from "styled-components";

const SkeletonProfileTemplate = () => {
  return (
    <WrapperStyled>
      <InfoZoneStyled></InfoZoneStyled>
      <PhotoZoneStyled></PhotoZoneStyled>
    </WrapperStyled>
  );
};

const waveAnimation = keyframes`
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`;

const WrapperStyled = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  bottom: 0;
  height: 88%;
  width: 93%;
  @media (max-width: 1023px) {
    height: 100%;
    width: 100%;
  }
`;

const InfoZoneStyled = styled.div`
  height: 32%;
  width: 100%;
  border-radius: 20px;

  background: linear-gradient(270deg, var(--lightpurple), var(--lightpink));
  background-size: 200% 200%;
  animation: ${waveAnimation} 2s ease infinite;
  @media (max-width: 1023px) {
    width: 95%;
    height: 34%;
    margin-top: 15px;
  }
`;

const PhotoZoneStyled = styled.div`
  height: 63%;
  width: 100%;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  background: linear-gradient(270deg, var(--lightpurple), var(--lightpink));
  background-size: 200% 200%;
  animation: ${waveAnimation} 2s ease infinite;
  @media (max-width: 1023px) {
    width: 95%;
  }
`;

export default SkeletonProfileTemplate;
