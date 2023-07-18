import { isRightSectionOpenedState } from "../recoil/atom";
import { useRecoilState } from "recoil";

const useRightSectionHandler = () => {
  const [isRightSectionOpened, setIsRightSectionOpened] =
    useRecoilState<boolean>(isRightSectionOpenedState);
  setIsRightSectionOpened(!isRightSectionOpened);
  console.log(isRightSectionOpened);
};

export default useRightSectionHandler;
