import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import ModalLayout from "@/components/modals/ModalLayout";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState } from "@/recoil/atom";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import { currentBoardIdState } from "@/recoil/atom";
import useModal from "@/hooks/useModal";
import useToaster from "@/hooks/useToaster";
import { axiosDeleteBoard, axiosDeleteComment } from "@/api/axios/axios.custom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IBoardInfo } from "@/types/interface/board.interface";
import { boardCategoryState, languageState } from "@/recoil/atom";
import { Board } from "@/types/enum/board.category.enum";
import { CommentInfoDTO } from "@/types/dto/board.dto";
import { IMeatballMdoalUtils } from "@/components/MeatballButton";
import { meatballModalUtilsState } from "@/components/MeatballButton";

const DeleteModal = () => {
  const [language] = useRecoilState<any>(languageState);
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const [currentBoardId] = useRecoilState<number | null>(currentBoardIdState);
  const [meatballModealUtils] = useRecoilState<IMeatballMdoalUtils>(
    meatballModalUtilsState
  );
  const [boardCategory] = useRecoilState<Board>(boardCategoryState);
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const { popToast } = useToaster();

  const deleteContent = async () => {
    const postDeletedCompletionMsg = language.postDeletedComplete;

    if (meatballModealUtils.commentId)
      await axiosDeleteComment(meatballModealUtils.commentId);
    else if (meatballModealUtils.boardId)
      await axiosDeleteBoard(meatballModealUtils.boardId);
    closeModal(ModalType.DELETE);
    popToast(postDeletedCompletionMsg, "P");
  };

  const commentMutation = useMutation(deleteContent, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["comments", currentBoardId]);

      const comments: CommentInfoDTO[] | undefined =
        await queryClient.getQueryData(["comments", currentBoardId]);

      await queryClient.setQueryData(
        ["boards", boardCategory],
        (prevData: IBoardInfo[] | any) => {
          if (!prevData) return prevData;

          const lastComment: CommentInfoDTO | null =
            comments && comments.length > 0
              ? comments[comments.length - 1]
              : null;

          const updatedBoards = prevData.pages.map((page: IBoardInfo[]) =>
            page.map((board: IBoardInfo) => {
              if (board.boardId === currentBoardId) {
                return {
                  ...board,
                  commentCount: board.commentCount - 1,
                  previewCommentUser:
                    (lastComment && lastComment.memberName) ?? null,
                  previewComment: (lastComment && lastComment.comment) ?? null,
                };
              }
              return board;
            })
          );

          return { ...prevData, pages: updatedBoards };
        }
      );
    },
  });

  const boardMutation = useMutation(deleteContent, {
    onSuccess: async () => {
      await queryClient.setQueryData(
        ["boards", boardCategory],
        (prevData: { pages: IBoardInfo[][] } | any) => {
          if (!prevData) return prevData;
          const updatedBoards = prevData.pages.map((page: IBoardInfo[]) =>
            page.filter(
              (board: IBoardInfo) =>
                board.boardId !== meatballModealUtils.boardId
            )
          );

          return { ...prevData, pages: updatedBoards };
        }
      );
    },
  });

  return (
    <ModalLayout
      modalName={ModalType.DELETE}
      isOpen={currentOpenModal.deleteModal}
    >
      <WrapperStyled>
        {meatballModealUtils.commentId ? (
          <>
            <h1>{language.commentDeleted}</h1>
            <ContentStyled>{language.deleteCommentConfirmation}</ContentStyled>
            <button onClick={() => commentMutation.mutate()}>
              {language.deleted}
            </button>
          </>
        ) : (
          <>
            <h1>{language.postDeleted}</h1>
            <ContentStyled>{language.deletePostConfirmation}</ContentStyled>
            <button onClick={() => boardMutation.mutate()}>
              {language.delete}
            </button>
          </>
        )}
      </WrapperStyled>
    </ModalLayout>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 105px;
  background-color: var(--white);
  border-radius: 10px;
  color: var(--grey);
  h1 {
    font-size: 1.4rem;
    font-weight: 500;
    margin-top: 15px;
    margin-bottom: 5px;
  }
  button {
    cursor: pointer;
    margin-top: 10px;
    height: 50px;
    width: 100%;
    border: none;
    background-color: transparent;
    color: var(--red);
    border: none;
    border-top: 0.5px solid #eaeaea;
    font-weight: 500;
    font-size: 1.2rem;
  }
`;

const ContentStyled = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  padding: 0px 40px;
`;

export default DeleteModal;
