import styled from "styled-components";
import useNavigateCustom from "@/hooks/useNavigateCustom";
import useRightSectionHandler from "@/hooks/useRightSectionHandler";
import SettingButton from "@/components/SettingButton";
import { LeftMenuProps } from "./LeftMenuSection";

import { useSetRecoilState } from "recoil";
import { currentMemberIdState } from "@/recoil/atom";

const LeftMenuDesktop: React.FC<LeftMenuProps> = ({
  handleLogin,
  handleLogout,
  handleClickLogo,
  userInfo,
  language,
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
  return (
    <>
      <LeftMenuStyled>
        <LogoImageStyled src="/assets/paw.png" onClick={handleClickLogo} />
        <nav>
          <MenuListStyled>
            <li onClick={moveToMain}>
              <img alt="Main" src="/assets/home.svg" />
            </li>
            <li onClick={moveToUpload}>
              <img alt="Upload" src="/assets/add.svg" />
            </li>
            <li onClick={openSearchSection}>
              <img alt="Search" src="/assets/search.svg" />
            </li>
          </MenuListStyled>
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
        </nav>
        {userInfo ? (
          <LoginButtonStyled onClick={handleLogout}>
            {language.logout}
          </LoginButtonStyled>
        ) : (
          <LoginButtonStyled onClick={handleLogin}>
            {language.login}
          </LoginButtonStyled>
        )}
      </LeftMenuStyled>
      <SettingButtonContainerStyled>
        <SettingButton />
      </SettingButtonContainerStyled>
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
    border: 1.5px solid var(--white);
    border-radius: 30px;
    font-weight: bold;
  }
  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const LogoImageStyled = styled.img`
  cursor: pointer;
  width: 60px;
  margin-top: 15%;
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
    transition: all 0.3s ease;
    border-radius: 30%;
  }
  img:hover {
    background-color: var(--transparent);
  }
`;

const ProfileImageStyled = styled.img`
  cursor: pointer;
  width: 50px;
  height: 50px;
  object-fit: cover;
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

const SettingButtonContainerStyled = styled.div`
  top: 4px;
  right: 0px;
  position: absolute;
`;

export default LeftMenuDesktop;
