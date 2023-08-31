import { memo, useState } from "react";
import useModal from "../../../hooks/useModal";
import { ModalType } from "../../../types/enum/modal.enum";
import styled from "styled-components";
import ProfileOption from "@/components/OptionButton/ProfileOption";
import { ProfileInfoDTO } from "@/types/dto/member.dto";
import { currentMemberIdState } from "@/recoil/atom";
import { useRecoilState } from "recoil";
import { useCountryEmoji } from "@/hooks/useCountryEmoji";
import { Country } from "@/types/enum/country.enum";
import useRightSectionHandler from "@/hooks/useRightSectionHandler";
import { useQueryClient } from "@tanstack/react-query";

// const CountInfo = ({ label, value }: { label: string; value: number }) => (
//   <li>
//     <div>{label}</div>
//     <span>{value}</span>
//   </li>
// );

const CountInfo = ({ userInfo }: { userInfo: ProfileInfoDTO }) => {
  const { openFollowerSection, openFollowingSection } =
    useRightSectionHandler();
  const handleFollowerClick = () => {
    openFollowerSection();
  };

  const handleFollowingClick = () => {
    // 팔로잉을 클릭했을 때 수행할 작업
    openFollowingSection();
    // console.log("팔로잉을 클릭했습니다.");
    // 원하는 작업을 여기에 추가하세요
  };

  return (
    <CountInfoStyled>
      <li>
        <div>게시물</div>
        <span>{userInfo.boardCount}</span>
      </li>
      <li onClick={handleFollowerClick}>
        <div>팔로워</div>
        <span>{userInfo.followerCount}</span>
      </li>
      <li onClick={handleFollowingClick}>
        <div>팔로잉</div>
        <span>{userInfo.followingCount}</span>
      </li>
    </CountInfoStyled>
  );
};

const CountInfoCover = styled.div`
  position: absolute;
  top: 0;
  left: 33.33%; /* 팔로워 영역의 시작 위치 */
  width: 33.33%; /* 팔로워 영역의 너비 */
  height: 100%;
  cursor: pointer;
  z-index: 1;
`;

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

const ProfileInfoComponent: React.FC<{
  userInfo: ProfileInfoDTO | null;
  memberId: number;
}> = ({ userInfo, memberId }) => {
  const queryClient = useQueryClient();

  if (!userInfo) return <div>No user information available.</div>;
  return (
    <ProfileHeaderStyled>
      <img
        className="profileImage"
        alt="Profile image"
        src={userInfo.profileImageUrl || "/src/assets/userW.png"}
      />
      <div className="content-wrapper">
        <UserInfoItems userInfo={userInfo} />
        <CaptionSectionStyled>{userInfo.statement}</CaptionSectionStyled>
        <CountInfo userInfo={userInfo} />
      </div>
      <BoardOptionButtonStyled>
        <ProfileOption
          memberId={memberId}
          memberName={userInfo.memberName}
          callback={() => {
            queryClient.invalidateQueries(["profile", memberId]);
          }}
        />
      </BoardOptionButtonStyled>
    </ProfileHeaderStyled>
  );
};

const UserInfoStyled = styled.div`
  margin-top: 10px;
  font-weight: 500;

  .memberName {
    font-weight: 600;
    font-size: 1.4rem;
  }
  .intraName {
    color: var(--transparent2);
    font-size: 1.2rem;
    transition: all 0.5s ease;
    &:hover {
      color: var(--white);
    }
  }
  .country {
    margin-top: 5px;
    color: var(--white);
    font-size: 1rem;
  }
`;

/* 게시물, 팔로워, 팔로잉 수 */
// const CountInfoStyled = styled.ul`
//   display: flex;
//   width: 100%;
//   padding: 0;
//   margin: 0 0 30px 0;

//   li {
//     font-size: 1.2rem;
//     display: flex;
//     flex-direction: column;
//     width: calc(100% / 3);
//     &:not(:last-child) {
//       border-right: 1.2px solid var(--transparent); /* 원하는 선의 색상 설정 */
//     }
//     cursor: pointer;
//     &:first-child {
//       cursor: default;
//     }
//   }

//   span {
//     font-size: 1.2rem;
//     font-weight: 600;
//   }
// `;

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
    align-items: center; /* 가운데 정렬을 위한 스타일 추가 */
    cursor: pointer;

    &:not(:last-child) {
      border-right: 1.2px solid var(--transparent); /* 원하는 선의 색상 설정 */
    }

    &:hover:not(:first-child) {
      color: var(--button-grey-hover); /* 마우스 오버 시 글자 색 어둡게 설정 */
    }

    &:first-child {
      cursor: default;
    }

    div,
    span {
      cursor: inherit; /* 부모 요소인 li의 커서 스타일 상속 */
      transition: color 0.2s; /* 색 변화에 애니메이션 적용 */
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
    background-color: var(--transparent); /* 이미지가 없을 때 배경 색상 */
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
