import styled from "styled-components";
import { IBoardInfo } from "@/types/interface/board.interface";
import PostList from "./PostList";
import { Board } from "@/types/enum/board.category.enum";

interface PhotoZoneComponentProps {
  boards: IBoardInfo[] | null;
  tabState?: Board;
  onTabChange?: (newTabState: Board) => void;
}

const PhotoZoneComponent: React.FC<PhotoZoneComponentProps> = ({
  boards,
  tabState,
  onTabChange,
}) => {
  return (
    <ProfileBodyStyled>
      {tabState && (
        <PhotoCategoryToggleStyled>
          <button onClick={() => onTabChange?.(Board.MINE)}>
            <img
              src={
                tabState === Board.MINE
                  ? "/assets/feedWB.png"
                  : "/assets/feedW.png"
              }
            />
          </button>
          <button onClick={() => onTabChange?.(Board.SCRAPPED)}>
            <img
              src={
                tabState === Board.SCRAPPED
                  ? "/assets/scrapWB.png"
                  : "/assets/scrapW.png"
              }
            />
          </button>
        </PhotoCategoryToggleStyled>
      )}
      <PhotoZoneWrapperStyled $hasTab={!!tabState}>
        <PostList posts={boards as IBoardInfo[]} />
      </PhotoZoneWrapperStyled>
    </ProfileBodyStyled>
  );
};

const ProfileBodyStyled = styled.div`
  flex: 1;
  width: 100%;
  margin-top: 30px;
  border-radius: 10px 10px 0px 0px;
  background: linear-gradient(75deg, #999bc6 50%, #d3c3ce 150%);
`;

const PhotoCategoryToggleStyled = styled.div`
  z-index: 1;
  display: flex;
  justify-content: space-evenly;
  height: 50px;
  position: sticky;
  top: 0px;
  background: linear-gradient(100deg, #999bc6 50%, #d3c3ce 150%);

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    width: 50%;
    position: relative;
    transition: all 0.3s ease;
  }

  button:hover {
    background-color: #fdfdfd39;
  }
  img {
    width: 16px;
  }
`;

const PhotoZoneWrapperStyled = styled.div<{ $hasTab: boolean }>`
  max-height: calc(100% - 50px);
  margin-top: ${({ $hasTab }) => ($hasTab ? "0" : "25px")};
  border: 1px;
`;

export default PhotoZoneComponent;
