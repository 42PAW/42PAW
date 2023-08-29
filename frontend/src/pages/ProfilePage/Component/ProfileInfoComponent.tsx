import { useState } from "react";
import useModal from "../../../hooks/useModal";
import { ModalType } from "../../../types/enum/modal.enum";
import styled from "styled-components";
import ProfileOption from "@/components/OptionButton/ProfileOption";
import { ProfileInfoDTO } from "@/types/dto/member.dto";
import { currentMemberIdState } from "@/recoil/atom";
import { useRecoilState } from "recoil";
import { useCountryEmoji } from "@/hooks/useCountryEmoji";
import { Country } from "@/types/enum/country.enum";

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
  const countryEmoji = useCountryEmoji(userInfo.country as Country);

  return (
    <UserInfoStyled>
      <div className="memberName">{userInfo.memberName}</div>
      <div className="intraName">{userInfo.intraName}</div>
      <div className="country">
        {countryEmoji} {userInfo.campus}
      </div>
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
    font-size: 1.6rem;
  }
  .intraName {
    color: var(--transparent2);
    font-size: 1.3rem;
    transition: all 0.5s ease;
    &:hover {
      color: var(--white);
    }
  }
  .country {
    color: var(--white);
    font-size: 1rem;
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
      border-right: 1.2px solid var(--transparent); /* 원하는 선의 색상 설정 */
    }
  }

  span {
    font-size: 1.2rem;
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

  background-image: url("/src/assets/intersect.png");
  background-size: 100% 320px;
  background-repeat: no-repeat;
  background-position-y: bottom;

  .content-wrapper {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }

  .profileImage {
    width: 160px;
    aspect-ratio: 1 / 1;
    background-color: var(--grey); /* 이미지가 없을 때 배경 색상 */
    filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.25));
    border-radius: 50%;
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
  font-size: 1.3rem;
`;

export default ProfileInfoComponent;
