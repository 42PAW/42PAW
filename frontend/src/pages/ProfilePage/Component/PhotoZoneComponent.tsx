import styled from "styled-components";
import { useState, useEffect } from "react";
import { IBoardInfo } from "@/types/interface/board.interface";
// import { BoardsInfoDTO } from "@/types/dto/board.dto";
import PostList from "./PostList";
import { useNavigate } from "react-router-dom";
import useNavigateCustom from "@/hooks/useNavigateCustom";
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
  const { moveToMain } = useNavigateCustom();

  return (
    <ProfileBodyStyled>
      {tabState && (
        <PhotoCategoryToggleStyled>
          <button onClick={() => onTabChange?.(Board.MINE)}>
            <img
              src={
                tabState === Board.MINE
                  ? "/src/assets/feedWB.png"
                  : "/src/assets/feedW.png"
              }
            />
          </button>
          <button onClick={() => onTabChange?.(Board.SCRAPPED)}>
            <img
              src={
                tabState === Board.SCRAPPED
                  ? "/src/assets/scrapWB.png"
                  : "/src/assets/scrapW.png"
              }
            />
          </button>
        </PhotoCategoryToggleStyled>
      )}
      <PhotoZoneWrapperStyled $hasTab={!!tabState}>
        <PostList posts={boards} onClickItem={moveToMain} />
      </PhotoZoneWrapperStyled>
    </ProfileBodyStyled>
  );
};

const ProfileBodyStyled = styled.div`
  flex: 1;
  //   overflow: hidden;
  margin-top: 30px;
  border-radius: 20px 20px 0px 0px;
  //   filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background: linear-gradient(75deg, #999bc6 50%, #d3c3ce 150%);
`;

const PhotoCategoryToggleStyled = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 50px;
  position: sticky;
  top: -10px;
  background: linear-gradient(100deg, #999bc6 50%, #d3c3ce 150%);
  border-radius: 10px 10px 0px 0px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    width: 50%;
    position: relative;
  }
  // button:not(:last-child)::before {
  //   content: "";
  //   position: absolute;
  //   right: 0;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   width: 1.5px;
  //   height: 30px;
  //   background-color: #ffffff;
  // }
  button:hover {
    background-color: #fdfdfd39;
  }
  img {
    margin-top: 5px;
    width: 25px;
  }
`;

const PhotoZoneWrapperStyled = styled.div<{ $hasTab: boolean }>`
  display: flex;
  flex-wrap: wrap;
  max-height: calc(100% - 50px);
  margin-top: ${({ $hasTab }) => ($hasTab ? "0" : "25px")};
  img {
    width: calc(33.3%);
    border-radius: 1%;
  }
  border: 1px;
`;

export default PhotoZoneComponent;
