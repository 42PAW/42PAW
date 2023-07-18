import styled from "styled-components";

const BoardSortToggle = () => {
  return (
    <BoardSortToggleStyled>
      <button>기본순</button>
      <button>인기순</button>
      <button>팔로우순</button>
    </BoardSortToggleStyled>
  );
};

const BoardSortToggleStyled = styled.div`
  position: absolute;
  width: 12%;
  height: 3%;
  min-width: 195px;
  min-height: 25px;
  margin-top: 0.5%;
  border-radius: 30px;
  background-color: var(--transparent);
  button:nth-child(1) {
    background-color: var(--pink);
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

export default BoardSortToggle;
