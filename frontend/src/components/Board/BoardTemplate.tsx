import { useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import useRightSectionHandler from "@/hooks/useRightSectionHandler";
import { useSetRecoilState, useRecoilState } from "recoil";
import { IBoardInfo } from "@/types/interface/board.interface";
import BoardPhotoBox from "@/components/Board/BoardPhotoBox";
import useModal from "@/hooks/useModal";
import { ModalType } from "@/types/enum/modal.enum";
import { languageState } from "@/recoil/atom";
import { currentBoardIdState, currentMemberIdState } from "@/recoil/atom";
import useDebounce from "@/hooks/useDebounce";
import useParseDate from "@/hooks/useParseDate";
import { useSpring, animated } from "@react-spring/web";
import { useCountryEmoji } from "@/hooks/useCountryEmoji";
import { Country } from "@/types/enum/country.enum";
import { animateScroll as scroll } from "react-scroll";
import MeatballButton from "../MeatballButton";
import BoardTemplateUtils from "./BoardTemplateUtils";

interface BoardTemplateProps extends IBoardInfo {
  scrollIntoView?: boolean;
}

const BoardTemplate = (board: BoardTemplateProps) => {
  const {
    boardId,
    memberId,
    memberName,
    profileImageUrl,
    country,
    images,
    reactionCount,
    commentCount,
    scrapped,
    reacted,
    content,
    previewCommentUser,
    previewComment,
    createdAt,
    followType,
    scrollIntoView,
  } = board;

  const boardRef = useRef<HTMLDivElement | null>(null);
  const [isReactedRender, setIsReactedRender] = useState<boolean>(reacted);
  const [isScrappedRender, setIsScrappedRender] = useState<boolean>(scrapped);
  const [lastReaction, setLastReaction] = useState<boolean>(reacted);
  const [lastScrap, setLastScrap] = useState<boolean>(scrapped);
  const [reactionCountRender, setReactionCountRender] =
    useState<number>(reactionCount);
  const [language] = useRecoilState<any>(languageState);
  const setCurrentBoardId = useSetRecoilState<number | null>(
    currentBoardIdState
  );
  const setCurrentMemberId = useSetRecoilState<number | null>(
    currentMemberIdState
  );
  const { scrapMutation, undoScrapMutation, reactMutation, undoReactMutation } =
    BoardTemplateUtils(boardId);
  const { openCommentSection } = useRightSectionHandler();
  const { openModal } = useModal();
  const { debounce } = useDebounce();
  const { parseDate } = useParseDate();
  const ReactionAnimation = useSpring({
    to: {
      opacity: isReactedRender ? 1 : 0,
      transform: isReactedRender ? "scale(1)" : "scale(0)",
    },
    config: { tension: 300, friction: 12 },
  });
  const countryEmoji = useCountryEmoji(country as Country);
  const parsedDate = parseDate(createdAt);
  const parsedPreviewComment =
    previewComment && previewComment.length > 10
      ? previewComment.substring(0, 10) + ".."
      : previewComment;

  useLayoutEffect(() => {
    if (scrollIntoView && boardRef.current) {
      scroll.scrollTo(boardRef.current.offsetTop - 10, {
        duration: 0,
        smooth: "easeInOutCubic",
        containerId: "scrollContainer",
      });
    }
  }, [scrollIntoView]);

  const handleCommentClick = (boardId: number) => {
    openCommentSection();
    setCurrentBoardId(boardId);
  };

  const handleOpenProfile = () => {
    setCurrentMemberId(memberId);
    openModal(ModalType.PROFILECARD);
  };

  const callReactionApi = async () => {
    try {
      if (!isReactedRender && !lastReaction) reactMutation.mutate();
      else if (isReactedRender && lastReaction) undoReactMutation.mutate();
      setLastReaction(!lastReaction);
    } catch (error) {
      //401 발생 -> 기존 isReactedRender 롤백
      setReactionCountRender(reactionCount);
      setIsReactedRender((prev) => !prev);
    }
  };

  const callScrapApi = async () => {
    try {
      if (!isScrappedRender && !lastScrap) {
        scrapMutation.mutate();
        setLastScrap(!lastScrap);
      } else if (isScrappedRender && lastScrap) {
        undoScrapMutation.mutate();
        setLastScrap(!lastScrap);
      }
    } catch (error) {
      //401 발생 -> 기존 isReactedRender 롤백
      setIsScrappedRender((prev) => !prev);
    }
  };

  const handleReaction = (action: string) => {
    if (action === "do") setReactionCountRender(reactionCountRender + 1);
    if (action === "undo") setReactionCountRender(reactionCountRender - 1);
    setIsReactedRender((prev) => !prev);
    debounce("reaction", callReactionApi, 300);
  };

  const handleClickReaction = () => {
    handleReaction(isReactedRender ? "undo" : "do");
  };

  const handleClickScrap = () => {
    setIsScrappedRender((prev) => !prev);
    debounce("scrap", callScrapApi, 300);
  };

  return (
    <>
      <BoardWrapperStyled ref={boardRef}>
        <BoardHeaderStyled>
          <BoardProfileStyled>
            <img
              src={profileImageUrl || "/assets/profile.svg"}
              onClick={handleOpenProfile}
            />
            <div onClick={handleOpenProfile}>
              {memberName} {countryEmoji}
            </div>
          </BoardProfileStyled>
          <BoardOptionButtonStyled>
            <MeatballButton
              memberId={memberId}
              boardId={boardId}
              memberName={memberName}
              followStatus={followType}
              component="board"
            />
          </BoardOptionButtonStyled>
        </BoardHeaderStyled>
        <BoardBodyStyled>
          <BoardPhotoBox
            boardImages={images}
            handleClickReaction={handleClickReaction}
          />
          <ButtonZoneStyled>
            <ReactionCommentContainerStyled>
              <ReactionStyled onClick={handleClickReaction}>
                <HeartIcon style={ReactionAnimation} src="/assets/liked.svg" />
                <img
                  src={
                    isReactedRender ? "/assets/liked.svg" : "/assets/like.svg"
                  }
                />
              </ReactionStyled>
              <CommentStyled
                src="/assets/comment.svg"
                onClick={() => handleCommentClick(boardId)}
              />
            </ReactionCommentContainerStyled>
            <ScrapButtonStyled onClick={handleClickScrap}>
              {isScrappedRender ? (
                <img src="/assets/scrapped.svg" />
              ) : (
                <img src="/assets/scrap.svg" />
              )}
            </ScrapButtonStyled>
          </ButtonZoneStyled>
          <BoardContentContainerStyled>
            <ReactionCommentCountStyled>
              <div>
                {reactionCountRender} {language.like}, {commentCount}{" "}
                {language.comment}
              </div>
              <span>{parsedDate}</span>
            </ReactionCommentCountStyled>
            <ContentStyled>{content}</ContentStyled>
            {previewComment ? (
              <PreviewCommentStyled>
                <div>{previewCommentUser}</div>
                <div>{parsedPreviewComment}</div>
                <div onClick={() => handleCommentClick(boardId)}>
                  {language.moreComments}
                </div>
              </PreviewCommentStyled>
            ) : (
              <NoCommentStyled>{language.noComments}</NoCommentStyled>
            )}
          </BoardContentContainerStyled>
        </BoardBodyStyled>
      </BoardWrapperStyled>
    </>
  );
};

const BoardWrapperStyled = styled.div`
  width: 93%;
  max-width: 465px;
  margin-top: 3%;
  margin-bottom: 5%;
  border-radius: 25px;
  padding-bottom: 7%;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
`;

const BoardHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10%;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background-color: var(--transparent);
`;

const BoardProfileStyled = styled.div`
  display: flex;
  align-items: center;
  margin-left: 18px;
  width: 50%;
  img {
    cursor: pointer;
    width: 15%;
    min-width: 24px;
    object-fit: cover;
    aspect-ratio: 1 / 1;
    border-radius: 100%;
  }
  div {
    cursor: pointer;
    margin-left: 6px;
    font-size: 1.3rem;
    color: var(--white);
  }
`;

const BoardOptionButtonStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 9%;
  border: none;
  margin-right: 3%;
  &:focus {
    opacity: 0.6;
  }
`;

const BoardBodyStyled = styled.div`
  height: 96.8%;
  width: 100%;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  background-color: var(--white);
`;

const ButtonZoneStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  height: 5%;
`;

const ReactionCommentContainerStyled = styled.div`
  display: flex;
  align-items: center;
  width: 33.3%;
  margin-left: 4.5%;
  img {
    cursor: pointer;
  }

  img:hover {
    opacity: 0.7;
  }
`;

const ReactionStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img {
    width: 28px;
  }
`;

const CommentStyled = styled.img`
  width: 22px;
  margin-top: -1.5px;
  margin-left: 5%;
`;

const HeartIcon = styled(animated.img)`
  position: absolute;
  top: 0;
  left: 0px;
  width: 28px;
  height: 28px;
`;

const ScrapButtonStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 33.3%;
  img {
    cursor: pointer;
    width: 29px;
    margin-right: 11%;
  }
  img:hover {
    opacity: 0.7;
  }
`;

const BoardContentContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 11%;
  margin-top: 5px;
  margin-left: 5%;
  margin-right: 5%;
  font-size: 13px;
`;

const ReactionCommentCountStyled = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 100%;
  font-weight: bold;
  span {
    font-weight: 400;
    font-size: 11px;
  }
`;

const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2%;
  font-size: 100%;
`;

const PreviewCommentStyled = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2%;
  font-size: 100%;
  div:nth-child(1) {
    margin-right: 1%;
    font-weight: bold;
  }
  div:nth-child(3) {
    cursor: pointer;
    margin-left: 2%;
    color: var(--lightgrey);
  }
`;

const NoCommentStyled = styled.div`
  font-weight: 400;
  color: var(--lightgrey);
  margin-top: 2%;
`;

export default BoardTemplate;
