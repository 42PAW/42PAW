import styled from "styled-components";
import { useState, useEffect } from "react";
import { IBoardInfo } from "@/types/interface/board.interface";
// import { BoardsInfoDTO } from "@/types/dto/board.dto";
import PostList from "./PostList";
import { useNavigate } from "react-router-dom";
import useNavigateCustom from "@/hooks/useNavigateCustom";

const imgs = [
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
];

const imgs2 = [
  "/src/assets/userG.png",
  "/src/assets/userG.png",
  "/src/assets/userG.png",
  "/src/assets/userG.png",
  "/src/assets/userG.png",
  "/src/assets/userG.png",
  "/src/assets/userG.png",
  "/src/assets/userG.png",
  "/src/assets/userG.png",
  "/src/assets/userG.png",
  "/src/assets/userG.png",
  "/src/assets/userG.png",
  "/src/assets/userG.png",
  "/src/assets/userG.png",
  "/src/assets/userG.png",
  "/src/assets/userG.png",
];

const PhotoZoneComponent: React.FC<{ boards: IBoardInfo[] | null }> = ({
  boards,
}) => {
  //   const [nowActivatedTabValue, setNowActivatedTabValue] = useState("firstBtn");
  const [activeTab, setActiveTab] = useState("myPosts");
  const { moveToMain } = useNavigateCustom();

  //   // 게시물 정보를 가져오는 함수
  //   const fetchPosts = (tab) => {
  //     // 게시물 정보를 가져오는 비동기 요청 등을 수행
  //     // 결과를 setPosts로 업데이트
  //   };
  // 탭 변경 시 호출되는 함수
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // fetchPosts(tab);
  };

  return (
    <ProfileBodyStyled>
      <PhotoCategoryToggleStyled>
        <button onClick={() => handleTabChange("myPosts")}>
          <img
            src={
              activeTab === "myPosts"
                ? "/src/assets/feedWB.png"
                : "/src/assets/feedW.png"
            }
          />
        </button>
        <button onClick={() => handleTabChange("scrapPosts")}>
          <img
            src={
              activeTab === "scrapPosts"
                ? "/src/assets/scrapWB.png"
                : "/src/assets/scrapW.png"
            }
          />
        </button>
      </PhotoCategoryToggleStyled>
      <PhotoZoneWrapperStyled>
        <PostList posts={boards} onClickItem={moveToMain} />
        {/* {activeTab === "myPosts" &&
          imgs.map((prop, index) => <img key={index} src={prop} />)}
        {activeTab === "scrapPosts" &&
          imgs2.map((prop, index) => <img key={index} src={prop} />)} */}
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

const PhotoZoneWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: calc(100% - 50px);
  img {
    width: calc(33.3%);
    border-radius: 1%;
  }
  border: 1px;
  // &::before {
  //   content: ""; /* 가상 요소 내용 없음 */
  //   position: absolute; /* 절대 위치 설정 */
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  // }
`;

export default PhotoZoneComponent;
