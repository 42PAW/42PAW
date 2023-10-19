import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isRightSectionOpenedState } from "@/recoil/atom";
import RightSection from "@/components/RightSection/RightSection";
import ModalContainer from "@/components/modals/ModalContainer";
import Toaster from "@/components/toast/Toaster";
import { getCookie } from "@/api/cookie/cookies";
import { userInfoState } from "@/recoil/atom";
import { UserInfoDTO } from "@/types/dto/member.dto";
import useTranslator from "@/hooks/useTranslator";
import { Language } from "@/types/enum/language.enum";
import LeftMenuSection from "@/components/LeftMenuSection/LeftMenuSection";
import BoardSortToggle from "@/components/BoardSortToggle";
import useFetch from "@/hooks/useFetch";

const Layout = () => {
  const location = useLocation();
  const token = getCookie("access_token");
  const localLanguage = localStorage.getItem("language");
  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState);
  const [isRightSectionOpened] = useRecoilState<boolean>(
    isRightSectionOpenedState
  );
  const { translator } = useTranslator();

  //메인 화면일 때만 게시글 정렬 버튼 보여주기
  const isMainPage: boolean = location.pathname === "/";
  const isSignUpPage: boolean = location.pathname === "/sign-up";
  const isProfilePage: boolean = /^\/(my-)?profile(\/\d+)?$/.test(
    location.pathname
  );
  const { fetchMyInfo, fetchNewNotifications } = useFetch();

  useEffect(() => {
    if (token && !userInfo) {
      //로그인 성공 시 유저 정보 받아오기
      fetchMyInfo();
      // 새로운 알림 polling
      setInterval(fetchNewNotifications, 60000);
    }
    //비로그인 상태에서 로컬 스토리지 키값을 통해 언어 설정
    if (!token && localLanguage) translator(localLanguage as Language);
  }, []);

  return isSignUpPage ? (
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
        <RightSection />
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
  @media (min-width: 1024px) {
    margin-left: 105px;
  }
  align-items: center;
  height: 100%;
  min-height: 800px;
  width: 600px;
`;

export default Layout;
