import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import useNavigateCustom from "@/hooks/useNavigateCustom";
import useRightSectionHandler from "@/hooks/useRightSectionHandler";
import SettingButton from "@/components/SettingButton";
import { LeftMenuProps } from "./LeftMenuSection";
import { getCookie } from "@/api/cookie/cookies";

let token = getCookie("access_token");

const LeftMenuTablet: React.FC<LeftMenuProps> = ({
  handleLogin,
  handleLogout,
  handleClickLogo,
  userInfo,
}) => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const { moveToMain, moveToMyProfile, moveToUpload } = useNavigateCustom();
  const { openSearchSection } = useRightSectionHandler();
  const touchStartY = useRef<number | null>(null);

  const isProfilePage: boolean =
    location.pathname === "/my-profile" || location.pathname === "/profile";

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const handleWheel = (event: WheelEvent) => {
    const deltaY = event.deltaY;
    if (deltaY > 0) {
      setIsBannerVisible(false);
    } else if (deltaY < 0) {
      setIsBannerVisible(true);
    }
  };

  const handleTouchStart = (event: TouchEvent) => {
    if (touchStartY.current === null) return;

    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (touchStartY.current === null) return;

    const deltaY = touchStartY.current - event.touches[0].clientY;
    if (deltaY > 50) {
      setIsBannerVisible(false);
    } else if (deltaY < -50) {
      setIsBannerVisible(true);
    }

    touchStartY.current = null;
  };

  const handleLoginButton = () => {
    token ? handleLogout() : handleLogin();
    token = getCookie("access_token");
  };

  return (
    <>
      {!isProfilePage && (
        <BannerStyled $isBannerVisible={isBannerVisible}>
          {userInfo ? (
            <ProfileImageStyled
              src={userInfo.profileImageUrl}
              onClick={moveToMyProfile}
            />
          ) : (
            <ProfileImageStyled
              src="/src/assets/userW.png"
              onClick={handleLogin}
            />
          )}
          <BannerLogoStyled>
            <img src="/src/assets/paw.png" onClick={handleClickLogo} />
          </BannerLogoStyled>
          <SettingButtonContainerStyled>
            <SettingButton />
          </SettingButtonContainerStyled>
        </BannerStyled>
      )}
      <MenuStyled>
        <nav>
          <MenuListStyled>
            <li onClick={moveToMain}>
              <img alt="Main" src="/src/assets/home.png" />
            </li>
            <li onClick={openSearchSection}>
              <img alt="Search" src="/src/assets/search.png" />
            </li>
            <li onClick={moveToUpload}>
              <img alt="MyProfile" src="/src/assets/upload.png" />
            </li>
            <li onClick={handleLoginButton}>
              <img alt="Login" src="/src/assets/logout.png" />
            </li>
          </MenuListStyled>
        </nav>
      </MenuStyled>
    </>
  );
};

const BannerStyled = styled.div<{ $isBannerVisible: boolean }>`
  z-index: 2;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 45px;
  margin-top: ${(props) => (props.$isBannerVisible ? "0" : "-50px")};
  padding-bottom: 2px;
  border-bottom: 1px solid var(--transparent);
  background-color: var(--transparent);
  transform: translateY(${(props) => (props.$isBannerVisible ? "0" : "-100%")});
  transition: transform 0.1s ease-in-out, margin-top 0.2s ease;
  line-height: 15px;
`;

const ProfileImageStyled = styled.img`
  margin-left: 10px;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  &:hover {
    opacity: 0.8;
  }
`;

const BannerLogoStyled = styled.div`
  text-align: center;
  font-family: "Monoton";
  margin-top: 10px;
  color: var(--white);
  font-size: 1.8rem;
  img {
    cursor: pointer;
    width: 45px;
    margin-bottom: 5px;
  }
`;

const SettingButtonContainerStyled = styled.div`
  margin-top: 8px;
  margin-right: 5px;
`;

const MenuStyled = styled.div`
  z-index: 1;
  position: absolute;
  display: flex;
  border-top: 1px solid var(--transparent);
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: isBannerVisible;
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

const MenuListStyled = styled.ul`
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
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

export default LeftMenuTablet;
