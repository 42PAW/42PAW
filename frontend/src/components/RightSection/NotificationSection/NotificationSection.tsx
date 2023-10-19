import styled from "styled-components";
import NotificationItem from "@/components/RightSection/NotificationSection/NotificationItem";
import { NotificationType } from "@/types/enum/notification.enum";
import {
  notificationsState,
  notificationCountState,
  unreadNotificationIdsState,
} from "@/recoil/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { axiosReadNotifications } from "@/api/axios/axios.custom";

const NotificationSection = () => {
  const [notifications] = useRecoilState(notificationsState);
  const setNotificationCount = useSetRecoilState(notificationCountState);
  const [unreadNotificationIds, setUnreadNotificationIds] = useRecoilState(
    unreadNotificationIdsState
  );

  useEffect(() => {
    setNotificationCount(0); // 새로운 알림에 대해 일괄적으로 읽음 처리
    axiosReadNotifications(unreadNotificationIds).then(() => {
      setUnreadNotificationIds([]);
    });
  }, []);

  return (
    <WrapperStyled>
      {notifications &&
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            type={notification.type as NotificationType}
            parameters={notification.parameters}
            thumbnailUrl={notification.thumbnailUrl}
            isRead={notification.readAt !== null}
          />
        ))}
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 15px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  overflow-y: scroll;
`;

export default NotificationSection;
