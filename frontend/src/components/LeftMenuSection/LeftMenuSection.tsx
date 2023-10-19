import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import LeftMenuTablet from "@/components/LeftMenuSection/LeftMenuTablet";
import LeftMenuDesktop from "@/components/LeftMenuSection/LeftMenuDesktop";
import {
  userInfoState,
  languageState,
  notificationsState,
  notificationCountState,
  unreadNotificationIdsState,
} from "@/recoil/atom";
import { UserInfoDTO } from "@/types/dto/member.dto";
import { removeCookie } from "@/api/cookie/cookies";
import LoadingAnimation from "../loading/LoadingAnimation";

export interface LeftMenuProps {
  handleLogin: () => void;
  handleLogout: () => void;
  handleClickLogo: () => void;
  userInfo: UserInfoDTO | null;
  language?: any;
  notificationCount: number;
}

const LeftMenuSection = () => {
  const [isDesktopScreen, setIsDesktopScreen] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );
  const setUnreadNotificationIds = useSetRecoilState<number[]>(
    unreadNotificationIdsState
  );
  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState);
  const [language] = useRecoilState<any>(languageState);
  const [notifications] = useRecoilState<any[] | null>(notificationsState);
  const [notificationCount, setNotificationCount] = useRecoilState<number>(
    notificationCountState
  );
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopScreen(window.matchMedia("(min-width: 1024px)").matches);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!notifications) return;
    let unreadNotificationCount = 0;
    let unreadNotificationsIds: number[] = [];
    notifications.map((notification) => {
      if (notification.readAt === null) {
        unreadNotificationsIds.push(notification.id);
        unreadNotificationCount++;
      }
    });
    setNotificationCount(unreadNotificationCount);
    setUnreadNotificationIds(unreadNotificationsIds);
  }, [notifications]);

  const handleLogin = () => {
    window.location.replace(
      `${import.meta.env.VITE_BE_SERVER}` + "/v1/auth/login"
    );
    setIsLoggingIn(true);
  };

  const handleLogout = () => {
    removeCookie("access_token", {
      path: "/",
      domain: `${import.meta.env.VITE_FE_DOMAIN}`,
    });
    window.location.replace("/");
  };

  const handleClickLogo = () => {
    window.location.replace("/");
  };

  return (
    <>
      {isLoggingIn && <LoadingAnimation />}
      {isDesktopScreen ? (
        <LeftMenuDesktop
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          handleClickLogo={handleClickLogo}
          userInfo={userInfo}
          language={language}
          notificationCount={notificationCount}
        />
      ) : (
        <LeftMenuTablet
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          handleClickLogo={handleClickLogo}
          userInfo={userInfo}
          notificationCount={notificationCount}
        />
      )}
    </>
  );
};

export default LeftMenuSection;
