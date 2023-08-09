import { useState } from "react";
import styled from "styled-components";
import useModal from "@/hooks/useModal";
import useRightSectionHandler from "@/hooks/useRightSectionHandler";
import { ModalType } from "@/types/enum/modal.enum";

const SettingButton = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const { openModal } = useModal();
  const { openAnimalFilterSection } = useRightSectionHandler();

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
        <img src="/src/assets/setting.png" />
      </ToggleStyled>
      <MenuStyled $isToggled={isToggled}>
        <MenuList onClick={() => handleToggle("OFF")}>
          <MenuItemWrapperStyled>
            <MenuItemStyled onClick={() => openModal(ModalType.LANGUAGE)}>
              <img src="/src/assets/globalW.png" />
            </MenuItemStyled>
          </MenuItemWrapperStyled>
          <MenuItemWrapperStyled>
            <MenuItemStyled onClick={openAnimalFilterSection}>
              <img src="/src/assets/categoryW.png" />
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
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  img {
    width: 100%;
    opacity: 0.6;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 0.9;
    }
  }
`;

const ToggleStyled = styled.button`
  height: 40px;
  width: 40px;
  background-color: transparent;
  border: none;
  img {
    cursor: pointer;
    width: 90%;
    opacity: 1;
  }
  img:hover {
    opacity: 0.7;
  }
`;

const MenuStyled = styled.div<{ $isToggled: boolean }>`
  position: absolute;
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-left: ${({ $isToggled }) => ($isToggled ? "-60px" : "-30px")};
  min-width: 50px;
  border-radius: 5px;
  color: var(--grey);
  opacity: ${({ $isToggled }) => ($isToggled ? 1 : 0)};
  visibility: ${({ $isToggled }) => ($isToggled ? "visible" : "hidden")};

  transition: all 0.3s;
  z-index: 1;
`;

const MenuList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
`;

const MenuItemWrapperStyled = styled.li``;

const MenuItemStyled = styled.div`
  cursor: pointer;
  font-size: 10px;
  padding: 0px 5px;
  color: var(--lightgrey);
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.2s;
  img {
    width: 20px;
    height: 20px;
  }
  &:hover {
    color: var(--lightpurple);
  }
`;

export default SettingButton;
