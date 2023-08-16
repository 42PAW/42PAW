import React, { useState } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import styled from "styled-components";
import { ModalType } from "@/types/enum/modal.enum";
import useModal from "@/hooks/useModal";
import {
  banUserInfoState,
  currentBoardIdState,
  currentCommentIdState,
} from "@/recoil/atom";
import { IBanUserInfo } from "@/types/interface/user.interface";
import { languageState } from "@/recoil/atom";
import OptionButton from "./OptionButton";

/**
 * @boardId (optional) 신고, 차단, 삭제할 게시물의 id
 * @commendId (optional) 신고, 차단, 삭제할 댓글의 id
 * @memberId 신고, 차단, 삭제할 댓글 혹은 게시물의 유저 id
 * @memberName 차단 모달에 띄위게 될 차단 유저명
 */
interface IOptionButtonProps {
  boardId?: number;
  commentId?: number;
  memberId: number;
  memberName: string;
}

/**게시글 및 댓글 오른쪽 상단 ... 버튼. 타인 게시물 댓글에서는 신고 차단, 내 게시물에서는 삭제가 나타남*/
const BoardOption: React.FC<IOptionButtonProps> = ({
  boardId,
  commentId,
  memberId,
  memberName,
}) => {
  const [language] = useRecoilState<any>(languageState);
  const setBanUserInfo = useSetRecoilState<IBanUserInfo>(banUserInfoState);
  const setCurrentBoardId = useSetRecoilState<number | null>(
    currentBoardIdState
  );
  const setCurrentCommentId = useSetRecoilState<number | null>(
    currentCommentIdState
  );
  const { openModal } = useModal();
  const banUser = { memberId: memberId, userName: memberName };

  const handleBan = () => {
    setBanUserInfo(banUser);
    openModal(ModalType.BAN);
  };
  const handleDelete = () => {
    if (boardId) {
      setCurrentBoardId(boardId);
    } else if (commentId) {
      setCurrentCommentId(commentId);
    }
    openModal(ModalType.DELETE);
  };

  return (
    <OptionButton>
      <MenuItemWrapperStyled>
        <MenuItemStyled onClick={handleBan}>{language.ban}</MenuItemStyled>
      </MenuItemWrapperStyled>
      <MenuItemWrapperStyled>
        <MenuItemStyled onClick={() => openModal(ModalType.REPORT)}>
          {language.report}
        </MenuItemStyled>
      </MenuItemWrapperStyled>
      <MenuItemWrapperStyled>
        <MenuItemStyled onClick={handleDelete}>
          {language.delete}
        </MenuItemStyled>
      </MenuItemWrapperStyled>
    </OptionButton>
  );
};

const MenuItemWrapperStyled = styled.li``;

const MenuItemStyled = styled.div`
  cursor: pointer;
  font-size: 10px;
  padding: 2px 5px;
  color: var(--lightgrey);
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.2s;
  &:hover {
    color: var(--lightpurple);
  }
`;

export default BoardOption;
