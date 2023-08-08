import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import ModalLayout from "@/components/modals/ModalLayout";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState } from "@/recoil/atom";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import { currentBoardIdState, currentCommentIdState } from "@/recoil/atom";
import useModal from "@/hooks/useModal";
import useToaster from "@/hooks/useToaster";

const DeleteModal = () => {
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const [currentBoardId] = useRecoilState<number | null>(currentBoardIdState);
  const [currentCommentId] = useRecoilState<number | null>(
    currentCommentIdState
  );
  const { closeModal } = useModal();
  const { popToast } = useToaster();

  const handleDelete = () => {
    closeModal(ModalType.DELETE);
    popToast("해당 글이 삭제되었습니다.", "P");
  };

  return (
    <ModalLayout
      modalName={ModalType.DELETE}
      isOpen={currentOpenModal.deleteModal}
    >
      <WrapperStyled>
        {currentBoardId ? <h1>게시물 삭제</h1> : <h1>댓글 삭제</h1>}
        {currentBoardId ? (
          <ContentStyled>해당 게시물을 삭제하시겠습니까?</ContentStyled>
        ) : (
          <ContentStyled>해당 댓글을 삭제하시겠습니까?</ContentStyled>
        )}
        <button onClick={handleDelete}>삭제</button>
      </WrapperStyled>
    </ModalLayout>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 140px;
  background-color: var(--white);
  border-radius: 15px;
  color: var(--grey);
  h1 {
    font-size: 16px;
    margin-top: 24px;
    margin-bottom: 5px;
  }
  button {
    cursor: pointer;
    margin-top: 13px;
    height: 30px;
    width: 90px;
    border: none;
    background-color: var(--grey);
    color: var(--white);
    border: none;
    border-radius: 5px;
  }
  button:hover {
    background-color: var(--red);
    transition: background-color 0.2s ease-in-out;
  }
`;

const ContentStyled = styled.div`
  margin-top: 10px;
  font-size: 12px;
  text-align: center;
  padding: 0px 20px;
`;

export default DeleteModal;
