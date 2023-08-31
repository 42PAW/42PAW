import React from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import styled from "styled-components";
import { ModalType } from "@/types/enum/modal.enum";
import useModal from "@/hooks/useModal";
import { banUserInfoState } from "@/recoil/atom";
import { IBanUserInfo } from "@/types/interface/user.interface";
import { languageState } from "@/recoil/atom";
import OptionButton from "./OptionButton";
import { userInfoState } from "@/recoil/atom";
import { UserInfoDTO } from "@/types/dto/member.dto";
import { reportUserInfoState } from "@/recoil/atom";
import { ReportDTO } from "@/types/dto/member.dto";

/**
 * @boardId (optional) 신고, 차단, 삭제할 게시물의 id
 * @commendId (optional) 신고, 차단, 삭제할 댓글의 id
 * @memberId 신고, 차단, 삭제할 댓글 혹은 게시물의 유저 id
 * @memberName 차단 모달에 띄위게 될 차단 유저명
 */
interface IOptionButtonProps {
  // boardId?: number;
  // commentId?: number;
  memberId: number | null;
  memberName: string;
}

/**게시글 및 댓글 오른쪽 상단 ... 버튼. 타인 게시물 댓글에서는 신고 차단, 내 게시물에서는 삭제가 나타남*/
const ProfileOption: React.FC<IOptionButtonProps> = ({
  memberId,
  memberName,
}) => {
  const [language] = useRecoilState<any>(languageState);
  const setBanUserInfo = useSetRecoilState<IBanUserInfo>(banUserInfoState);
  const [reportUserInfo, setReportUserInfo] =
    useRecoilState<ReportDTO>(reportUserInfoState);
  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState);
  //   const setDeleteInfo = useSetRecoilState<IDeleteInfo>(deleteInfoState);
  const { openModal } = useModal();

  const banUser = {
    memberId: memberId,
    userName: memberName,
    followType: null,
  };

  const handleBan = () => {
    setBanUserInfo(banUser);
    openModal(ModalType.BAN);
  };

  const handleReport = () => {
    setReportUserInfo({
      ...reportUserInfo,
      reportedMemberId: memberId,
      boardId: null,
      commentId: null,
    });
    openModal(ModalType.REPORT);
  };

  //   const handleDelete = () => {
  //     setDeleteInfo({ boardId: boardId ?? null, commentId: commentId ?? null });
  //     openModal(ModalType.DELETE);
  //   };

  return (
    <OptionButton>
      {userInfo?.memberId !== memberId ? (
        <>
          <MenuItemWrapperStyled>
            <MenuItemStyled onClick={handleBan}>{language.ban}</MenuItemStyled>
          </MenuItemWrapperStyled>
          <MenuItemWrapperStyled>
            <MenuItemStyled onClick={handleReport}>
              {language.report}
            </MenuItemStyled>
          </MenuItemWrapperStyled>
        </>
      ) : (
        <>
          <MenuItemWrapperStyled>
            <MenuItemStyled onClick={() => console.log(1)}>
              {language.delete}
            </MenuItemStyled>
          </MenuItemWrapperStyled>
          <MenuItemWrapperStyled>
            <MenuItemStyled onClick={() => console.log(2)}>
              {language.report}
            </MenuItemStyled>
          </MenuItemWrapperStyled>
        </>
      )}
    </OptionButton>
  );
};

const MenuItemWrapperStyled = styled.li`
  margin: 3px 5px;
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuItemStyled = styled.div`
  position: absolute;
  cursor: pointer;
  font-size: 10px;
  padding: 2px 5px;
  color: var(--lightgrey);
  border-radius: 20px;
  text-decoration: none;
  &:hover {
    font-weight: bold;
  }
`;

export default ProfileOption;
