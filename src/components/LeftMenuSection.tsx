import styled from "styled-components";
import { isRightSectionOpenedState } from "../recoil/atom";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const LeftMenuSection = () => {
  const setIsRightSectionOpened = useSetRecoilState<boolean>(
    isRightSectionOpenedState
  );
  const navigate = useNavigate();

  const handleRightSection = () => {
    setIsRightSectionOpened(true);
  };
  const moveToMain = () => {
    navigate("/main");
  };
  const moveToMyProfile = () => {
    navigate("/profile");
    setIsRightSectionOpened(false);
  };

  return (
    <>
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
            <li onClick={handleRightSection}>
              <img src="/src/assets/search.png" />
            </li>
            <li>
              <img src="/src/assets/upload.png" />
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
  min-width: 91px;
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

export default LeftMenuSection;
