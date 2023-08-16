import React, { useState } from "react";
import styled from "styled-components";

/**
 * @boardId (optional) 신고, 차단, 삭제할 게시물의 id
 * @commendId (optional) 신고, 차단, 삭제할 댓글의 id
 * @memberId 신고, 차단, 삭제할 댓글 혹은 게시물의 유저 id
 * @memberName 차단 모달에 띄위게 될 차단 유저명
 */
interface IOptionButtonProps {
  children: React.ReactNode;
}

/**게시글 및 댓글 오른쪽 상단 ... 버튼. 타인 게시물 댓글에서는 신고 차단, 내 게시물에서는 삭제가 나타남*/
const OptionButton: React.FC<IOptionButtonProps> = ({ children }) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

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
      <MenuStyled $isToggled={isToggled}>
        <MenuList onClick={() => handleToggle("OFF")}>{children}</MenuList>
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

const MenuStyled = styled.div<{ $isToggled: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  margin-top: 30px;
  min-width: 50px;
  border-radius: 10px;
  color: var(--grey);
  background: var(--white);

  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.05);
  opacity: ${({ $isToggled }) => ($isToggled ? 1 : 0)};
  visibility: ${({ $isToggled }) => ($isToggled ? "visible" : "hidden")};
  transition: opacity 0.3s;
  z-index: 1;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

export default OptionButton;
