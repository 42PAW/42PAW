import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import LeftMenuTablet from "@/components/LeftMenuSection/LeftMenuTablet";
import LeftMenuDesktop from "@/components/LeftMenuSection/LeftMenuDesktop";
import { userInfoState, languageState } from "@/recoil/atom";
import { UserInfoDTO } from "@/types/dto/member.dto";
import { removeCookie } from "@/api/cookie/cookies";
import useNavigateCustom from "@/hooks/useNavigateCustom";
import { boardCategoryState } from "@/recoil/atom";
import { Board } from "@/types/enum/board.category.enum";
import { useQueryClient } from "@tanstack/react-query";

export interface LeftMenuProps {
  handleLogin: () => void;
  handleLogout: () => void;
  handleClickLogo: () => void;
  userInfo: UserInfoDTO | null;
  language?: any;
}

const LeftMenuSection = () => {
  const [isDesktopScreen, setIsDesktopScreen] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );
  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState);
  const [language] = useRecoilState<any>(languageState);
  const [boardCategory, setBoardCategory] =
    useRecoilState<Board>(boardCategoryState);
  const queryClient = useQueryClient();
  const { moveToMain } = useNavigateCustom();

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
    removeCookie("access_token");
    window.location.replace("/");
  };

  const handleClickLogo = () => {
    moveToMain();
    if (
      boardCategory === Board.MINE ||
      boardCategory === Board.OTHER ||
      boardCategory === Board.SCRAPPED
    )
      setBoardCategory(Board.DEFAULT);
    queryClient.invalidateQueries(["boards", boardCategory]);
  };

  return isDesktopScreen ? (
    <LeftMenuDesktop
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      handleClickLogo={handleClickLogo}
      userInfo={userInfo}
      language={language}
    />
  ) : (
    <LeftMenuTablet
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      handleClickLogo={handleClickLogo}
      userInfo={userInfo}
    />
  );
};

export default LeftMenuSection;
