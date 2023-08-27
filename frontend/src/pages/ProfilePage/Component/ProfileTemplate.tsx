import { useState, useEffect, useRef } from "react";
import useModal from "../../../hooks/useModal";
import { ModalType } from "../../../types/enum/modal.enum";
import Button from "@/components/ButtonComponent";
import styled from "styled-components";
import ProfileInfoComponent from "@/pages/ProfilePage/Component/ProfileInfoComponent";
import PhotoZoneComponent from "@/pages/ProfilePage/Component/PhotoZoneComponent";
import { ProfileInfoDTO } from "@/types/dto/member.dto";
import { Board } from "@/types/enum/board.category.enum";
// import { BoardsInfoDTO } from "@/types/dto/board.dto";
import { IBoardInfo } from "@/types/interface/board.interface";

interface ProfileTemplateProps {
  userInfo: ProfileInfoDTO | null; // userInfo를 props로 받음
  boards: IBoardInfo[] | null;
  tabState?: Board;
  onTabChange?: (newTabState: Board) => void;
}

const ProfileTemplate: React.FC<ProfileTemplateProps> = ({
  userInfo,
  boards,
  tabState,
  onTabChange,
}) => {
  return (
    <ProfileWrapperStyled>
      <ProfileInfoComponent userInfo={userInfo} />
      {/* <TempStyled></TempStyled> */}
      <PhotoZoneComponent
        boards={boards}
        tabState={tabState}
        onTabChange={onTabChange}
      />
    </ProfileWrapperStyled>
  );
};

const TempStyled = styled.div`
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #ff5722; /* 도형의 색상을 변경할 수 있습니다 */
  position: absolute;

  &:before {
    content: "";
    width: 60px;
    height: 60px;
    background-color: #ff5722; /* 도형의 색상과 동일하게 설정 */
    position: absolute;
    bottom: -60px;
    left: -5px;
  }

  &:after {
    content: "";
    width: 20px;
    height: 20px;
    background-color: #ff5722; /* 도형의 색상과 동일하게 설정 */
    position: absolute;
    bottom: -30px;
    left: 30px;
  }
`;

const ProfileWrapperStyled = styled.div`
  //   margin-bottom: 3%;
  height: 100vh;
  width: calc(100% - 40px);
  margin: 0 auto;
  // @media (min-width: 1024px) {
  //   transform: translateX(-50px);
  // }
  min-width: 450px; /* 최소 폭 지정 */
  max-width: 552px; /* 최대 폭 지정 */
  //   box-shadow: var(--default-shadow);
  display: flex; /* Add flex display */
  flex-direction: column; /* Set flex direction to column */
  overflow-y: scroll;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  @media (max-width: 1023px) {
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }
`;

export default ProfileTemplate;
