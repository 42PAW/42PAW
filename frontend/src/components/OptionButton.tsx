import { useState } from "react";
import styled from "styled-components";
import { followingBoardsState } from "../recoil/atom";

const OptionButton = () => {
  const [isToggled, setIsToggled] = useState(false);
  const handleToggleOff = () => {
    setIsToggled(false);
  };
  const handleToggleOn = () => {
    setIsToggled(!isToggled);
  };

  return (
    <WrapperStyled onMouseLeave={handleToggleOff}>
      <ToggleStyled onClick={handleToggleOn}>
        <img src="/src/assets/optionW.png" />
      </ToggleStyled>
      <MenuStyled
        style={{
          opacity: isToggled ? 1 : 0,
          visibility: isToggled ? "visible" : "hidden",
        }}
      >
        <MenuList>
          <MenuItemStyled>
            <MenuLinkStyled>차단</MenuLinkStyled>
          </MenuItemStyled>
          <MenuItemStyled>
            <MenuLinkStyled>신고</MenuLinkStyled>
          </MenuItemStyled>
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
  height: 40px;
  width: 40px;
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
  }
`;

export default OptionButton;
