import styled from "styled-components";
import { CommentInfoDTO } from "../../../types/dto/board.dto";

const CommentItem = (commentInfo: CommentInfoDTO) => {
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
    <CommentItemStyled>
      <UserImageContainerStyled>
        <img src={profileImage} />
      </UserImageContainerStyled>
      <CommentItemRightStyled>
        <NicknameToggleContainerStyled>
          <NicknameContainerStyled>
            {memberName}
            <span>{createdAt}</span>
          </NicknameContainerStyled>
          <ToggleButtonStyled>
            <img src="/src/assets/optionW.png" />
          </ToggleButtonStyled>
        </NicknameToggleContainerStyled>
        <CommentContentContainerStyled>{comment}</CommentContentContainerStyled>
      </CommentItemRightStyled>
    </CommentItemStyled>
  );
};

const CommentItemStyled = styled.div`
  display: flex;
  padding-left: 10px;
`;

const UserImageContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  img {
    width: 45px;
    height: 45px;
    border-radius: 100%;
    border: 1px solid var(--transparent);
  }
`;

const CommentItemRightStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
`;

const NicknameToggleContainerStyled = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  font-size: 15px;
  color: var(--white);
  font-weight: bold;
`;

const NicknameContainerStyled = styled.div`
  width: 60%;
  font-size: 14px;
  span {
    margin-left: 5px;
    font-weight: 300;
    font-size: 11px;
  }
`;

const ToggleButtonStyled = styled.button`
  height: 35px;
  width: 35px;
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
  width: 90%;
  font-size: 13px;
  color: var(--white);
  line-height: 21px;
`;

export default CommentItem;