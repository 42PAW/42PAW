import styled from "styled-components";
import BoardTemplate from "../components/BoardTemplate";

const Mainpage = () => {
  return (
    <WrapperStyled>
      <SortButtonContainerStyled>
        <button>기본순</button>
        <button>인기순</button>
        <button>팔로우순</button>
      </SortButtonContainerStyled>
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
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const SortButtonContainerStyled = styled.div`
  margin-top: 0.5%;
  position: absolute;
  background-color: #fdfdfd39;
  border-radius: 30px;
  width: 12%;
  height: 3%;
  min-width: 195px;
  min-height: 25px;
  button:nth-child(1) {
    background-color: #d1c1cd;
  }
  button {
    background-color: transparent;
    color: #ffffff;
    border-radius: 30px;
    border: none;
    height: 100%;
    width: 33.3%;
    font-size: 30%;
  }
`;

export default Mainpage;
