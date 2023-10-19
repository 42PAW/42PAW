import styled from "styled-components";
import { NotificationType } from "@/types/enum/notification.enum";
import { currentMemberIdState } from "@/recoil/atom";
import { useSetRecoilState } from "recoil";
import useModal from "@/hooks/useModal";
import { ModalType } from "@/types/enum/modal.enum";
import NotificationSectionUtils from "./NotificationSectionUtils";
import useNavigateCustom from "@/hooks/useNavigateCustom";

interface Props {
  type: NotificationType;
  parameters: any[];
  thumbnailUrl?: string;
  isRead?: boolean;
}

const NotificationItem = ({
  type,
  parameters,
  thumbnailUrl,
  isRead = false,
}: Props) => {
  const isUserInteraction =
    type === NotificationType.NEW_FOLLOW ||
    type === NotificationType.NEW_BOARD_COMMENT ||
    type === NotificationType.NEW_COMMENT_TAG;
  const { getNotificationMessage, destructParameters } =
    NotificationSectionUtils();
  const notificationMessage = getNotificationMessage(type);
  const { boardId, memberId, memberName, length } = destructParameters(
    parameters,
    type
  );
  const setCurrentMemberId = useSetRecoilState(currentMemberIdState);
  const { openModal } = useModal();
  const { moveToSingleBoard } = useNavigateCustom();

  const moveToBoard = () => {
    if (boardId === null) return;
    moveToSingleBoard(boardId);
  };

  return (
    <WrapperStyled $isRead={isRead} onClick={moveToBoard}>
      <ThumbnailStyled src={thumbnailUrl} />
      {isUserInteraction && (
        <NameTagStyled
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            setCurrentMemberId(memberId);
            openModal(ModalType.PROFILECARD);
            event.stopPropagation();
          }}
        >
          {memberName}
        </NameTagStyled>
      )}
      <MessageContentStyled>{notificationMessage}</MessageContentStyled>
      {length > 0 && <ExtraCountStyled>+{length}</ExtraCountStyled>}
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div<{ $isRead: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 52px;
  width: 90%;
  margin-bottom: 15px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 30px;
  font-size: 1.2rem;
  opacity: ${(props) => (props.$isRead ? 0.5 : 1)};
  background-color: ${(props) =>
    props.$isRead ? "var(--transparent)" : "var(--transparent2)"};
  transition: all 0.3s ease;
  &:hover {
    opacity: ${(props) => props.$isRead && 0.7};
    transform: scale(1.05);
  }
`;

const ThumbnailStyled = styled.img`
  height: 80%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  background-color: white;
  border-radius: 50%;
  margin-left: 5px;
  margin-right: 8px;
`;

const NameTagStyled = styled.div`
  cursor: pointer;
  color: var(--white);
  background-color: var(--purple);
  border-radius: 10px;
  padding: 2px 9px;
  margin-top: 2px;
  margin-right: 6px;
`;

const MessageContentStyled = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  color: var(--white);
  opacity: 1;
  margin-right: 6px;
`;

const ExtraCountStyled = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--purple);
  font-weight: 800;
`;

export default NotificationItem;
