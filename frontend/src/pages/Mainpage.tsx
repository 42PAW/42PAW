import styled from "styled-components";
import BoardTemplate from "../components/BoardTemplate";

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
