import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import useRightSectionHandler from "../../hooks/useRightSectionHandler";

const LeftMenuTablet = () => {
  const { moveToMain, moveToNotice, moveToMyProfile, moveToUpload } =
    useNavigateCustom();
  const { openSearchSection, openAnimalFilterSection } =
    useRightSectionHandler();
  const [isMenuVisible, setMenuVisible] = useState(true);
  const isMainPage: boolean = location.pathname === "/";

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const deltaY = event.deltaY;
      if (deltaY > 0) {
        setMenuVisible(false);
      } else if (deltaY < 0) {
        setMenuVisible(true);
      }
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      {isMainPage && (
        <BannerStyled $hidden={isMenuVisible}>
          <ProfileImageStyled src="/src/assets/profileImage.jpg" />
          <div>
            42PAW
            <span>
              Pets Are the World
              <img src="/src/assets/dogLogo.png" />
            </span>
          </div>
          <UploadButtonStyled onClick={moveToUpload}>
            <img alt="MyProfile" src="/src/assets/upload.png" />
          </UploadButtonStyled>
        </BannerStyled>
      )}
      <MenuStyled>
        <LogoImageStyled src="/src/assets/dogLogo.png" />
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
            <li onClick={moveToNotice}>
              <img alt="Notice" src="/src/assets/notice.png" />
            </li>
            <li onClick={openAnimalFilterSection}>
              <img alt="AnimalFilter" src="/src/assets/categoryW.png" />
            </li>
          </MenuListStyled>
        </nav>
        <LoginButtonStyled>로그아웃</LoginButtonStyled>
      </MenuStyled>
    </>
  );
};

const BannerStyled = styled.div<{ $hidden: boolean }>`
  z-index: 2;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 45px;
  margin-top: ${(props) => (props.$hidden ? "0" : "-50px")};
  padding-bottom: 2px;
  border-bottom: 1px solid var(--transparent);
  background-color: var(--transparent);
  transform: translateY(${(props) => (props.$hidden ? "0" : "-100%")});
  transition: transform 0.1s ease-in-out, margin-top 0.2s ease;
  line-height: 15px;
  div {
    text-align: center;
    font-family: "Monoton";
    margin-top: 10px;
    color: var(--white);
    font-size: 1.8rem;
    span {
      display: flex;
      align-items: center;
      font-size: 1rem;
      img {
        width: 17px;
        margin-left: 4px;
        margin-bottom: 2px;
      }
    }
  }
`;

const ProfileImageStyled = styled.img`
  margin-left: 10px;
  width: 35px;
  border-radius: 100%;
  &:hover {
    opacity: 0.8;
  }
`;

const UploadButtonStyled = styled.button`
  margin-right: 5px;
  margin-top: 5px;
  width: 33px;
  border: none;
  background-color: transparent;
  img {
    width: 100%;
  }
  &:hover {
    opacity: 0.7;
  }
`;

const MenuStyled = styled.div`
  z-index: 1;
  position: absolute;
  display: flex;
  border-top: 1px solid var(--transparent);
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  width: 100vw;
  background-color: #c5c6dcfa;
  margin-top: -48px;
  top: 100%;
  height: 48px;
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
`;

const LogoImageStyled = styled.img`
  width: 0px;
  margin-top: 30%;
`;

const MenuListStyled = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
  padding: 0;
  margin: 0;
  img {
    cursor: pointer;
    padding: 10px 10px;
    width: 20px;
  }
  img:hover {
    background-color: var(--transparent);
    border-radius: 30%;
  }
`;

const LoginButtonStyled = styled.div`
  cursor: pointer;
  text-align: center;
  min-width: 45px;
  margin-bottom: 20%;
  margin-top: 20px;
  &:hover {
    background-color: var(--white);
    color: var(--purple);
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  }
  @media (max-width: 1023px) {
    margin: 0;
    margin-right: 2%;
  }
`;

export default LeftMenuTablet;