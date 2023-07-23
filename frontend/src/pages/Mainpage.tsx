import styled from "styled-components";
import BoardTemplate from "../components/Board/BoardTemplate";
import LoadingCircleAnimation from "../components/loading/LoadingCircleAnimation";

const Mainpage = () => {
  return (
    <WrapperStyled>
      <BoardTemplate></BoardTemplate>
      <BoardTemplate></BoardTemplate>
      <BoardTemplate></BoardTemplate>
      <BoardTemplate></BoardTemplate>
      <BoardTemplate></BoardTemplate>
      <BoardTemplate></BoardTemplate>
      <BoardTemplate></BoardTemplate>
      <BoardTemplate></BoardTemplate>
      <BoardTemplate></BoardTemplate>
      <BoardTemplate></BoardTemplate>
      <LoadingCircleAnimation />
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

export default Mainpage;
