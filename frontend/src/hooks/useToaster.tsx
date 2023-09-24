import { useSetRecoilState } from "recoil";
import { toastMessagesState } from "@/recoil/atom";
import { IToastInfo } from "@/types/interface/toast.interface";

const useToaster = () => {
  const setToastMessages = useSetRecoilState<IToastInfo[]>(toastMessagesState);

  const popToast = (text: string, type: "P" | "N") => {
    const newToast: IToastInfo = { isPopped: true, text: text, type: type };
    setToastMessages((previous) => [...previous, newToast]);
  };

  return { popToast };
};

export default useToaster;
