import { useRecoilState, useSetRecoilState } from "recoil";
import { currentOpenModalState } from "@/recoil/atom";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import { ModalType } from "@/types/enum/modal.enum";
import { currentBoardIdState, currentCommentIdState } from "@/recoil/atom";

const useModal = () => {
  const [currentOpenModal, setCurrentOpenModal] =
    useRecoilState<ICurrentModalStateInfo>(currentOpenModalState);
  const setCurrentBoardId = useSetRecoilState<number | null>(
    currentBoardIdState
  );
  const setCurrentCommentId = useSetRecoilState<number | null>(
    currentCommentIdState
  );

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
    setCurrentBoardId(null);
    setCurrentCommentId(null);
  };
  return { openModal, closeModal };
};

export default useModal;
