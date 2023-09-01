import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import ModalLayout from "@/components/modals/ModalLayout";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState } from "@/recoil/atom";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";

const LoginModal: React.FC = () => {
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );

  const redirectLogin = () =>
    window.location.replace(
      `${import.meta.env.VITE_BE_SERVER}` + "/v1/auth/login"
    );

  return (
    <ModalLayout
      modalName={ModalType.LOGIN}
      isOpen={currentOpenModal.loginModal}
    >
      <WrapperStyled>
        <h1>🐶</h1>
        <ContentStyled>로그인이 필요한 서비스입니다.</ContentStyled>
        <button onClick={redirectLogin}>로그인</button>
      </WrapperStyled>
    </ModalLayout>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 105px;
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

export default LoginModal;
