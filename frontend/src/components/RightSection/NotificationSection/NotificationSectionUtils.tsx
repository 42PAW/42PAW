import { languageState } from "@/recoil/atom";
import { NotificationType } from "@/types/enum/notification.enum";
import { useRecoilState } from "recoil";

interface NotificationParams {
  type: string;
  id: number;
  content: string | null;
}

const NotificationSectionUtils = () => {
  const [language] = useRecoilState<any>(languageState);

  const getNotificationMessage = (type: NotificationType) => {
    switch (type) {
      case NotificationType.NEW_FOLLOW:
        return language.followMessage;
      case NotificationType.NEW_BOARD_COMMENT:
        return language.commentMessage;
      case NotificationType.NEW_COMMENT_TAG:
        return language.tagMessage;
      case NotificationType.REACTION_TEN:
        return language.reactionTenMessage;
      case NotificationType.REACTION_FORTY_TWO:
        return language.reactionFortyTwoMessage;
      case NotificationType.REACTION_ONE_HUNDRED:
        return language.reactionOneHundredMessage;
      default:
        return "unknown message";
    }
  };

  const destructParameters = (
    parameters: NotificationParams[],
    type: NotificationType
  ) => {
    switch (type) {
      // 리액션 특정 수 도달에 대한 알림
      case NotificationType.REACTION_TEN:
      case NotificationType.REACTION_FORTY_TWO:
      case NotificationType.REACTION_ONE_HUNDRED:
        return {
          boardId: parameters[0].id,
          memberId: null,
          memberName: null,
          length: 0,
        };
      // 새로운 댓글, 댓글 태그에 대한 알림
      case NotificationType.NEW_BOARD_COMMENT:
      case NotificationType.NEW_COMMENT_TAG:
        return {
          boardId: parameters[0].id,
          memberId: parameters[1].id,
          memberName: parameters[1].content,
          length: parameters.length - 2, // 게시물, 알림에 표시할 멤버 제외 + ~ 명에 대한 길이
        };
      // 팔로우에 대한 알림
      case NotificationType.NEW_FOLLOW:
        return {
          boardId: null,
          memberId: parameters[0].id,
          memberName: parameters[0].content,
          length: parameters.length - 1, // 게시물, 알림에 표시할 멤버 제외 + ~ 명에 대한 길이
        };
      default:
        return {
          boardId: null,
          memberId: null,
          memberName: null,
          length: 0, // 게시물, 알림에 표시할 멤버 제외 + ~ 명에 대한 길이
        };
    }
  };

  return { getNotificationMessage, destructParameters };
};

export default NotificationSectionUtils;
