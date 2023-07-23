import { isRightSectionOpenedState } from "../recoil/atom";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

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
