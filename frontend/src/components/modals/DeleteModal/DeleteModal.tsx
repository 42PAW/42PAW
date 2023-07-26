import { styled } from "styled-components";
import ModalLayout from "../ModalLayout";
import { ModalType } from "../../../types/enum/modal.enum";
import { currentOpenModalState } from "../../../recoil/atom";
import { useRecoilState } from "recoil";
import { ICurrentModalStateInfo } from "../../../types/interface/modal.interface";
import {
  currentBoardIdState,
  currentCommentIdState,
} from "../../../recoil/atom";
import useModal from "../../../hooks/useModal";

const DeleteModal = () => {
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const [currentBoardId] = useRecoilState<number | null>(currentBoardIdState);
  const [currentCommentId] = useRecoilState<number | null>(
    currentCommentIdState
  );
  const { closeModal } = useModal();

  const handleDelete = () => {
    closeModal(ModalType.DELETE);
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
  height: 120px;
  background-color: var(--white);
  border-radius: 15px;
  color: var(--lightgrey);
  h1 {
    font-size: 16px;
    margin-top: 16px;
    margin-bottom: 5px;
  }
  button {
    cursor: pointer;
    margin-top: 10px;
    height: 30px;
    width: 70px;
    border: none;
    background-color: var(--lightgrey);
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
