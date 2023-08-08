import { Outlet, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isRightSectionOpenedState } from "@/recoil/atom";
import LeftMenuSection from "@/components/LeftMenuSection/LeftMenuSection";
import RightSection from "@/components/RightSection/RightSection";
import BoardSortToggle from "@/components/BoardSortToggle";
import ModalContainer from "@/components/modals/ModalContainer";
import Toaster from "@/components/toast/Toaster";

const Layout = () => {
  const location = useLocation();
  const [isRightSectionOpened] = useRecoilState<boolean>(
    isRightSectionOpenedState
  );

  /**메인 화면일 때만 게시글 정렬 버튼 보여주기*/
  const isMainPage: boolean = location.pathname === "/";
  const isSignInPage: boolean = location.pathname === "/sign-up";
  const isProfilePage: boolean = location.pathname === "/profile";

  return isSignInPage ? (
    <Outlet />
  ) : (
    <WrapperStyled>
      <LeftMenuSection />
      <MainAreaWrapperStyled>
        <MainAreaStyled
          $isRightSectionOpened={isRightSectionOpened}
          $isProfilePage={isProfilePage}
        >
          {isMainPage && <BoardSortToggle />}
          <Outlet />
        </MainAreaStyled>
        <RightSectionContainer>
          <RightSection />
        </RightSectionContainer>
      </MainAreaWrapperStyled>
      <ModalContainer />
      <Toaster />
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  @media (max-width: 1023px) {
    flex-direction: column;
  }
`;

const MainAreaWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MainAreaStyled = styled.main<{
  $isRightSectionOpened: boolean;
  $isProfilePage: boolean;
}>`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: ${(props) =>
    props.$isProfilePage
      ? `calc(100% - ${props.$isRightSectionOpened ? "570px" : "0px"})`
      : "500px"};
  //   transition: margin-left 0.5s ease-in-out, width 0.5s ease-in-out;
`;

const RightSectionContainer = styled.div`
  @media (max-width: 1023px) {
    display: none;
  }
`;

export default Layout;
