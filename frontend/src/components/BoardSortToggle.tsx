import { useState } from "react";
import styled from "styled-components";
import { BoardCategory } from "../types/enum/board.category.enum";
import { boardCategoryState } from "../recoil/atom";
import { useSetRecoilState } from "recoil";

const BoardSortToggle = () => {
  const [buttonToggled, setbuttonToggled] = useState<number>(0);
  const setBoardCategory = useSetRecoilState<BoardCategory>(boardCategoryState);

  const handleToggle = (toggle: string) => {
    if (toggle === BoardCategory.DEFAULT) {
      setbuttonToggled(0);
      setBoardCategory(BoardCategory.DEFAULT);
    }
    if (toggle === BoardCategory.TRENDING) {
      setbuttonToggled(1);
      setBoardCategory(BoardCategory.TRENDING);
    }
    if (toggle === BoardCategory.FOLLOWING) {
      setbuttonToggled(2);
      setBoardCategory(BoardCategory.FOLLOWING);
    }
  };

  return (
    <BoardSortToggleWrapperStyled>
      <BoardSortToggleStyled $buttonToggled={buttonToggled}>
        <button onClick={() => handleToggle(BoardCategory.DEFAULT)}>
          기본순
        </button>
        <button onClick={() => handleToggle(BoardCategory.TRENDING)}>
          인기순
        </button>
        <button onClick={() => handleToggle(BoardCategory.FOLLOWING)}>
          팔로우순
        </button>
        <div />
      </BoardSortToggleStyled>
    </BoardSortToggleWrapperStyled>
  );
};

const BoardSortToggleWrapperStyled = styled.div`
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  position: absolute;
  margin-top: 2%;
  z-index: 1;
`;

const BoardSortToggleStyled = styled.div<{ $buttonToggled: number }>`
  position: relative;
  width: 195px;
  height: 30px;
  border-radius: 30px;
  background-color: var(--transparent);
  button {
    cursor: pointer;
    background-color: transparent;
    color: var(--white);
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
    transition: margin-left 0.3s ease-in-out;
    border-radius: 30px;
    background-color: var(--pink);
  }
`;

export default BoardSortToggle;
