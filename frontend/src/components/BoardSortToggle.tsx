import { useState } from "react";
import styled from "styled-components";

const BoardSortToggle = () => {
  const [buttonToggled, setbuttonToggled] = useState<number>(0);

  const handleToggle = (toggle: string) => {
    if (toggle === "default") setbuttonToggled(0);
    if (toggle === "hot") setbuttonToggled(1);
    if (toggle === "follow") setbuttonToggled(2);
  };

  return (
    <BoardSortToggleWrapperStyled>
      <BoardSortToggleStyled $buttonToggled={buttonToggled}>
        <button onClick={() => handleToggle("default")}>기본순</button>
        <button onClick={() => handleToggle("hot")}>인기순</button>
        <button onClick={() => handleToggle("follow")}>팔로우순</button>
        <div />
      </BoardSortToggleStyled>
    </BoardSortToggleWrapperStyled>
  );
};

const BoardSortToggleWrapperStyled = styled.div`
  margin-top: 2%;
  position: absolute;
`;

const BoardSortToggleStyled = styled.div<{ $buttonToggled: number }>`
  position: relative;
  width: 195px;
  height: 30px;
  border-radius: 30px;
  background-color: var(--transparent);
  button {
    background-color: transparent;
    color: #ffffff;
    border-radius: 30px;
    border: none;
    height: 100%;
    width: 33.3%;
    font-size: 30%;
  }
  div {
    height: 30px;
    width: 65px;
    margin-top: -30px;
    margin-left: ${({ $buttonToggled }) => $buttonToggled * 65}px;
    transition: margin-left 0.5s ease-in-out;
    border-radius: 30px;
    background-color: var(--pink);
  }
`;

export default BoardSortToggle;
