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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SortButtonContainerStyled = styled.div`
  margin-top: 0.5%;
  position: absolute;
  background-color: #fdfdfd39;
  border-radius: 30px;
  width: 10%;
  height: 3%;
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
  }
`;

export default Mainpage;
