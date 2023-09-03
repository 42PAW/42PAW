import { atom, useSetRecoilState, useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { Board } from "@/types/enum/board.category.enum";
import { boardCategoryState } from "@/recoil/atom";
import { languageState } from "@/recoil/atom";

export const buttonToggledState = atom<0 | 1 | 2>({
  key: "buttongToggled",
  default: 0,
});

const BoardSortToggle = () => {
  const [language] = useRecoilState<any>(languageState);
  const [buttonToggled, setbuttonToggled] = useRecoilState(buttonToggledState);
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

const waveAnimation = keyframes`
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`;

const BoardSortToggleWrapperStyled = styled.div`
  border-radius: 30px;
  position: absolute;
  margin-top: 2%;
  z-index: 1;
`;

const SortTabStyled = styled.div<{ $buttonToggled: number }>`
  margin-top: -30px;
  width: 33.3%;
  height: 100%;
  position: absolute;
  background: ${({ $buttonToggled }) =>
    $buttonToggled === 0
      ? "linear-gradient(270deg, var(--lightpurple), var(--lightpink))"
      : $buttonToggled === 1
      ? "linear-gradient(270deg, var(--lightpurple), var(--lightpink))"
      : "linear-gradient(270deg, var(--lightpurple), var(--lightpink))"};
  margin-left: ${({ $buttonToggled }) => $buttonToggled * 33.3}%;
  transition: all 0.3s ease-in-out;
  border-radius: 30px;
  background-size: 200% 200%;
  animation: ${waveAnimation} 2s ease infinite;
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
    padding: 0px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: transparent;
    color: var(--white);
    border-radius: 30px;
    border: none;
    width: 33.3%;
    min-width: 70px;
    font-size: 1rem;
  }
`;

export default BoardSortToggle;
