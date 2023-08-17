import styled from "styled-components";
import useNavigateCustom from "@/hooks/useNavigateCustom";
import useRightSectionHandler from "@/hooks/useRightSectionHandler";
import SettingButton from "@/components/SettingButton";
import { LeftMenuProps } from "./LeftMenuSection";

const LeftMenuDesktop: React.FC<LeftMenuProps> = ({
  handleLogin,
  handleLogout,
  userInfo,
  language,
}) => {
  const { moveToMain, moveToMyProfile, moveToUpload } = useNavigateCustom();
  const { openSearchSection } = useRightSectionHandler();
  return (
    <>
      <LeftMenuStyled>
        <LogoImageStyled src="/src/assets/paw.png" />
        <nav>
          <MenuListStyled>
            <li onClick={moveToMain}>
              <img alt="Main" src="/src/assets/home.png" />
            </li>
            <li onClick={moveToUpload}>
              <img alt="Upload" src="/src/assets/upload.png" />
            </li>
            <li onClick={openSearchSection}>
              <img alt="Search" src="/src/assets/search.png" />
            </li>
          </MenuListStyled>
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
        </nav>
        {userInfo ? (
          <LoginButtonStyled onClick={handleLogout}>
            {language.logout}
          </LoginButtonStyled>
        ) : (
          <LoginButtonStyled onClick={handleLogin}>로그인</LoginButtonStyled>
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
    border-radius: 50%;
  }
`;

const ProfileImageStyled = styled.img`
  cursor: pointer;
  width: 50px;
  height: 50px;
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
  bottom: 4px;
  right: 7px;
  position: absolute;
`;

export default LeftMenuDesktop;
