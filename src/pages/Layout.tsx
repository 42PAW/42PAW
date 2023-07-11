import styled from "styled-components";
import { isRightSectionOpenedState } from "../recoil/atom";
import { useRecoilState } from "recoil";
const Layout = () => {
  const [isRightSectionOpened, setIsRightSectionOpened] =
    useRecoilState<boolean>(isRightSectionOpenedState);

  const handleSearchSection = () => {
    setIsRightSectionOpened(true);
  };

  return (
    <WrapperStyled>
      <LeftMenuStyled>
        <img src="/src/assets/dogLogo.png" />
        <nav>
          <MenuListStyled>
            <li>
              <img src="/src/assets/home.png" />
            </li>
            <li>
              <img src="/src/assets/notice.png" />
            </li>
            <li>
              <img src="/src/assets/profile.png" />
            </li>
            <li onClick={handleSearchSection}>
              <img src="/src/assets/search.png" />
            </li>
          </MenuListStyled>
        </nav>
        <ProfileImageStyled src="/src/assets/profileImage.jpg" />
        <div>로그아웃</div>
      </LeftMenuStyled>
      <MainAreaStyled
        isRightSectionOpened={isRightSectionOpened}
      ></MainAreaStyled>
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
  background-image: linear-gradient(
    to bottom left,
    #878abe 40%,
    #d1c1cd,
    #e6dade
  );
  font-family: "Nunito Sans";
`;

const LeftMenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 130px;
  border-right: 1px solid #fdfdfd39;
  div {
    background-color: #dbdcfe;
    border-radius: 30px;
    color: #ffffff;
    padding: 7px 10px;
    font-size: 15px;
    margin-top: 100px;
  }
  & > img {
    margin-top: 30px;
    margin-bottom: 100px;
    width: 50px;
  }
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
  width: 40px;
  border-radius: 100%;
  margin: 0;
`;

const MainAreaStyled = styled.main<{ isRightSectionOpened: boolean }>`
  width: 800px;
  height: 800px;
  background-color: #ffffff;
  margin-left: ${(props) => (props.isRightSectionOpened ? "100px" : "270px")};
  transition: margin-left 0.8s ease-in-out;
  border-radius: 30px;
`;

const RightSectionStyled = styled.div<{
  isRightSectionOpened: boolean;
}>`
  opacity: ${(props) => (props.isRightSectionOpened ? 1 : 0)};
  width: 350px;
  height: 800px;
  background-color: #fdfdfd39;
  margin-left: 50px;
  border-radius: 30px;
  transition: opacity 1s ease-in-out;
  border: 2px dashed #ffffff;
`;

export default Layout;
