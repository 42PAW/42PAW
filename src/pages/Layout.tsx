import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { isRightSectionOpenedState } from "../recoil/atom";
import { useRecoilState } from "recoil";
import LeftMenuSection from "../components/LeftMenuSection";
import RightSection from "../components/RightSection";
const Layout = () => {
  const [isRightSectionOpened] = useRecoilState<boolean>(
    isRightSectionOpenedState
  );

  return (
    <WrapperStyled>
      <LeftMenuSection />
      <MainAreaStyled isRightSectionOpened={isRightSectionOpened}>
        <Outlet />
      </MainAreaStyled>
      <RightSection />
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  min-height: 800px;
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const MainAreaStyled = styled.main<{ isRightSectionOpened: boolean }>`
  width: 35%;
  height: 100%;
  background-color: transparent;
  margin-left: ${(props) => (props.isRightSectionOpened ? "15%" : "25%")};
  transition: margin-left 0.8s ease-in-out;
  min-width: 570px;
  /* min-height: 1028px; */
  /* background-color: blue; */
`;

export default Layout;
