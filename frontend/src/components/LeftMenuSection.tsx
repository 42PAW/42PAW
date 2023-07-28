import styled from "styled-components";

import useNavigateCustom from "../hooks/useNavigateCustom";
import useRightSectionHandler from "../hooks/useRightSectionHandler";

const LeftMenuSection = () => {
  const { moveToMain, moveToNotice, moveToMyProfile, moveToUpload } =
    useNavigateCustom();
  const { openSearchSection, openAnimalFilterSection } =
    useRightSectionHandler();

  return (
    <>
      <LeftMenuStyled>
        <LogoImageStyled src="/src/assets/dogLogo.png" />
        <nav>
          <MenuListStyled>
            <li onClick={moveToMain}>
              <img alt="Main" src="/src/assets/home.png" />
            </li>
            <li onClick={moveToNotice}>
              <img alt="Notice" src="/src/assets/notice.png" />
            </li>
            <li onClick={moveToMyProfile}>
              <img alt="MyProfile" src="/src/assets/profile.png" />
            </li>
            <li onClick={openSearchSection}>
              <img alt="Search" src="/src/assets/search.png" />
            </li>
            <li onClick={moveToUpload}>
              <img alt="Upload" src="/src/assets/upload.png" />
            </li>
            <li onClick={openAnimalFilterSection}>
              <img alt="AnimalFilter" src="/src/assets/categoryW.png" />
            </li>
          </MenuListStyled>
          <ProfileImageStyled src="/src/assets/profileImage.jpg" />
        </nav>
        <LoginButtonStyled>로그아웃</LoginButtonStyled>
      </LeftMenuStyled>
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
  min-width: 80px;
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
  @media (max-width: 1023px) {
    overflow: scroll;
    background-color: #e6dade9f;
    margin-top: -50px;
    top: 100%;
    height: 50px;
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    min-width: 0;
    border-right: 1px solid var(--transparent);
    div {
      padding: 7px 10px;
      color: var(--white);
      border: 1px solid var(--white);
      border-radius: 30px;
    }
    nav {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;

const LogoImageStyled = styled.img`
  width: 40px;
  margin-top: 30%;
  @media (max-width: 1023px) {
    width: 0px;
  }
`;

const MenuListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
  padding: 0;
  img {
    padding: 10px 10px;

    width: 25px;
  }
  img:hover {
    background-color: var(--transparent);
    border-radius: 30%;
  }
  @media (max-width: 1023px) {
    margin: 0;
    flex-direction: row;
    img {
      width: 20px;
    }
  }
`;

const ProfileImageStyled = styled.img`
  width: 50px;
  border-radius: 100%;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 1023px) {
    width: 40px;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const LoginButtonStyled = styled.div`
  text-align: center;
  min-width: 45px;
  margin-bottom: 20%;
  margin-top: 20px;
  &:hover {
    background-color: var(--white);
    color: var(--pink);
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  }
  @media (max-width: 1023px) {
    margin: 0;
    margin-right: 2%;
  }
`;

export default LeftMenuSection;
