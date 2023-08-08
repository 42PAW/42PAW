import { useRecoilState } from "recoil";
import styled from "styled-components";
import CommentItem from "@/components/RightSection/CommentSection/CommentItem";
import { CommentInfoDTO } from "@/types/dto/board.dto";
import { currentBoardCommentsState } from "@/recoil/atom";

const CommentSection = () => {
  const [currentBoardComments] = useRecoilState<CommentInfoDTO[]>(
    currentBoardCommentsState
  );

  return (
    <WrapperStyled>
      <CommentItemWrapperStyled>
        {currentBoardComments ? (
          currentBoardComments.map((comment: any) => (
            <CommentItem
              key={comment.commentId}
              commentId={comment.commentId}
              memberId={comment.memberId}
              memberName={comment.memberName}
              comment={comment.comment}
              profileImage={comment.profileImage}
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
        <input placeholder="댓글을 입력해주세요..." />
        <button>게시</button>
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
  margin-top: 1%;
  width: 100%;

  overflow-y: auto;
`;

const NoCommentMessageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  font-size: 25px;
  color: var(--white);
  opacity: 0.7;
`;

const CommentInputContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 10%;
  border-top: 1px solid var(--transparent);
  padding-top: 2%;
  padding-bottom: 2%;
  input {
    height: 50%;
    width: 72%;
    margin-left: 5%;
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
    margin-right: 5%;
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
