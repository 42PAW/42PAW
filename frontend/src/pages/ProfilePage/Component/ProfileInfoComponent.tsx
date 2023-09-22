import styled from "styled-components";
import { ProfileInfoDTO } from "@/types/dto/member.dto";
import { useCountryEmoji } from "@/hooks/useCountryEmoji";
import { Country } from "@/types/enum/country.enum";
import useRightSectionHandler from "@/hooks/useRightSectionHandler";
import { useQueryClient } from "@tanstack/react-query";
import MeatballButton from "@/components/MeatballButton";
import { languageState } from "@/recoil/atom";
import { useRecoilState } from "recoil";

const CountInfo = ({ profileInfo }: { profileInfo: ProfileInfoDTO }) => {
  const [language] = useRecoilState<any>(languageState);

  const { openFollowerSection, openFollowingSection } =
    useRightSectionHandler();

  const handleFollowerClick = () => {
    openFollowerSection();
  };

  const handleFollowingClick = () => {
    openFollowingSection();
  };

  return (
    <CountInfoStyled>
      <li>
        <div>{language.posts}</div>
        <span>{profileInfo.boardCount}</span>
      </li>
      <li onClick={handleFollowerClick}>
        <div>{language.followers}</div>
        <span>{profileInfo.followerCount}</span>
      </li>
      <li onClick={handleFollowingClick}>
        <div>{language.following}</div>
        <span>{profileInfo.followingCount}</span>
      </li>
    </CountInfoStyled>
  );
};

const UserInfoItems = ({ profileInfo }: { profileInfo: ProfileInfoDTO }) => {
  const countryEmoji = useCountryEmoji(profileInfo.country as Country);

  return (
    <ProfileInfoStyled>
      <div className="memberName">{profileInfo.memberName}</div>
      <div className="intraName">{profileInfo.intraName}</div>
      <div className="country">
        {countryEmoji} {profileInfo.campus}
      </div>
    </ProfileInfoStyled>
  );
};

const ProfileInfoComponent: React.FC<{
  profileInfo: ProfileInfoDTO | null;
  memberId: number;
}> = ({ profileInfo, memberId }) => {
  const queryClient = useQueryClient();
  if (!profileInfo) return <div>No user information available.</div>;

  return (
    <ProfileHeaderStyled>
      <img
        className="profileImage"
        alt="Profile image"
        src={profileInfo.profileImageUrl || "/assets/profile.svg"}
      />
      <div className="content-wrapper">
        <UserInfoItems profileInfo={profileInfo} />
        <CaptionSectionStyled>{profileInfo.statement}</CaptionSectionStyled>
        <CountInfo profileInfo={profileInfo} />
      </div>
      <MeatballButtonContainerStyled>
        <MeatballButton
          memberId={memberId}
          memberName={profileInfo.memberName}
          callback={() => {
            queryClient.invalidateQueries(["profile", memberId]);
          }}
          component="profile"
        />
      </MeatballButtonContainerStyled>
    </ProfileHeaderStyled>
  );
};

const ProfileInfoStyled = styled.div`
  margin-top: 10px;
  font-weight: 500;

  .memberName {
    font-weight: 600;
    font-size: 1.2rem;
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

const CountInfoStyled = styled.ul`
  display: flex;
  width: 100%;
  padding: 0;
  margin: 0 0 21px 0;
  li {
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    width: calc(100% / 3);
    align-items: center; /* 가운데 정렬을 위한 스타일 추가 */
    cursor: pointer;

    &:not(:last-child) {
      border-right: 1.2px solid var(--transparent); /* 원하는 선의 색상 설정 */
    }

    &:hover:not(:first-child) {
      opacity: 0.8;
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
    font-size: 1rem;
    font-weight: 600;
  }
`;

const MeatballButtonContainerStyled = styled.div`
  position: absolute;
  top: 120px;
  right: 20px;
  width: 30px;
  &:focus {
    opacity: 0.6;
  }
  @media (max-width: 1023px) {
    top: 5px;
  }
`;

const ProfileHeaderStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  color: var(--white);
  width: 100%;
  min-height: 330px;
  font-size: 1.6rem;

  background-image: url("/assets/Intersect.png");
  background-size: 100% 260px;
  background-repeat: no-repeat;
  background-position-y: bottom;

  @media (max-width: 1023px) {
    min-height: 256px;
    font-size: 1.6rem;
    margin-top: 0px;
    background: linear-gradient(210deg, #878abea0 0%, #d1c1cd 99.34%);
  }
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
    object-fit: cover;
    background-color: var(--transparent); /* 이미지가 없을 때 배경 색상 */
    filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.25));
    border-radius: 50%;
    @media (max-width: 1023px) {
      margin-top: 10px;
      width: 80px;
    }
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
  font-size: 1.2rem;
  width: 300px;
`;

export default ProfileInfoComponent;
