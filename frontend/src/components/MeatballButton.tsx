import React from "react";
import styled from "styled-components";
import useModal from "@/hooks/useModal";
import { ModalType } from "@/types/enum/modal.enum";
import { userInfoState } from "@/recoil/atom";
import { useRecoilState, atom, useSetRecoilState } from "recoil";
import { UserInfoDTO } from "@/types/dto/member.dto";
import { followType } from "@/types/enum/followType.enum";

interface meatballButtonProps {
  memberId: number;
  boardId?: number;
  commentId?: number;
  memberName?: string;
  followStatus?: followType;
  callback?: () => void;
  component: "modal" | "profile" | "board" | "comment" | "search";
}

export interface IMeatballMdoalUtils {
  memberId: number | null;
  boardId: number | null;
  commentId: number | null;
  memberName: string;
  followStatus: followType | null;
  callback?: () => void;
  component: "modal" | "profile" | "board" | "comment" | "search" | null;
  isMine: boolean;
}

export const meatballModalUtilsState = atom<IMeatballMdoalUtils>({
  key: "meatballModalUtils",
  default: {
    memberId: null,
    boardId: null,
    commentId: null,
    memberName: "",
    followStatus: null,
    component: null,
    isMine: false,
  },
});

/**게시글 및 댓글 오른쪽 상단 ... 버튼. 타인 게시물 댓글에서는 신고 차단, 내 게시물에서는 삭제가 나타남*/
const MeatballButton: React.FC<meatballButtonProps> = ({
  memberId,
  boardId,
  commentId,
  memberName,
  followStatus,
  callback,
  component,
}) => {
  const { openModal } = useModal();
  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState);
  const setMeatballModealUtils = useSetRecoilState<IMeatballMdoalUtils>(
    meatballModalUtilsState
  );
  const updateMeatballModalUtils = () => {
    setMeatballModealUtils({
      memberId: memberId,
      boardId: boardId ?? null,
      commentId: commentId ?? null,
      memberName: memberName ?? "",
      followStatus: followStatus ?? null,
      component: component,
      isMine: userInfo?.memberId === memberId || memberId === 0,
      callback: callback,
    });
  };

  return (
    <WrapperStyled>
      <ToggleStyled
        onClick={async () => {
          await updateMeatballModalUtils();
          openModal(ModalType.MEATBALL);
        }}
      >
        <img src="/assets/optionW.png" />
      </ToggleStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  padding-top: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToggleStyled = styled.button`
  height: 35px;
  width: 35px;
  background-color: transparent;
  border: none;
  img {
    cursor: pointer;
    width: 20px;
  }
`;

export default MeatballButton;
