import { useState, useEffect } from "react";
import styled from "styled-components";
import CommentContainer from "./CommentContainer";

const result = [
  {
    commentId: 1,
    memberId: 1,
    memberName: "아롱이형님",
    comment: "귀여워용",
    statement: "아롱이 오빠입니다.",
    profileImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTurkvsYjocf2Q7vABaQVzie2dfD43EUua-g65ue8ciZSAFLD17JBjcv5h1vOhcY7bkVOI&usqp=CAU",
    createdAt: "[LocalDateTime]",
  },
  {
    commentId: 2,
    memberId: 2,
    memberName: "하루애비",
    statement: "하루 오빠입니다.",
    comment: "저도 보러 가도 될까요?",
    profileImage:
      "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
    createdAt: "[LocalDateTime]",
  },
  {
    commentId: 3,
    memberId: 3,
    memberName: "폴라베어",
    statement: "코카콜라를 좋아합니다.",
    comment: "곰사진은 없나요?",
    profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    createdAt: "[LocalDateTime]",
  },
];

const CommentSection = () => {
  const [currentBoardComments, setCurrentBoardComments] =
    useState<any>(undefined);
  useEffect(() => {
    setCurrentBoardComments(result);
  }, []);
  return (
    <WrapperStyled>
      <CommentContainerWapperStyled>
        {currentBoardComments &&
          currentBoardComments.map((comment: any) => (
            <CommentContainer
              key={comment.commentId}
              commentId={comment.commentId}
              memberId={comment.memberId}
              memberName={comment.memberName}
              statement={comment.statement}
              comment={comment.comment}
              profileImage={comment.profileImage}
              createdAt={comment.createdAt}
            />
          ))}
      </CommentContainerWapperStyled>
      <CommentInputWrapperStyled>Hl</CommentInputWrapperStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

const CommentContainerWapperStyled = styled.div`
  width: 100%;
  height: 93%;
  overflow-y: auto;
`;

const CommentInputWrapperStyled = styled.div`
  /* background-color: green; */
  width: 100%;
  height: 7%;
  border-top: 1px solid var(--transparent);
`;

export default CommentSection;
