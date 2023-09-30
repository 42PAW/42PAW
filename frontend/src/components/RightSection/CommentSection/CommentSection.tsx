import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import CommentItem from "@/components/RightSection/CommentSection/CommentItem";
import { currentBoardIdState } from "@/recoil/atom";
import {
  axiosCreateComment,
  axiosGetSearchResults,
} from "@/api/axios/axios.custom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Board } from "@/types/enum/board.category.enum";
import { IBoardInfo } from "@/types/interface/board.interface";
import useFetch from "@/hooks/useFetch";
import LoadingCircleAnimation from "@/components/loading/LoadingCircleAnimation";
import { CommentInfoDTO } from "@/types/dto/board.dto";
import { languageState } from "@/recoil/atom";
import useDebounce from "@/hooks/useDebounce";
import { MentionsInput, Mention } from "react-mentions";
import defaultStyle from "./defaultStyle.js";

const isOnlyWhitespace = (str: string) => {
  return str.trim() === "";
};

const CommentSection = () => {
  const [language] = useRecoilState<any>(languageState);
  const [loading, setLoading] = useState(true);
  const { debounce } = useDebounce();
  const { fetchComments } = useFetch();
  const [currentBoardId] = useRecoilState<number | null>(currentBoardIdState);
  const [comment, setComment] = useState<string>("");
  const queryClient = useQueryClient();
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", currentBoardId],
    queryFn: fetchComments,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  useEffect(() => {
    setLoading(true);
    debounce("commentsLoading", () => setLoading(false), 400);
  }, [currentBoardId]);

  const handleOnchange = (e: any) => {
    setComment(e.target.value);
  };

  const getData = async () => {
    // if (comment == "") {
    //   return;
    // }
    // const mentions = comment.match(/@[^ ]+/g);

    // if (!mentions) return;

    // const cleanedMentions = mentions[0].slice(1).trim();

    // console.log(cleanedMentions);
    const result = await axiosGetSearchResults("", 100, 0);
    console.log("result", result);
    const revisedResult = result.map((data: any) => ({
      id: data.memberId,
      display: `${data.memberName} ${data.intraName} ${data.country}`,
    }));
    console.log("revisedResult", revisedResult);
    return revisedResult;
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

      const mainBoardCategories = [
        Board.DEFAULT,
        Board.TRENDING,
        Board.FOLLOWING,
        Board.MINE,
        Board.OTHER,
      ];

      for (let i = 0; i < mainBoardCategories.length; i++) {
        await queryClient.setQueryData(
          ["boards", mainBoardCategories[i]],
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
      }

      setComment("");
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key);
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
              followType={comment.followType}
            />
          ))
        ) : (
          <NoCommentMessageStyled>
            {language.demandFirstComment}
          </NoCommentMessageStyled>
        )}
      </CommentItemWrapperStyled>
      <CommentInputContainerStyled>
        <MentionsInput
          value={comment}
          onChange={handleOnchange}
          singleLine={true}
          placeholder={language.enterComment}
          maxLength={50}
          onKeyDown={() => handleKeyDown}
          style={defaultStyle}
        >
          <Mention trigger="@" data={getData} />
        </MentionsInput>
        <button onClick={() => commentMutation.mutate()}>
          {language.posting}
        </button>
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
  @media screen and (display-mode: standalone) {
    margin-bottom: 40px;
  }
  font-size: 1.3rem;
  border-top: 1px solid var(--transparent);
  padding-top: 2%;
  padding-bottom: 2%;
  button {
    font-size: 13px;
    cursor: pointer;
    height: 29px;
    width: 76px;
    border-radius: 5px;
    border: 1px solid var(--white);
    background-color: transparent;
    color: var(--white);
    transition: all 0.3s ease;
    &:hover {
      background-color: var(--white);
      color: var(--pink);
    }
  }
`;

export default CommentSection;
