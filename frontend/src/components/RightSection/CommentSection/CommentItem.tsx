import styled from "styled-components";
import { CommentInfoDTO } from "@/types/dto/board.dto";
import BoardOption from "@/components/BoardOption";
import useParseDate from "@/hooks/useParseDate";
import { useSetRecoilState } from "recoil";
import { currentMemberIdState } from "@/recoil/atom";
import useModal from "@/hooks/useModal";
import { ModalType } from "@/types/enum/modal.enum";

const CommentItem = (commentInfo: CommentInfoDTO) => {
  const {
    commentId,
    memberId,
    memberName,
    comment,
    profileImageUrl,
    createdAt,
  } = commentInfo;

  const setCurrentMemberId = useSetRecoilState(currentMemberIdState);
  const { openModal } = useModal();
  const { parseDate } = useParseDate();
  const parsedDate = parseDate(createdAt);

  const handleOpenProfile = () => {
    setCurrentMemberId(memberId);
    openModal(ModalType.PROFILECARD);
  };

  return (
    <CommentItemStyled>
      <UserImageContainerStyled>
        <img src={profileImageUrl} onClick={handleOpenProfile} />
      </UserImageContainerStyled>
      <CommentItemRightStyled>
        <NicknameToggleContainerStyled>
          <NicknameContainerStyled onClick={handleOpenProfile}>
            {memberName} 🇫🇷
            <span>{parsedDate}</span>
          </NicknameContainerStyled>
          <BoardOption
            commentId={commentId}
            memberId={memberId}
            memberName={memberName}
          />
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
    cursor: pointer;
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
  position: relative;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  font-size: 15px;
  color: var(--white);
`;

const NicknameContainerStyled = styled.div`
  cursor: pointer;
  width: 60%;
  font-size: 13px;
  font-weight: 500;
  position: relative;
  span {
    cursor: default;
    position: absolute;
    margin-top: 2px;
    margin-left: 5px;
    font-weight: 200;
    font-size: 1rem;
  }
`;

const CommentContentContainerStyled = styled.div`
  width: 90%;
  font-size: 1.3rem;
  color: var(--white);
  line-height: 17px;
  font-weight: 400;
`;

export default CommentItem;
