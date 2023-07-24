import styled from "styled-components";
import useNavigateCustom from "../hooks/useNavigateCustom";
import useRightSectionHandler from "../hooks/useRightSectionHandler";

const LeftMenuSection = () => {
  const { moveToMain, moveToMyProfile } = useNavigateCustom();
  const { openSearchSection } = useRightSectionHandler();

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
            <li onClick={openSearchSection}>
              <img src="/src/assets/search.png" />
            </li>
            <li>
              <img src="/src/assets/upload.png" />
            </li>
            <li>
              <img src="/src/assets/categoryW.png" />
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
  /* background-color: black; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  min-height: 860px;
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
`;

const LogoImageStyled = styled.img`
  width: 40px;
  margin-top: 30%;
`;

const MenuListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 330px;
  margin-top: -20px;
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
`;

const ProfileImageStyled = styled.img`
  margin-top: 10px;
  width: 50px;
  border-radius: 100%;
  &:hover {
    opacity: 0.8;
  }
`;

const LoginButtonStyled = styled.div`
  margin-bottom: 20%;
  &:hover {
    background-color: var(--white);
    color: var(--pink);
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  }
`;

export default LeftMenuSection;
