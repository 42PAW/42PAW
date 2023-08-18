import { useState, useEffect, useRef } from "react";
import useModal from "../../../hooks/useModal";
import { ModalType } from "../../../types/enum/modal.enum";
import Button from "@/components/ButtonComponent";
import styled from "styled-components";
import ProfileInfoComponent from "@/pages/ProfilePage/Component/ProfileInfoComponent";
import PhotoZoneComponent from "@/pages/ProfilePage/Component/PhotoZoneComponent";
import { ProfileInfoDTO } from "@/types/dto/member.dto";

interface ProfileTemplateProps {
  userInfo: ProfileInfoDTO | null; // userInfo를 props로 받음
}

const ProfileTemplate: React.FC<ProfileTemplateProps> = ({ userInfo }) => {
  return (
    <ProfileWrapperStyled>
      <ProfileInfoComponent userInfo={userInfo} />
      <PhotoZoneComponent />
    </ProfileWrapperStyled>
  );
};

const ProfileWrapperStyled = styled.div`
  //   margin-bottom: 3%;
  height: 100vh;
  width: calc(100% - 40px);
  margin: 0 auto;
  min-width: 500px; /* 최소 폭 지정 */
  max-width: 552px; /* 최대 폭 지정 */
  //   box-shadow: var(--default-shadow);
  display: flex; /* Add flex display */
  flex-direction: column; /* Set flex direction to column */
  overflow-y: scroll;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export default ProfileTemplate;
