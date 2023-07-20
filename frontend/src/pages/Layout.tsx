import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import LeftMenuSection from "../components/LeftMenuSection";
import RightSection from "../components/RightSection";
import BoardSortToggle from "../components/BoardSortToggle";

const Layout = () => {
  const location = useLocation();

  /**메인 화면일 때만 게시글 정렬 버튼 보여주기*/
  const showSortButtonContainer: boolean = location.pathname === "/";

  return (
    <WrapperStyled>
      <LeftMenuSection />
      <MainAreaWrapperStyled>
        <MainAreaStyled>
          {showSortButtonContainer && <BoardSortToggle />}
          <Outlet />
        </MainAreaStyled>
        <RightSection />
      </MainAreaWrapperStyled>
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
  min-width: 1257px;
  min-height: 860px;
`;

const MainAreaStyled = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 687px;
  height: 100vh;
  min-height: 860px;
`;

export default Layout;
