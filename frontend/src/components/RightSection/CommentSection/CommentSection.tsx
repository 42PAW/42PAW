import { useState } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import CommentItem from "@/components/RightSection/CommentSection/CommentItem";
import { currentBoardIdState } from "@/recoil/atom";
import { axiosCreateComment } from "@/api/axios/axios.custom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Board } from "@/types/enum/board.category.enum";
import { userInfoState } from "@/recoil/atom";
import { UserInfoDTO } from "@/types/dto/member.dto";
import { IBoardInfo } from "@/types/interface/board.interface";
import useFetchComments from "@/hooks/useFetchComments";
const CommentSection = () => {
  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState);
  const { fetchComments } = useFetchComments();
  const [currentBoardId] = useRecoilState<number | null>(currentBoardIdState);
  const [comment, setComment] = useState<string>("");
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: comments,
    error,
  } = useQuery({
    queryKey: ["comments", currentBoardId],
    queryFn: fetchComments,
  });

  const handleOnchange = (e: any) => {
    setComment(e.target.value);
  };

  const uploadComment = async () => {
    const response = await axiosCreateComment(currentBoardId, comment);
    console.log(response);
  };

  const commentMutation = useMutation(uploadComment, {
    onSuccess: async () => {
      await queryClient.setQueryData(
        [Board.DEFAULT],
        (prevData: IBoardInfo[] | any) => {
          if (!prevData) return prevData;

          const updatedBoards = prevData.map((board: IBoardInfo) => {
            if (board.boardId === currentBoardId) {
              return {
                ...board,
                previewCommentUser: userInfo?.memberName,
                previewComment: comment,
                commentCount: board.commentCount + 1,
              };
            }
            return board;
          });

          return updatedBoards;
        }
      );
      await queryClient.invalidateQueries(["comments", currentBoardId]);
      setComment("");
    },
  });

  return (
    <WrapperStyled>
      <CommentItemWrapperStyled>
        {comments ? (
          comments.map((comment: any) => (
            <CommentItem
              key={comment.commentId}
              commentId={comment.commentId}
              memberId={comment.memberId}
              memberName={comment.memberName}
              comment={comment.comment}
              profileImageUrl={comment.profileImageUrl}
              createdAt={comment.createdAt}
            />
          ))
        ) : (
          <NoCommentMessageStyled>
            이 게시글의 첫번째 댓글이 되어주세요 🙈
          </NoCommentMessageStyled>
        )}
      </CommentItemWrapperStyled>
      <CommentInputContainerStyled>
        <input
          value={comment}
          placeholder="댓글을 입력해주세요"
          onChange={handleOnchange}
          maxLength={50}
        />
        <button onClick={() => commentMutation.mutate()}>게시</button>
      </CommentInputContainerStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex: 1;
  width: 100%;
  overflow: scroll;
`;

const CommentItemWrapperStyled = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  overflow-y: scroll;
`;

const NoCommentMessageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 40px);
  text-align: center;
  font-size: 25px;
  color: var(--white);
  opacity: 0.7;
`;

const CommentInputContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 40px;
  border-top: 1px solid var(--transparent);
  padding-top: 2%;
  padding-bottom: 2%;
  input {
    height: 50%;
    width: 70%;

    border: none;
    border-bottom: 1px solid var(--white);
    background-color: transparent;
    color: var(--white);
    outline: none;
  }
  input::placeholder {
    color: var(--transparent);
  }
  button {
    cursor: pointer;
    height: 31px;
    width: 70px;
    border-radius: 7px;
    border: 1px solid var(--white);
    background-color: transparent;
    color: var(--white);
  }
  button:hover {
    background-color: var(--white);
    color: var(--pink);
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }
`;

export default CommentSection;
