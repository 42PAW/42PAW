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
            <img src="/assets/logout.png" onClick={handleLoginButton} />
          </SettingButton>
        </SettingButtonContainerStyled>
      </BannerStyled>
      <MenuStyled>
        <nav>
          <MenuListStyled>
            <li onClick={moveToMain}>
              <ListImageStyled alt="Main" src="/assets/home.png" />
            </li>
            <li onClick={openSearchSection}>
              <ListImageStyled alt="Search" src="/assets/search.png" />
            </li>
            <li onClick={moveToUpload}>
              <ListImageStyled alt="MyProfile" src="/assets/upload.png" />
            </li>
            <li>
              {userInfo ? (
                <ProfileImageStyled
                  src={userInfo.profileImageUrl || "/assets/userW.png"}
                  onClick={handleOpenMyProfile}
                />
              ) : (
                <ProfileImageStyled
                  src="/assets/userW.png"
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
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 45px;
  padding-bottom: 2px;
  border-bottom: 1px solid var(--transparent);
  background-color: var(--transparent);
  transition: transform 0.1s ease-in-out, margin-top 0.2s ease;
  line-height: 15px;
`;

const BannerBufferStyled = styled.div`
  color: transparent;
  width: 36px;
  aspect-ratio: 1 / 1;
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
  margin-top: 8px;
  margin-right: 5px;
`;

const MenuStyled = styled.div`
  z-index: 1;
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
