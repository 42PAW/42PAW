import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ModalType } from "@/types/enum/modal.enum";
import ModalLayout from "@/components/modals/ModalLayout";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import { currentOpenModalState, languageState } from "@/recoil/atom";

const UserNotFoundModal = () => {
  const [language] = useRecoilState<any>(languageState);
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  return (
    <ModalLayout
      modalName={ModalType.USERNOTFOUND}
      isOpen={currentOpenModal.userNotFoundModal}
    >
      <WrapperStyled>
        <h1>🐶</h1>
        <ContentStyled>{language.userNotFound}</ContentStyled>
      </WrapperStyled>
    </ModalLayout>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 85px;
  background-color: var(--white);
  border-radius: 10px;
  color: var(--grey);
  h1 {
    font-size: 1.4rem;
    font-weight: 500;
    margin-top: 15px;
    margin-bottom: 5px;
  }
  button {
    cursor: pointer;
    margin-top: 10px;
    height: 50px;
    width: 100%;
    border: none;
    background-color: transparent;
    color: var(--grey);
    border: none;
    border-top: 0.5px solid #eaeaea;
    font-weight: 500;
    font-size: 1.2rem;
  }
`;

const ContentStyled = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  padding: 0px 40px;
`;

export default UserNotFoundModal;
