import { isRightSectionOpenedState } from "../recoil/atom";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

/**useNavigate를 통해 라우트 간 이동할 때마다 RightSection을 Close해 주기 위한 훅 */
const useNavigateCustom = () => {
  const setIsRightSectionOpened = useSetRecoilState<boolean>(
    isRightSectionOpenedState
  );
  const navigator = useNavigate();

  const moveToMain = () => {
    setIsRightSectionOpened(false);
    navigator("/");
  };

  const moveToMyProfile = () => {
    setIsRightSectionOpened(false);
    navigator("/profile");
  };

  return {
    moveToMain,
    moveToMyProfile,
  };
};

export default useNavigateCustom;
