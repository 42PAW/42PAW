import { useState, useEffect } from "react";
import styled from "styled-components";
import CommentItem from "./CommentItem";
import { ICommentInfo } from "../../../types/interface/right.section.interface";

const result = [
  {
    commentId: 1,
    memberId: 1,
    memberName: "아롱이형님",
    comment: "귀여워용",
    statement: "아롱이 오빠입니다.",
    profileImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTurkvsYjocf2Q7vABaQVzie2dfD43EUua-g65ue8ciZSAFLD17JBjcv5h1vOhcY7bkVOI&usqp=CAU",
    createdAt: "2023.07.23",
  },
  {
    commentId: 2,
    memberId: 2,
    memberName: "하루애비",
    statement: "하루 오빠입니다.",
    comment:
      "저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?저도 보러 가도 될까요?",
    profileImage:
      "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
    createdAt: "2023.07.23",
  },
  {
    commentId: 3,
    memberId: 3,
    memberName: "폴라베어",
    statement: "코카콜라를 좋아합니다.",
    comment: "곰사진은 없나요?",
    profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    createdAt: "2023.07.24",
  },
];

const CommentSection = () => {
  const [currentBoardComments, setCurrentBoardComments] = useState<
    ICommentInfo[] | undefined
  >(undefined);
  // useEffect(() => {
  //   setCurrentBoardComments(result);
  // }, []);
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
              statement={comment.statement}
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
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

const CommentItemWrapperStyled = styled.div`
  margin-top: 1%;
  width: 100%;
  height: 92%;
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
  height: 7%;
  border-top: 1px solid var(--transparent);
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
