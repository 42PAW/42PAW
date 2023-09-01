import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import CommentItem from "@/components/RightSection/CommentSection/CommentItem";
import { currentBoardIdState } from "@/recoil/atom";
import { axiosCreateComment } from "@/api/axios/axios.custom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Board } from "@/types/enum/board.category.enum";
import { IBoardInfo } from "@/types/interface/board.interface";
import useFetch from "@/hooks/useFetch";
import LoadingCircleAnimation from "@/components/loading/LoadingCircleAnimation";
import { CommentInfoDTO } from "@/types/dto/board.dto";
import { boardCategoryState } from "@/recoil/atom";
import useDebounce from "@/hooks/useDebounce";

const isOnlyWhitespace = (str: string) => {
  return str.trim() === "";
};

const CommentSection = () => {
  const [loading, setLoading] = useState(true);
  const { debounce } = useDebounce();
  const { fetchComments } = useFetch();
  const [currentBoardId] = useRecoilState<number | null>(currentBoardIdState);
  const [boardCategory] = useRecoilState<Board>(boardCategoryState);
  const [comment, setComment] = useState<string>("");
  const queryClient = useQueryClient();
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", currentBoardId],
    queryFn: fetchComments,
  });

  useEffect(() => {
    setLoading(true);
    debounce("commentsLoading", () => setLoading(false), 300);
  }, [currentBoardId]);

  const handleOnchange = (e: any) => {
    setComment(e.target.value);
  };

  const uploadComment = async () => {
    if (comment === "" || isOnlyWhitespace(comment)) {
      setComment("");
      return;
    }
    try {
      await axiosCreateComment(currentBoardId, comment);
    } catch (error) {
      setComment("");
    }
  };

  const commentMutation = useMutation(uploadComment, {
    onSuccess: async () => {
      if (comment === "" || isOnlyWhitespace(comment)) return;

      await queryClient.invalidateQueries(["comments", currentBoardId]);
      const newComments: CommentInfoDTO[] | undefined =
        await queryClient.getQueryData(["comments", currentBoardId]);

      await queryClient.setQueryData(
        ["boards", boardCategory],
        (prevData: IBoardInfo[] | any) => {
          if (!prevData) return prevData;
          if (!newComments) return prevData;

          const updatedBoards = prevData.pages.map((page: IBoardInfo[]) =>
            page.map((board: IBoardInfo) => {
              if (board.boardId === currentBoardId && newComments) {
                return {
                  ...board,
                  previewCommentUser:
                    newComments[newComments.length - 1].memberName,
                  previewComment: newComments[newComments.length - 1].comment,
                  commentCount: newComments.length,
                };
              }
              return board;
            })
          );

          return { ...prevData, pages: updatedBoards };
        }
      );
      setComment("");
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!event.nativeEvent.isComposing) {
        event.preventDefault();
        commentMutation.mutate();
      }
    }
  };
  if (loading || isLoading) {
    return (
      <WrapperStyled>
        <LoadingCircleAnimation />
      </WrapperStyled>
    );
  }

  return (
    <WrapperStyled>
      <CommentItemWrapperStyled>
        {comments.length > 0 ? (
          comments.map((comment: CommentInfoDTO) => (
            <CommentItem
              key={comment.commentId}
              commentId={comment.commentId}
              memberId={comment.memberId}
              memberName={comment.memberName}
              country={comment.country}
              comment={comment.comment}
              profileImageUrl={comment.profileImageUrl}
              createdAt={comment.createdAt}
            />
          ))
        ) : (
          <NoCommentMessageStyled>
            이 게시글의 첫번째 댓글이 되어주세요
          </NoCommentMessageStyled>
        )}
      </CommentItemWrapperStyled>
      <CommentInputContainerStyled>
        <input
          value={comment}
          placeholder="댓글을 입력해주세요"
          maxLength={50}
          onChange={handleOnchange}
          onKeyDown={handleKeyDown}
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
  align-items: center;
  height: 100%;
  flex: 1;
  width: 100%;
`;

const CommentItemWrapperStyled = styled.div`
  padding-top: 5px;
  width: 100%;
  height: calc(100% - 40px);
  overflow-y: scroll;
  overflow-x: hidden;
`;

const NoCommentMessageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 40px);
  text-align: center;
  font-size: 2rem;
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
