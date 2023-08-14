import { useState, useEffect, useRef } from "react";
import useModal from "../hooks/useModal";
import { ModalType } from "../types/enum/modal.enum";
import Button from "@/components/ButtonComponent";
import styled from "styled-components";
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
  return (
    <ProfileWrapperStyled>
      <ProfileInfoComponent />
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
`;

export default ProfileTemplate;
