import { useState } from "react";
import useModal from "../../../hooks/useModal";
import { ModalType } from "../../../types/enum/modal.enum";
import styled from "styled-components";
import Button from "@/components/ButtonComponent";
import BoardOption from "@/components/BoardOption";

/* tmp */
const profileInfo = {
  memberName: "아롱오래비",
  intraName: "mingkang",
  nicknameUpdatedAt: "2023-01-23",
  profileImageUrl: "/src/assets/profileImage.jpg",
  country: "KOREA",
  statement: "아롱이의 오빠입니다. 잘 부탁 합니다.",
  followingCount: 23,
  followerCount: 42,
  boardCount: 47,
};

const CountInfoItems = () => {
  return (
    <CountInfoStyled>
      <CountInfo label="게시물" value={profileInfo.boardCount} />
      <CountInfo label="팔로워" value={profileInfo.followerCount} />
      <CountInfo label="팔로잉" value={profileInfo.followingCount} />
    </CountInfoStyled>
  );
};

const CountInfo = ({ label, value }: { label: string; value: number }) => (
  <li>
    <div>{label}</div>
    <span>{value}</span>
  </li>
);

const UserInfoItems = () => {
  return (
    <UserInfoStyled>
      <div className="memberName">{profileInfo.memberName}</div>
      <div className="intraName">{profileInfo.intraName}</div>
      <div className="country">🇰🇷 {profileInfo.country}</div>
    </UserInfoStyled>
  );
};

const UserInfoStyled = styled.div`
  margin-top: 10px;
  font-weight: 600;

  .memberName {
    font-size: 2rem;
  }
  .intraName {
    color: var(--lightgrey2);
    font-size: 1.4rem;
  }
  .country {
    color: var(--lightgrey2);
    font-size: 1.2rem;
  }
`;

const ProfileInfoComponent = () => {
  //   const { openModal } = useModal();

  //   const handleOpenProfile = () => {
  //     openModal(ModalType.PROFILEEDIT); // PROFILECARD -> 바꿔야 돼 다시
  //   };
  return (
    <ProfileHeaderStyled>
      <img
        className="profileImage"
        alt="Profile image"
        src={profileInfo.profileImageUrl}
      />
      <div className="content-wrapper">
        <UserInfoItems />
        <CaptionSectionStyled>{profileInfo.statement}</CaptionSectionStyled>
        <CountInfoItems />
      </div>
      {/* <img
        className="meatballsMenuIcon"
        alt="Meatballs menu icon"
        src="/src/assets/meatballsMenuIcon.png"
      /> */}
      <BoardOptionButtonStyled>
        <BoardOption boardId={0} memberName={""} />
      </BoardOptionButtonStyled>
      {/* <BoardOption boardId={boardId} memberName={memberName} /> */}
    </ProfileHeaderStyled>
  );
};

/* 게시물, 팔로워, 팔로잉 수 */
const CountInfoStyled = styled.ul`
  display: flex;
  width: 100%;
  padding: 0;
  margin: 0 0 30px 0;

  li {
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    width: calc(100% / 3);
    &:not(:last-child) {
      border-right: 1.2px solid var(--grey2); /* 원하는 선의 색상 설정 */
    }
  }

  span {
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

const BoardOptionButtonStyled = styled.div`
  position: absolute;
  top: 135px;
  right: 15px;
  width: 30px;
  &:focus {
    opacity: 0.6;
  }
`;

const ProfileHeaderStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  color: var(--white);
  width: 100%;
  min-height: 386px;
  //   filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  font-size: 1.6rem;

  @media (min-width: 1023px) {
    height: 386px;
  }

  background-image: url("/src/assets/profileFrame.png"); /* SVG 파일 경로 */
  background-size: contain;
  background-repeat: no-repeat;
  background-position-y: bottom;

  .content-wrapper {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .profileImage {
    width: 180px;
    filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.25));
    border-radius: 100%;
  }

  .meatballsMenuIcon {
    position: absolute;
    top: 135px;
    right: 15px;
    width: 30px;
  }
`;

const CaptionSectionStyled = styled.div`
  font-weight: 500;
`;

export default ProfileInfoComponent;
