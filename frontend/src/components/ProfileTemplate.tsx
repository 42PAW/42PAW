import { useState } from "react";
import useModal from "../hooks/useModal";
import { ModalType } from "../types/enum/modal.enum";
import styled from "styled-components";
import Button from "@/components/ButtonComponent";
import ProfileInfoComponent from "@/components/profilePage/ProfileInfoComponent";
import PhotoZoneComponent from "@/components/profilePage/PhotoZoneComponent";

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

const dummy = {
  result: [
    {
      boardId: 1,
      memberId: 1,
      memberName: "아롱이형님",
      intraName: "sanan",
      profileImageUrl:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      country: "KOREA",
      images: [
        {
          imageUrl:
            "https://wimg.mk.co.kr/meet/neds/2019/11/image_readtop_2019_937818_15736086053974580.jpg",
        },
        {
          imageUrl:
            "https://cdn.news.unn.net/news/photo/202110/516864_318701_956.jpg",
        },
      ],
      reactionCount: 5,
      commentCount: 3,
      isScrapped: true,
      isReacted: true,
      content: "이러쿵 저러쿵 이것은 한 줄이다",
      previewComment: "더 보기 안하면 보이는 댓글",
      createdAt: "[LocalDateTime]",
    },
    {
      boardId: 1,
      memberId: 1,
      memberName: "아롱이형님",
      intraName: "joon-lee",
      profileImageUrl:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      country: "KOREA",
      images: [
        {
          imageUrl:
            "https://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg",
        },
      ],
      reactionCount: 99,
      commentCount: 0,
      isScrapped: false,
      isReacted: true,
      content: "이러쿵 저러쿵 이것은 한 줄이다",
      previewComment: "더 보기 안하면 보이는 댓글",
      createdAt: "[LocalDateTime]",
    },
  ],
  totalLength: 21,
};

{
  /* <Button
  handleClick={handleOpenProfile}
  size="lg"
  children="프로필 편집"
/> */
}
const ProfileTemplate = () => {
  const { openModal } = useModal();

  const handleOpenProfile = () => {
    openModal(ModalType.PROFILEEDIT); // PROFILECARD -> 바꿔야 돼 다시
  };

  return (
    <ProfileWrapperStyled>
      <ProfileInfoComponent />
      <PhotoZoneComponent />
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
  max-width: 552px; /* 최대 폭 지정 */
  //   box-shadow: var(--default-shadow);
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
