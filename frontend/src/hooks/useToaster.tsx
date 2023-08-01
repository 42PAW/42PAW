import { useSetRecoilState } from "recoil";
import { toastMessagesState } from "../recoil/atom";
import { IToastInfo } from "../types/interface/toast.interface";

const useToaster = () => {
  const setToastMessages = useSetRecoilState<IToastInfo[]>(toastMessagesState);

  const popToast = (text: string) => {
    const newToast: IToastInfo = { isPopped: true, text: text };
    setToastMessages((previous) => [...previous, newToast]);
  };

  return { popToast };
};

export default useToaster;
