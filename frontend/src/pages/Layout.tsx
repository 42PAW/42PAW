import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import LeftMenuSection from "../components/LeftMenuSection";
import RightSection from "../components/RightSection/RightSection";
import BoardSortToggle from "../components/BoardSortToggle";
import ModalContainer from "../components/modals/ModalContainer";

const Layout = () => {
  const location = useLocation();

  /**메인 화면일 때만 게시글 정렬 버튼 보여주기*/
  const isMainPage: boolean = location.pathname === "/";
  const isSignInPage: boolean = location.pathname === "/sign-up";

  return isSignInPage ? (
    <Outlet />
  ) : (
    <WrapperStyled>
      <LeftMenuSection />
      <MainAreaWrapperStyled>
        <MainAreaStyled>
          {isMainPage && <BoardSortToggle />}
          <Outlet />
        </MainAreaStyled>
        <RightSectionContainer>
          <RightSection />
        </RightSectionContainer>
      </MainAreaWrapperStyled>
      <ModalContainer />
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const MainAreaWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MainAreaStyled = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 100%;
`;

const RightSectionContainer = styled.div`
  @media (max-width: 1023px) {
    display: none;
  }
`;

export default Layout;
