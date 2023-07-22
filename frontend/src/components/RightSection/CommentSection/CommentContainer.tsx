import styled from "styled-components";

const CommentContainer = (commentInfo: any) => {
  const {
    commentId,
    memberId,
    memberName,
    comment,
    statement,
    profileImage,
    createdAt,
  } = commentInfo;

  return (
    <CommentContainerStyled>
      <UserImageContainerStyled>
        <img src={profileImage} />
      </UserImageContainerStyled>
      <CommentContainerRightStyled>
        <NicknameToggleContainerStyled>
          <NicknameContainerStyled>{memberName}</NicknameContainerStyled>
          <ToggleButtonStyled>
            <img src="/src/assets/optionW.png" />
          </ToggleButtonStyled>
        </NicknameToggleContainerStyled>
        <CommentContentContainerStyled>{comment}</CommentContentContainerStyled>
      </CommentContainerRightStyled>
    </CommentContainerStyled>
  );
};

const CommentContainerStyled = styled.div`
  display: flex;
  /* background-color: blue; */
  padding-left: 10px;
`;

const UserImageContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  /* background-color: yellow; */
  img {
    width: 80%;
    height: 70%;
    border-radius: 100%;
    border: 1px solid var(--transparent);
  }
`;

const CommentContainerRightStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* background-color: purple; */
  margin-left: 10px;
  margin-right: 10px;
`;

const NicknameToggleContainerStyled = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: cyan; */
  height: 30px;
  font-size: 15px;
  color: var(--white);
  font-weight: bold;
`;

const NicknameContainerStyled = styled.div`
  /* background-color: orange; */
  width: 40%;
  font-size: 14px;
`;

const ToggleButtonStyled = styled.button`
  height: 35px;
  width: 35px;
  /* background-color: black; */
  background-color: transparent;
  border: none;
  img {
    cursor: pointer;
    width: 100%;
  }
  img:hover {
    opacity: 0.7;
  }
`;

const CommentContentContainerStyled = styled.div`
  /* background-color: skyblue; */
  width: 90%;
  font-size: 13px;
  color: var(--white);
  line-height: 21px;
`;

export default CommentContainer;
