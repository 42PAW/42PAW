import { useSetRecoilState } from "recoil";
import {
  isRightSectionOpenedState,
  rightSectionContentState,
} from "@/recoil/atom";
import { IRightSectionContentInfo } from "@/types/interface/right.section.interface";
import { getCookie } from "@/api/cookie/cookies";
import useModal from "@/hooks/useModal";
import { ModalType } from "@/types/enum/modal.enum";

const token = getCookie("access_token");

/**오른쪽 섹션을 닫거나, 어떤 섹션을 열지 핸들링하기 위한 훅*/
const useRightSectionHandler = () => {
  const setIsRightSectionOpened = useSetRecoilState<boolean>(
    isRightSectionOpenedState
  );
  const setRightSectionContent = useSetRecoilState<IRightSectionContentInfo>(
    rightSectionContentState
  );
  const { openModal } = useModal();

  const openSearchSection = () => {
    setRightSectionContent({
      search: true,
      comment: false,
      follower: false,
      following: false,
      animalFilter: false,
      bannedMember: false,
      notification: false,
    });
    setIsRightSectionOpened(true);
  };
  const openAnimalFilterSection = () => {
    setRightSectionContent({
      search: false,
      comment: false,
      follower: false,
      following: false,
      animalFilter: true,
      bannedMember: false,
      notification: false,
    });
    setIsRightSectionOpened(true);
  };
  const openCommentSection = () => {
    setRightSectionContent({
      search: false,
      comment: true,
      follower: false,
      following: false,
      animalFilter: false,
      bannedMember: false,
      notification: false,
    });
    setIsRightSectionOpened(true);
  };
  const openFollowerSection = () => {
    setRightSectionContent({
      search: false,
      comment: false,
      follower: true,
      following: false,
      animalFilter: false,
      bannedMember: false,
      notification: false,
    });
    setIsRightSectionOpened(true);
  };
  const openFollowingSection = () => {
    setRightSectionContent({
      search: false,
      comment: false,
      follower: false,
      following: true,
      animalFilter: false,
      bannedMember: false,
      notification: false,
    });
    setIsRightSectionOpened(true);
  };
  const openBannedMemberSection = () => {
    setRightSectionContent({
      search: false,
      comment: false,
      follower: false,
      following: false,
      animalFilter: false,
      bannedMember: true,
      notification: false,
    });
    setIsRightSectionOpened(true);
  };
  const openNotificationSection = () => {
    if (token === undefined) {
      openModal(ModalType.LOGIN);
      return;
    }
    setRightSectionContent({
      search: false,
      comment: false,
      follower: false,
      following: false,
      animalFilter: false,
      bannedMember: false,
      notification: true,
    });
    setIsRightSectionOpened(true);
  };
  const closeRightSection = () => {
    // rightSection이 닫힐 때 transition 시간이 0.4s로 설정되어 있음. mount 때마다 refetch해오기 위해 닫힐 때마다 모두 false로 바꿔줌.
    setTimeout(() => {
      setRightSectionContent({
        search: false,
        comment: false,
        follower: false,
        following: false,
        animalFilter: false,
        bannedMember: false,
        notification: false,
      });
    }, 400);
    setIsRightSectionOpened(false);
  };

  return {
    openSearchSection,
    openAnimalFilterSection,
    openCommentSection,
    openFollowerSection,
    openFollowingSection,
    openBannedMemberSection,
    openNotificationSection,
    closeRightSection,
  };
};
export default useRightSectionHandler;
