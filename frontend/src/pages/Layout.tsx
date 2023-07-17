import styled from "styled-components";
import LeftMenuSection from "../components/LeftMenuSection";
import RightSection from "../components/RightSection";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <WrapperStyled>
      <LeftMenuSection />
      <MainAreaWrapperStyled>
        <MainAreaStyled>
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
  display: flex;
  flex-direction: column;
  width: 687px;
  height: 100vh;
  min-height: 860px;
`;

export default Layout;
