import styled from "styled-components";
import ProfileInfoComponent from "@/pages/ProfilePage/Component/ProfileInfoComponent";
import PhotoZoneComponent from "@/pages/ProfilePage/Component/PhotoZoneComponent";
import { ProfileInfoDTO } from "@/types/dto/member.dto";
import { Board } from "@/types/enum/board.category.enum";
import { IBoardInfo } from "@/types/interface/board.interface";
import FollowTypeButton from "@/components/FollowTypeButton";
import { useQueryClient } from "@tanstack/react-query";

interface ProfileTemplateProps {
  profileInfo: ProfileInfoDTO | null; // profileInfo를 props로 받음
  boards: IBoardInfo[] | null;
  tabState?: Board;
  onTabChange?: (newTabState: Board) => void;
  memberId: number;
}

const ProfileTemplate: React.FC<ProfileTemplateProps> = ({
  profileInfo,
  boards,
  tabState,
  onTabChange,
  memberId,
}) => {
  const queryClient = useQueryClient();
  return (
    <ProfileWrapperStyled>
      <ProfileInfoComponent profileInfo={profileInfo} memberId={memberId} />
      {memberId !== 0 && memberId && profileInfo && (
        <FollowButtonStyled>
          <FollowTypeButton
            memberId={memberId}
            status={profileInfo.followType}
            callback={() => {
              queryClient.invalidateQueries(["profile", memberId]);
            }}
            size="large"
          />
        </FollowButtonStyled>
      )}
      <PhotoZoneComponent
        boards={boards}
        tabState={tabState}
        onTabChange={onTabChange}
      />
    </ProfileWrapperStyled>
  );
};

const FollowButtonStyled = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 10px;
`;

const ProfileWrapperStyled = styled.div`
  height: 100vh;
  width: calc(100% - 40px);
  margin: 0 auto;
  min-width: 450px; /* 최소 폭 지정 */
  // align-items: center;
  display: flex; /* Add flex display */
  flex-direction: column; /* Set flex direction to column */
  overflow-y: scroll;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  @media (max-width: 1023px) {
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }
`;

export default ProfileTemplate;
