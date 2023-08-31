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
import { deleteInfoState } from "@/recoil/atom";
import { IDeleteInfo } from "@/types/interface/option.interface";
import { reportUserInfoState } from "@/recoil/atom";
import { ReportDTO } from "@/types/dto/member.dto";
import { followType } from "@/types/enum/followType.enum";

/**
 * @param {number} boardId - 신고, 차단, 삭제할 게시물의 id (optional)
 * @param {number} commentId - 신고, 차단, 삭제할 댓글의 id (optional)
 * @param {number} memberId - 신고, 차단, 삭제할 댓글 혹은 게시물의 유저 id
 * @param {string} membername - 차단 모달에 띄우게 될 차단 유저명
 * @param {Function} callback - 상태 업데이트 후 실행시킬 콜백 함수(ex.리렌더링) (optional)
 */
interface IOptionButtonProps {
  boardId?: number;
  commentId?: number;
  memberId: number;
  memberName: string;
  followStatus?: followType;
  callback?: () => void;
}

/**게시글 및 댓글 오른쪽 상단 ... 버튼. 타인 게시물 댓글에서는 신고 차단, 내 게시물에서는 삭제가 나타남*/
const BoardOption: React.FC<IOptionButtonProps> = ({
  boardId,
  commentId,
  memberId,
  memberName,
  followStatus,
  callback,
}) => {
  const [language] = useRecoilState<any>(languageState);
  const setBanUserInfo = useSetRecoilState<IBanUserInfo>(banUserInfoState);
  const [reportUserInfo, setReportUserInfo] =
    useRecoilState<ReportDTO>(reportUserInfoState);
  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState);
  const setDeleteInfo = useSetRecoilState<IDeleteInfo>(deleteInfoState);
  const { openModal } = useModal();

  const banUser = {
    memberId: memberId,
    userName: memberName,
    followType: followStatus ?? null,
    callback: callback,
  };

  const handleBan = () => {
    setBanUserInfo(banUser);
    openModal(ModalType.BAN);
  };

  const handleReport = () => {
    setReportUserInfo({
      ...reportUserInfo,
      reportedMemberId: memberId,
      boardId: boardId ?? null,
      commentId: commentId ?? null,
    });
    openModal(ModalType.REPORT);
  };

  const handleDelete = () => {
    setDeleteInfo({ boardId: boardId ?? null, commentId: commentId ?? null });
    openModal(ModalType.DELETE);
  };

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
        <MenuItemWrapperStyled>
          <MenuItemStyled onClick={handleDelete}>
            {language.delete}
          </MenuItemStyled>
        </MenuItemWrapperStyled>
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

export default BoardOption;
