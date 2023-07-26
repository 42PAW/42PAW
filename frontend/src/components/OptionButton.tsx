import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BanModal from "./modals/BanModal";
import ReportModal from "./modals/ReportModal/ReportModal";
import { ICurrentModalStateInfo } from "../types/interface/modal.interface";
import { ModalType } from "../types/enum/modal.enum";
import useModal from "../hooks/useModal";
import { currentOpenModalState } from "../recoil/atom";
import { useRecoilState } from "recoil";

interface IOptionButtonProps {
  boardId?: number;
  commentId?: number;
  memberId?: number;
  memberName: string;
}

/**게시글 및 댓글 오른쪽 상단 ... 버튼. 타인 게시물 댓글에서는 신고 차단, 내 게시물에서는 삭제가 나타남*/
const OptionButton: React.FC<IOptionButtonProps> = ({
  boardId,
  commentId,
  memberId,
  memberName,
}) => {
  const [isToggled, setIsToggled] = useState(false);
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const { openModal } = useModal();

  const handleToggle = (state: string) => {
    if (state === "ON") {
      setIsToggled(false);
    }
    if (state === "OFF") {
      setIsToggled(!isToggled);
    }
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
          <MenuItemStyled>
            <MenuLinkStyled onClick={() => openModal(ModalType.BAN)}>
              차단
            </MenuLinkStyled>
          </MenuItemStyled>
          <MenuItemStyled>
            <MenuLinkStyled onClick={() => openModal(ModalType.REPORT)}>
              신고
            </MenuLinkStyled>
          </MenuItemStyled>
        </MenuList>
      </MenuStyled>
      <BanModal
        isModalOpen={currentOpenModal.banModal}
        banUserName={memberName}
      />
      <ReportModal isModalOpen={currentOpenModal.reportModal} />
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

const MenuItemStyled = styled.li``;

const MenuLinkStyled = styled.div`
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
