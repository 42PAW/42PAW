import styled from "styled-components";
import useNavigateCustom from "@/hooks/useNavigateCustom";
import useRightSectionHandler from "@/hooks/useRightSectionHandler";
import SettingButton from "@/components/SettingButton";
import { LeftMenuProps } from "./LeftMenuSection";
import { getCookie } from "@/api/cookie/cookies";

let token = getCookie("access_token");

import { useSetRecoilState } from "recoil";
import { currentMemberIdState } from "@/recoil/atom";

const LeftMenuTablet: React.FC<LeftMenuProps> = ({
  handleLogin,
  handleLogout,
  handleClickLogo,
  userInfo,
}) => {
  const { moveToMain, moveToMyProfile, moveToUpload } = useNavigateCustom();
  const { openSearchSection } = useRightSectionHandler();
  const setCurrentMemberId = useSetRecoilState<number | null>(
    currentMemberIdState
  );

  const handleOpenMyProfile = () => {
    setCurrentMemberId(userInfo!.memberId);
    moveToMyProfile();
  };
  const handleLoginButton = () => {
    token ? handleLogout() : handleLogin();
    token = getCookie("access_token");
  };

  return (
    <>
      <BannerStyled>
        <BannerBufferStyled>.</BannerBufferStyled>
        <BannerLogoStyled onClick={handleClickLogo}>
          <img src="/assets/paw.png" />
        </BannerLogoStyled>
        <SettingButtonContainerStyled>
          <SettingButton>
            <ImageStyled src="/assets/login.svg" onClick={handleLoginButton} />
          </SettingButton>
        </SettingButtonContainerStyled>
      </BannerStyled>
      <BannerDummyStyled>.</BannerDummyStyled>
      <MenuStyled>
        <nav>
          <MenuListStyled>
            <li onClick={moveToMain}>
              <ListImageStyled alt="Main" src="/assets/home.svg" />
            </li>
            <li onClick={openSearchSection}>
              <ListImageStyled alt="Search" src="/assets/search.svg" />
            </li>
            <li onClick={moveToUpload}>
              <ListImageStyled alt="MyProfile" src="/assets/add.svg" />
            </li>
            <li>
              {userInfo ? (
                <ProfileImageStyled
                  src={userInfo.profileImageUrl || "/assets/profile.svg"}
                  onClick={handleOpenMyProfile}
                />
              ) : (
                <ProfileImageStyled
                  src="/assets/profile.svg"
                  onClick={handleLogin}
                />
              )}
            </li>
          </MenuListStyled>
        </nav>
      </MenuStyled>
    </>
  );
};

const BannerStyled = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 45px;
  border-bottom: 0.5px solid var(--transparent);
  background-color: #c1c2e1f9;
  transition: transform 0.1s ease-in-out, margin-top 0.2s ease;
  line-height: 15px;
  z-index: 3;
`;

const BannerBufferStyled = styled.div`
  color: transparent;
  width: 36px;
  aspect-ratio: 1 / 1;
`;

const BannerDummyStyled = styled.div`
  color: transparent;
  height: 45px;
  width: 100vw;
  border-bottom: 0.5px solid var(--transparent);
`;

const BannerLogoStyled = styled.div`
  text-align: center;
  font-family: "Monoton";
  margin-top: 10px;
  margin-left: 10px;
  color: var(--white);
  font-size: 1.8rem;
  img {
    cursor: pointer;
    width: 40px;
    margin-bottom: 5px;
  }
`;

const SettingButtonContainerStyled = styled.div`
  margin-top: 4px;
`;

const ImageStyled = styled.img`
  position: fixed;
  left: 13px;
`;

const MenuStyled = styled.div`
  z-index: 3;
  position: fixed;
  display: flex;
  border-top: 1px solid var(--transparent);
  flex-direction: row;

  width: 100vw;
  background-color: #c1c2e1f9;
  bottom: 0;
  height: 48px;
  div {
    padding: 7px 10px;
    color: var(--white);
    border: 1px solid var(--white);
    border-radius: 30px;
  }
  nav {
    padding-top: 10px;
  }
  @media screen and (display-mode: standalone) {
    height: 80px;
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
    width: 25px;
  }
`;

const ListImageStyled = styled.img`
  cursor: pointer;
  width: 20px;
`;

const ProfileImageStyled = styled.img`
  cursor: pointer;
  width: 25px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 100%;
  padding: 0;
`;

export default LeftMenuTablet;
