import styled from "styled-components";
import { isRightSectionOpenedState } from "../recoil/atom";
import { useRecoilState } from "recoil";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const [isRightSectionOpened, setIsRightSectionOpened] =
    useRecoilState<boolean>(isRightSectionOpenedState);
  const navigate = useNavigate();

  const handleSearchSection = () => {
    setIsRightSectionOpened(true);
  };
  const moveToMain = () => {
    navigate("/main");
  };
  const moveToMyProfile = () => {
    navigate("/profile");
  };

  return (
    <WrapperStyled>
      <LeftMenuStyled>
        <LogoImageStyled src="/src/assets/dogLogo.png" />
        <nav>
          <MenuListStyled>
            <li onClick={moveToMain}>
              <img src="/src/assets/home.png" />
            </li>
            <li>
              <img src="/src/assets/notice.png" />
            </li>
            <li onClick={moveToMyProfile}>
              <img src="/src/assets/profile.png" />
            </li>
            <li onClick={handleSearchSection}>
              <img src="/src/assets/search.png" />
            </li>
          </MenuListStyled>
          <ProfileImageStyled src="/src/assets/profileImage.jpg" />
        </nav>
        <LoginButtonStyled>로그아웃</LoginButtonStyled>
      </LeftMenuStyled>
      <MainAreaStyled isRightSectionOpened={isRightSectionOpened}>
        <Outlet />
      </MainAreaStyled>
      <RightSectionStyled
        isRightSectionOpened={isRightSectionOpened}
      ></RightSectionStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const LeftMenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 6%;
  border-right: 1px solid #fdfdfd39;
  div {
    background-color: #dbdcfe;
    border-radius: 30px;
    color: #ffffff;
    padding: 7px 10px;
    font-size: 15px;
    margin-top: 100px;
  }
  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const LogoImageStyled = styled.img`
  margin-top: 50px;
  width: 50px;
`;

const MenuListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding: 0;
  img {
    padding: 10px 10px;
    margin-top: 30px;
    width: 25px;
  }
  img:hover {
    background-color: #fdfdfd39;
    border-radius: 100%;
  }
`;

const ProfileImageStyled = styled.img`
  width: 50%;
  border-radius: 100%;
  margin-top: 20px;
  &:hover {
    opacity: 0.8;
  }
`;

const LoginButtonStyled = styled.div`
  margin-bottom: 40px;
`;

const MainAreaStyled = styled.main<{ isRightSectionOpened: boolean }>`
  width: 35%;
  height: 99.9%;
  background-color: transparent;
  margin-left: ${(props) => (props.isRightSectionOpened ? "15%" : "25%")};
  transition: margin-left 0.8s ease-in-out;
  border-radius: 30px;
  overflow-y: scroll;
`;

const RightSectionStyled = styled.div<{
  isRightSectionOpened: boolean;
}>`
  opacity: ${(props) => (props.isRightSectionOpened ? 1 : 0)};
  width: 30%;
  height: 90%;
  background-color: #fdfdfd39;
  margin-left: 50px;
  border-radius: 30px;
  transition: opacity 1s ease-in-out;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.25);
`;

export default Layout;
