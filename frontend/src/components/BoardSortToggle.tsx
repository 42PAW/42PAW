import { useState } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import styled from "styled-components";
import { Board } from "@/types/enum/board.category.enum";
import { boardCategoryState } from "@/recoil/atom";
import { languageState } from "@/recoil/atom";

const BoardSortToggle = () => {
  const [language] = useRecoilState<any>(languageState);
  const [buttonToggled, setbuttonToggled] = useState<number>(0);
  const setBoard = useSetRecoilState<Board>(boardCategoryState);

  const handleToggle = (toggle: string) => {
    if (toggle === Board.DEFAULT) {
      setbuttonToggled(0);
      setBoard(Board.DEFAULT);
    }
    if (toggle === Board.TRENDING) {
      setbuttonToggled(1);
      setBoard(Board.TRENDING);
    }
    if (toggle === Board.FOLLOWING) {
      setbuttonToggled(2);
      setBoard(Board.FOLLOWING);
    }
  };

  return (
    <BoardSortToggleWrapperStyled>
      <BoardSortToggleStyled $buttonToggled={buttonToggled}>
        <button onClick={() => handleToggle(Board.DEFAULT)}>
          {language.defaultBoards}
        </button>
        <button onClick={() => handleToggle(Board.TRENDING)}>
          {language.trendingBoards}
        </button>
        <button onClick={() => handleToggle(Board.FOLLOWING)}>
          {language.followingBoards}
        </button>
      </BoardSortToggleStyled>
      <SortTabStyled $buttonToggled={buttonToggled} />
    </BoardSortToggleWrapperStyled>
  );
};

const BoardSortToggleWrapperStyled = styled.div`
  border-radius: 30px;
  position: absolute;
  margin-top: 2%;
  z-index: 1;
  width: 255px;
`;

const SortTabStyled = styled.div<{ $buttonToggled: number }>`
  margin-top: -30px;
  width: 33.3%;
  height: 100%;
  position: absolute;
  margin-left: ${({ $buttonToggled }) => $buttonToggled * 85}px;
  transition: margin-left 0.3s ease-in-out;
  border-radius: 30px;
  background-color: var(--lightpurple);
`;

const BoardSortToggleStyled = styled.div<{ $buttonToggled: number }>`
  display: flex;
  justify-content: space-around;
  position: relative;
  width: 100%;
  height: 30px;
  border-radius: 30px;
  background-color: var(--transparent);
  button {
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: transparent;
    color: var(--white);
    border-radius: 30px;
    border: none;
    width: 33.3%;
    font-size: 1rem;
  }
`;

export default BoardSortToggle;
