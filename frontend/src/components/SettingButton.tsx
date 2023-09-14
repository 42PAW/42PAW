import { useState, ReactNode } from "react";
import styled from "styled-components";
import useModal from "@/hooks/useModal";
import useRightSectionHandler from "@/hooks/useRightSectionHandler";
import { ModalType } from "@/types/enum/modal.enum";
import { getCookie } from "@/api/cookie/cookies";

const token = getCookie("access_token");

interface props {
  children?: ReactNode;
}

const SettingButton: React.FC<props> = ({ children }) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const { openModal } = useModal();
  const { openAnimalFilterSection } = useRightSectionHandler();
  const url = "https://forms.gle/KSS5gPCTMs8DQLvU8";

  const handleToggle = (state: string) => {
    if (state === "ON") {
      setIsToggled(false);
    }
    if (state === "OFF") {
      setIsToggled(!isToggled);
    }
  };

  const handleOpenAnimalFilterSection = () => {
    if (!token) {
      openModal(ModalType.LOGIN);
      return;
    }
    openAnimalFilterSection();
  };

  return (
    <WrapperStyled onMouseLeave={() => handleToggle("ON")}>
      <ToggleStyled onClick={() => handleToggle("OFF")}>
        <img src="/assets/burger.png" />
      </ToggleStyled>
      <MenuStyled $isToggled={isToggled}>
        <MenuList onClick={() => handleToggle("OFF")}>
          {children && (
            <MenuItemWrapperStyled>
              <MenuItemStyled>{children}</MenuItemStyled>
            </MenuItemWrapperStyled>
          )}
          <MenuItemWrapperStyled>
            <MenuItemStyled
              onClick={() => {
                window.open(url);
              }}
            >
              <img src="/assets/reporting.png" />
            </MenuItemStyled>
          </MenuItemWrapperStyled>
          <MenuItemWrapperStyled>
            <MenuItemStyled onClick={() => openModal(ModalType.LANGUAGE)}>
              <img src="/assets/globalW.png" />
            </MenuItemStyled>
          </MenuItemWrapperStyled>
          <MenuItemWrapperStyled>
            <MenuItemStyled onClick={handleOpenAnimalFilterSection}>
              <img src="/assets/categoryW.png" />
            </MenuItemStyled>
          </MenuItemWrapperStyled>
        </MenuList>
      </MenuStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  z-index: 3;
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
`;

const MenuStyled = styled.div<{ $isToggled: boolean }>`
  position: absolute;
  display: flex;
  justify-content: space-around;
  text-align: center;
  min-width: 50px;
  border-radius: 5px;
  color: var(--grey);
  right: 38px;
  opacity: ${({ $isToggled }) => ($isToggled ? 1 : 0)};
  visibility: ${({ $isToggled }) => ($isToggled ? "visible" : "hidden")};
  @media (min-width: 1024px) {
    transition: all 0.3s;
  }
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
