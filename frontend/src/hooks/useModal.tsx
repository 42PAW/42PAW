import { useRecoilState } from "recoil";
import { currentOpenModalState } from "@/recoil/atom";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import { ModalType } from "@/types/enum/modal.enum";
import { callbackStoreState } from "@/recoil/atom";

const useModal = () => {
  const [currentOpenModal, setCurrentOpenModal] =
    useRecoilState<ICurrentModalStateInfo>(currentOpenModalState);
  const [callbackStore, setCallbackStore] =
    useRecoilState<Function[]>(callbackStoreState);

  const openModal = (modalName: ModalType) => {
    setCurrentOpenModal({
      ...currentOpenModal,
      [modalName]: true,
    });
  };
  const closeModal = (modalName: ModalType) => {
    if (callbackStore.length !== 0) setCallbackStore([]);
    setCurrentOpenModal({
      ...currentOpenModal,
      [modalName]: false,
    });
  };
  const switchModal = (from: ModalType, to: ModalType) => {
    if (callbackStore.length !== 0) setCallbackStore([]);
    setCurrentOpenModal({
      ...currentOpenModal,
      [from]: false,
      [to]: true,
    });
  };

  return { openModal, closeModal, switchModal };
};

export default useModal;
