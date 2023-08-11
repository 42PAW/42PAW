import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import LeftMenuTablet from "@/components/LeftMenuSection/LeftMenuTablet";
import LeftMenuDesktop from "@/components/LeftMenuSection/LeftMenuDesktop";
import { userInfoState, languageState } from "@/recoil/atom";
import { UserInfoDTO } from "@/types/dto/member.dto";
import { removeCookie } from "@/api/cookie/cookies";

export interface LeftMenuProps {
  handleLogin: () => void;
  handleLogout: () => void;
  userInfo: UserInfoDTO | null;
  language: any;
}

const LeftMenuSection = () => {
  const [isDesktopScreen, setIsDesktopScreen] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );
  const [userInfo, setUserInfo] = useRecoilState<UserInfoDTO | null>(
    userInfoState
  );
  const [language] = useRecoilState<any>(languageState);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopScreen(window.matchMedia("(min-width: 1024px)").matches);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogin = () => {
    window.location.replace(`${import.meta.env.VITE_AUTH_LOGIN}`);
  };

  const handleLogout = () => {
    setUserInfo(null);
    removeCookie("access_token");
  };

  return isDesktopScreen ? (
    <LeftMenuDesktop
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      userInfo={userInfo}
      language={language}
    />
  ) : (
    <LeftMenuTablet
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      userInfo={userInfo}
      language={language}
    />
  );
};

export default LeftMenuSection;
