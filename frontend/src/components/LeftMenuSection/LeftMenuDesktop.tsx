import styled from "styled-components";
import useNavigateCustom from "@/hooks/useNavigateCustom";
import useRightSectionHandler from "@/hooks/useRightSectionHandler";
import { languageState } from "@/recoil/atom";
import { useRecoilState } from "recoil";
import useModal from "@/hooks/useModal";
import { ModalType } from "@/types/enum/modal.enum";

const LeftMenuDesktop = () => {
  const { moveToMain, moveToNotice, moveToMyProfile, moveToUpload } =
    useNavigateCustom();
  const { openSearchSection, openAnimalFilterSection } =
    useRightSectionHandler();
  const [language] = useRecoilState<any>(languageState);
  const { openModal } = useModal();

  return (
    <>
      <LeftMenuStyled>
        <LogoImageStyled src="/src/assets/paw.png" />
        <nav>
          <MenuListStyled>
            <li onClick={moveToMain}>
              <img alt="Main" src="/src/assets/home.png" />
            </li>
            <li onClick={openSearchSection}>
              <img alt="Search" src="/src/assets/search.png" />
            </li>
            <li onClick={moveToMyProfile}>
              <img alt="MyProfile" src="/src/assets/profile.png" />
            </li>
            <li onClick={moveToUpload}>
              <img alt="Upload" src="/src/assets/upload.png" />
            </li>
            <li onClick={moveToNotice}>
              <img alt="Notice" src="/src/assets/notice.png" />
            </li>
            <li onClick={openAnimalFilterSection}>
              <img alt="AnimalFilter" src="/src/assets/categoryW.png" />
            </li>
          </MenuListStyled>
          <ProfileImageStyled src="/src/assets/profileImage.jpg" />
        </nav>
        <LoginButtonStyled>{language.logout}</LoginButtonStyled>
      </LeftMenuStyled>
      <LanguageButtonStyled onClick={() => openModal(ModalType.LANGUAGE)}>
        <img src="/src/assets/globalW.png" />
      </LanguageButtonStyled>
    </>
  );
};

const LeftMenuStyled = styled.div`
  z-index: 1;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  overflow: hidden;
  min-width: 100px;
  border-right: 1px solid var(--transparent);
  div {
    padding: 7px 10px;
    color: var(--white);
    border: 1px solid var(--white);
    border-radius: 30px;
  }
  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const LogoImageStyled = styled.img`
  width: 60px;
  margin-top: 30%;
`;

const MenuListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
  padding: 0;
  img {
    cursor: pointer;
    padding: 10px 10px;
    width: 25px;
  }
  img:hover {
    background-color: var(--transparent);
    border-radius: 30%;
  }
`;

const ProfileImageStyled = styled.img`
  width: 50px;
  border-radius: 100%;
  &:hover {
    opacity: 0.8;
  }
`;

const LoginButtonStyled = styled.div`
  cursor: pointer;
  text-align: center;
  min-width: 45px;
  margin-bottom: 20%;
  margin-top: 20px;
  font-size: 1rem;
  &:hover {
    background-color: var(--white);
    color: var(--pink);
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  }
`;

const LanguageButtonStyled = styled.button`
  bottom: 4px;
  right: 7px;
  position: absolute;
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

export default LeftMenuDesktop;
