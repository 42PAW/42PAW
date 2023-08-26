import { useState } from "react";
import useModal from "../../../hooks/useModal";
import { ModalType } from "../../../types/enum/modal.enum";
import styled from "styled-components";
import ProfileOption from "@/components/ProfileOption";
import { ProfileInfoDTO } from "@/types/dto/member.dto";
import { currentMemberIdState } from "@/recoil/atom";
import { useRecoilState } from "recoil";

// const CountInfo = ({ label, value }: { label: string; value: number }) => (
//   <li>
//     <div>{label}</div>
//     <span>{value}</span>
//   </li>
// );

const CountInfo = ({ userInfo }: { userInfo: ProfileInfoDTO }) => {
  return (
    <CountInfoStyled>
      <li>
        <div>게시물</div>
        <span>{userInfo.boardCount}</span>
      </li>
      <li>
        <div>팔로워</div>
        <span>{userInfo.followerCount}</span>
      </li>
      <li>
        <div>팔로잉</div>
        <span>{userInfo.followingCount}</span>
      </li>
    </CountInfoStyled>
  );
};

const UserInfoItems = ({ userInfo }: { userInfo: ProfileInfoDTO }) => {
  return (
    <UserInfoStyled>
      <div className="memberName">{userInfo.memberName}</div>
      <div className="intraName">{userInfo.intraName}</div>
      <div className="country">🇰🇷 {userInfo.country}</div>
    </UserInfoStyled>
  );
};

const ProfileInfoComponent: React.FC<{ userInfo: ProfileInfoDTO | null }> = ({
  userInfo,
}) => {
  //   const { openModal } = useModal();

  //   const handleOpenProfile = () => {
  //     openModal(ModalType.PROFILEEDIT); // PROFILECARD -> 바꿔야 돼 다시
  //   };
  const [currentMemberId] = useRecoilState<number | null>(currentMemberIdState);

  if (!userInfo) return <div>No user information available.</div>;
  return (
    <ProfileHeaderStyled>
      <img
        className="profileImage"
        alt="Profile image"
        src={userInfo.profileImageUrl}
      />
      <div className="content-wrapper">
        <UserInfoItems userInfo={userInfo} />
        <CaptionSectionStyled>{userInfo.statement}</CaptionSectionStyled>
        <CountInfo userInfo={userInfo} />
      </div>
      <BoardOptionButtonStyled>
        <ProfileOption
          memberId={currentMemberId}
          memberName={userInfo.memberName}
        />
        {/* ProfileOption 컴포넌트
        만들 것*/}
      </BoardOptionButtonStyled>
    </ProfileHeaderStyled>
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
    width: 160px;
    aspect-ratio: 1 / 1;

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
