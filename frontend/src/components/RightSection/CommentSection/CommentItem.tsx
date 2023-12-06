import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { CommentInfoDTO } from "@/types/dto/board.dto";
import { currentMemberIdState } from "@/recoil/atom";
import useModal from "@/hooks/useModal";
import useParseDate from "@/hooks/useParseDate";
import { useCountryEmoji } from "@/hooks/useCountryEmoji";
import { ModalType } from "@/types/enum/modal.enum";
import MeatballButton from "@/components/MeatballButton";
import { currentBoardIdState } from "@/recoil/atom";
import { axiosGetTaggedUser } from "@/api/axios/axios.custom";

const CommentItem = (commentInfo: CommentInfoDTO) => {
  const {
    commentId,
    memberId,
    memberName,
    country,
    comment,
    profileImageUrl,
    createdAt,
    followType,
  } = commentInfo;

  const setCurrentMemberId = useSetRecoilState(currentMemberIdState);
  const [currentBoardId] = useRecoilState(currentBoardIdState);
  const { openModal } = useModal();
  const { parseDate } = useParseDate();
  const parsedDate = parseDate(createdAt);

  const handleOpenProfile = () => {
    setCurrentMemberId(memberId);
    openModal(ModalType.PROFILECARD);
  };

  const handleTagClick = async (taggedUser: string) => {
    const userName = taggedUser.slice(1);
    try {
      const userData = await axiosGetTaggedUser(userName);
      setCurrentMemberId(userData.memberId);
      openModal(ModalType.PROFILECARD);
    } catch (error) {
      console.log(error);
    }
  };

  const renderCommentText = (commentText: string) => {
    const tagRegex = /@[^@\s]+/gu;
    const matches = [...commentText.matchAll(tagRegex)];
    const renderedComment = [];
    let lastIndex = 0;

    matches.forEach((match, index) => {
      const matchStart = match.index;
      const matchEnd = match.index! + match[0]?.length!;
      if (lastIndex! < matchStart!) {
        renderedComment.push(
          <span key={`text-${index}`}>
            {commentText.substring(lastIndex!, matchStart!)}
          </span>
        );
      }
      renderedComment.push(
        <TaggedUserStyled
          key={`tag-${index}`}
          onClick={() => handleTagClick(match[0])}
        >
          {match[0]}
        </TaggedUserStyled>
      );
      lastIndex = matchEnd;
    });
    if (lastIndex < commentText.length) {
      renderedComment.push(
        <span key="text-end">
          {commentText.substring(lastIndex, commentText.length)}
        </span>
      );
    }
    return <>{renderedComment}</>;
  };

  return (
    <CommentItemStyled>
      <UserImageContainerStyled>
        <img
          src={profileImageUrl || "/assets/profile.svg"}
          onClick={handleOpenProfile}
        />
      </UserImageContainerStyled>
      <CommentItemRightStyled>
        <NicknameToggleContainerStyled>
          <NicknameContainerStyled onClick={handleOpenProfile}>
            {memberName} {useCountryEmoji(country)}
            <span>{parsedDate}</span>
          </NicknameContainerStyled>
          <MeatballButton
            memberId={memberId}
            boardId={currentBoardId as number}
            commentId={commentId}
            memberName={memberName}
            followStatus={followType}
            component="comment"
          />
        </NicknameToggleContainerStyled>
        <CommentContentContainerStyled>
          {renderCommentText(comment)}
        </CommentContentContainerStyled>
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
    aspect-ratio: 1 / 1;
    object-fit: cover;
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
  margin-top: 6px;
  margin-bottom: -2px;
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

const TaggedUserStyled = styled.span`
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
  color: #dcdddf;
`;

export default CommentItem;
