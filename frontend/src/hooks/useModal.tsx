import { useRecoilState } from "recoil";
import { currentOpenModalState } from "../recoil/atom";
import { ICurrentModalStateInfo } from "../types/interface/modal.interface";
import { ModalType } from "../types/enum/modal.enum";

const useModal = () => {
  const [currentOpenModal, setCurrentOpenModal] =
    useRecoilState<ICurrentModalStateInfo>(currentOpenModalState);

  const openModal = (modalName: ModalType) => {
    setCurrentOpenModal({
      ...currentOpenModal,
      [modalName]: true,
    });
  };
  const closeModal = (modalName: ModalType) => {
    setCurrentOpenModal({
      ...currentOpenModal,
      [modalName]: false,
    });
  };
  return { openModal, closeModal };
};

export default useModal;
