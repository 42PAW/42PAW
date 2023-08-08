import { useState } from "react";
import styled from "styled-components";
import Button from "@/components/ButtonComponent";

/* tmp */
const profileInfo = {
  memberName: "오덕애비",
  nicknameUpdatedAt: "2023-01-23",
  profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  statement: "강아지는 항상 옳다. 오덕아 사랑해",
  followingCount: 279,
  followerCount: 678,
  boardCount: 3423434347,
};

/* tmp */
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
];

interface CountInfoProps {
  boardCount: number;
  followerCount: number;
  followingCount: number;
}

function CountInfo({
  boardCount,
  followerCount,
  followingCount,
}: CountInfoProps) {
  return (
    <CountInfoStyled>
      <ul>
        <li>
          게시물
          <span>{boardCount}</span>
        </li>
        <li>
          팔로워
          <span>{followerCount}</span>
        </li>
        <li>
          팔로잉
          <span>{followingCount}</span>
        </li>
      </ul>
    </CountInfoStyled>
  );
}

const ProfileTemplate = () => {
  const [click, setClick] = useState(0);

  const handleClick = () => {
    setClick(click + 1);
    console.log({ click });
  };
  return (
    <ProfileWrapperStyled>
      <ProfileHeaderStyled>
        <ProfileHeaderLeftSectionStyled>
          <img src="/src/assets/profileImage.jpg" />
        </ProfileHeaderLeftSectionStyled>
        <ProfileHeaderRightSectionStyled>
          <div className="memberName">{profileInfo.memberName}</div>
          <CountInfo
            boardCount={profileInfo.boardCount}
            followerCount={profileInfo.followerCount}
            followingCount={profileInfo.followingCount}
          />
          <CaptionSectionStyled>{profileInfo.statement}</CaptionSectionStyled>
          <Button handleClick={handleClick} size="lg" children="프로필 편집" />
        </ProfileHeaderRightSectionStyled>
      </ProfileHeaderStyled>
      <ProfileBodyStyled>
        <PhotoCategoryToggleStyled>
          <button>
            <img src="/src/assets/feed.png" />
          </button>
          <button>
            <img src="/src/assets/scrapW.png" />
          </button>
        </PhotoCategoryToggleStyled>
        <PhotoZoneWrapperStyled>
          {imgs.map((prop, index) => (
            <img key={index} src={prop} />
          ))}
        </PhotoZoneWrapperStyled>
      </ProfileBodyStyled>
    </ProfileWrapperStyled>
  );
};

/* 게시물, 팔로워, 팔로잉 수 */
const CountInfoStyled = styled.div`
  display: flex;
  align-items: center;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 10px 0;

    li {
      display: flex;
      flex-direction: column;
      margin-right: 120px;

      &:last-child {
        margin-right: 0;
      }

      span {
        text-align: center;
      }
    }
  }
`;

const ProfileWrapperStyled = styled.div`
  margin-bottom: 3%;
  height: 100vh;
  width: calc(100% - 40px);
  margin: 0 auto;
  min-width: 500px; /* 최소 폭 지정 */
  max-width: 935px; /* 최대 폭 지정 */
  box-shadow: var(--default-shadow);
  display: flex; /* Add flex display */
  flex-direction: column; /* Set flex direction to column */
`;

const ProfileHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  justify-content: space-around;
  width: 100%;
  height: 150px;
  img {
    width: 30%;
    border-radius: 100%;
  }

  @media (min-width: 1023px) {
    height: 230px;
  }
`;

const ProfileHeaderLeftSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 100%;
  margin-left: 5%;
  img {
    margin-top: 40px;
    width: 150px;
  }
`;

const ProfileHeaderRightSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
  font-size: 1.6rem;
  margin-right: 5%;

  .memberName {
    display: flex;
    margin-top: 40px;
    font-size: 1.8rem;
    font-weight: bold;
  }

  Button {
    align-self: center;
  }
`;

const CaptionSectionStyled = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: 100%;
`;

const ProfileBodyStyled = styled.div`
  flex: 1;
  overflow: hidden;
  img {
    width: 50%;
  }
`;

const PhotoCategoryToggleStyled = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 50px;
  margin-top: 15px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: #4a494ed5;
    border: none;
    // border-top: 1px solid #ffffff;
    border-bottom: 1px solid #ffffff;
    font-size: 100%;
    width: 50%;
  }
  button:nth-child(1) {
    border-bottom: 1px solid #67697f;
  }
  button:hover {
    background-color: #fdfdfd39;
  }
  img {
    width: 25px;
  }
`;

const PhotoZoneWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: calc(100% - 60px);
  //   border-bottom-left-radius: 50px;
  //   border-bottom-right-radius: 50px;
  overflow-y: scroll;
  img {
    width: calc(33.3%);
    // margin: 3px;
    border-radius: 1%;
  }
`;

export default ProfileTemplate;
