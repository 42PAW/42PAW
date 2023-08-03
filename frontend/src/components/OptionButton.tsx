import React, { useState } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import styled from "styled-components";
import { ModalType } from "../types/enum/modal.enum";
import useModal from "../hooks/useModal";
import {
  banUserInfoState,
  currentBoardIdState,
  currentCommentIdState,
} from "../recoil/atom";
import { IBanUserInfo } from "../types/interface/user.interface";
import { languageState } from "../recoil/atom";

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
const OptionButton: React.FC<IOptionButtonProps> = ({
  boardId,
  commentId,
  memberId,
  memberName,
}) => {
  const [language] = useRecoilState<any>(languageState);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const setBanUserInfo = useSetRecoilState<IBanUserInfo>(banUserInfoState);
  const setCurrentBoardId = useSetRecoilState<number | null>(
    currentBoardIdState
  );
  const setCurrentCommentId = useSetRecoilState<number | null>(
    currentCommentIdState
  );
  const { openModal } = useModal();
  const banUser = { memberId: memberId, userName: memberName };

  const handleToggle = (state: string) => {
    if (state === "ON") {
      setIsToggled(false);
    }
    if (state === "OFF") {
      setIsToggled(!isToggled);
    }
  };
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
    <WrapperStyled onMouseLeave={() => handleToggle("ON")}>
      <ToggleStyled onClick={() => handleToggle("OFF")}>
        <img src="/src/assets/optionW.png" />
      </ToggleStyled>
      <MenuStyled
        style={{
          opacity: isToggled ? 1 : 0,
          visibility: isToggled ? "visible" : "hidden",
        }}
      >
        <MenuList onClick={() => handleToggle("OFF")}>
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
        </MenuList>
      </MenuStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
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
    width: 100%;
  }
  img:hover {
    opacity: 0.7;
  }
`;

const MenuStyled = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  margin-top: 35px;
  width: 50px;
  border-radius: 10px;
  color: var(--grey);
  background: var(--white);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.05);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s;
  z-index: 1;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItemWrapperStyled = styled.li``;

const MenuItemStyled = styled.div`
  cursor: pointer;
  font-size: 10px;
  padding: 5px 5px;
  color: var(--lightgrey);
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.2s;
  &:hover {
    font-size: 12px;
    font-weight: bold;
  }
`;

export default OptionButton;
