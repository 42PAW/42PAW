import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import ModalLayout from "@/components/modals/ModalLayout";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState, languageState } from "@/recoil/atom";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import { meatballModalUtilsState } from "../MeatballButton";
import { IMeatballMdoalUtils } from "../MeatballButton";
import useModal from "@/hooks/useModal";
import useRightSectionHandler from "@/hooks/useRightSectionHandler";

const MeatballMoadal = () => {
  const [language] = useRecoilState<any>(languageState);
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const [meatballModalUtils] = useRecoilState<IMeatballMdoalUtils>(
    meatballModalUtilsState
  );
  const { switchModal, closeModal } = useModal();
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
            onClick={() => switchModal(ModalType.MEATBALL, ModalType.BAN)}
          >
            {language.ban}
          </ButtonStyled>
        )}
        {!meatballModalUtils.isMine && (
          <ButtonStyled
            onClick={() => switchModal(ModalType.MEATBALL, ModalType.REPORT)}
          >
            {language.report}
          </ButtonStyled>
        )}
        {meatballModalUtils.isMine &&
          meatballModalUtils.component !== "profile" && (
            <ButtonStyled
              $color={"red"}
              onClick={() => switchModal(ModalType.MEATBALL, ModalType.DELETE)}
            >
              {language.delete}
            </ButtonStyled>
          )}
        {meatballModalUtils.isMine &&
          meatballModalUtils.component === "profile" && (
            <ButtonStyled
              onClick={() =>
                switchModal(ModalType.MEATBALL, ModalType.PROFILEEDIT)
              }
            >
              {language.editProfile}
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
              {language.blockList}
            </ButtonStyled>
          )}
        <ButtonStyled
          onClick={() => {
            closeModal(ModalType.MEATBALL);
          }}
        >
          {language.close}
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
    @media screen and (display-mode: standalone) {
      margin-bottom: 40px;
    }
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
