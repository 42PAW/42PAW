import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import ModalLayout from "@/components/modals/ModalLayout";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState } from "@/recoil/atom";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import { meatballModalUtilsState } from "../MeatballButton";
import { IMeatballMdoalUtils } from "../MeatballButton";
import useModal from "@/hooks/useModal";
import useRightSectionHandler from "@/hooks/useRightSectionHandler";

const MeatballMoadal = () => {
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const [meatballModalUtils] = useRecoilState<IMeatballMdoalUtils>(
    meatballModalUtilsState
  );
  const { openModal, closeModal } = useModal();
  const { openBannedMemberSection } = useRightSectionHandler();

  return (
    <ModalLayout
      modalName={ModalType.MEATBALL}
      isOpen={currentOpenModal.meatballModal}
      position="bottom"
      zIndex={9998}
    >
      <WrapperStyled>
        {!meatballModalUtils.isMine && (
          <ButtonStyled
            $color={"red"}
            onClick={() => {
              closeModal(ModalType.MEATBALL);
              openModal(ModalType.BAN);
            }}
          >
            차단
          </ButtonStyled>
        )}
        {!meatballModalUtils.isMine && (
          <ButtonStyled
            onClick={() => {
              closeModal(ModalType.MEATBALL);
              openModal(ModalType.REPORT);
            }}
          >
            신고
          </ButtonStyled>
        )}
        {meatballModalUtils.isMine &&
          meatballModalUtils.component !== "profile" && (
            <ButtonStyled
              $color={"red"}
              onClick={() => {
                closeModal(ModalType.MEATBALL);
                openModal(ModalType.DELETE);
              }}
            >
              삭제
            </ButtonStyled>
          )}
        {meatballModalUtils.isMine &&
          meatballModalUtils.component === "profile" && (
            <ButtonStyled
              onClick={() => {
                closeModal(ModalType.MEATBALL);
                openModal(ModalType.PROFILEEDIT);
              }}
            >
              프로필 수정
            </ButtonStyled>
          )}
        {meatballModalUtils.isMine &&
          meatballModalUtils.component === "profile" && (
            <ButtonStyled
              $color={"red"}
              onClick={() => {
                closeModal(ModalType.MEATBALL);
                openBannedMemberSection();
              }}
            >
              차단 목록
            </ButtonStyled>
          )}
        <ButtonStyled
          onClick={() => {
            closeModal(ModalType.MEATBALL);
          }}
        >
          닫기
        </ButtonStyled>
      </WrapperStyled>
    </ModalLayout>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  border-radius: 10px;
  color: var(--grey);
  @media (max-width: 1023px) {
    border-radius: 0px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100vw;
  }
  button:last-child {
    border: none;
  }
`;

const ButtonStyled = styled.button<{ $color?: "red" | undefined }>`
  cursor: pointer;
  height: 40px;
  width: 100%;
  border: none;
  background-color: transparent;
  color: ${({ $color }) => ($color === "red" ? "var(--red)" : "var(--grey)")};
  font-weight: ${({ $color }) => ($color === "red" ? "600" : "500")};
  font-size: 1.2rem;
  border-bottom: 0.5px solid #eaeaea;
  @media (min-width: 1024px) {
    min-width: 220px;
  }
`;

export default MeatballMoadal;
