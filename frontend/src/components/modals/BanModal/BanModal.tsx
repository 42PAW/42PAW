import { styled } from "styled-components";
import ModalLayout from "../ModalLayout";
import { ModalType } from "../../../types/enum/modal.enum";
import { currentOpenModalState } from "../../../recoil/atom";
import { useRecoilState } from "recoil";
import { ICurrentModalStateInfo } from "../../../types/interface/modal.interface";
import { banUserInfoState } from "../../../recoil/atom";
import { IBanUserInfo } from "../../../types/interface/user.interface";
import useModal from "../../../hooks/useModal";
import useToaster from "../../../hooks/useToaster";

const BanModal: React.FC = () => {
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const [banUserInfo] = useRecoilState<IBanUserInfo>(banUserInfoState);
  const { closeModal } = useModal();
  const { popToast } = useToaster();

  const handleOnClick = () => {
    closeModal(ModalType.BAN);
    popToast(`${banUserInfo.userName} 님이 차단됐습니다.`);
  };

  return (
    <ModalLayout modalName={ModalType.BAN} isOpen={currentOpenModal.banModal}>
      <WrapperStyled>
        <h1>차단하기</h1>
        <img src="/src/assets/ban.png" />
        <ContentStyled>
          {banUserInfo.userName} 님을 차단하시겠습니까?
        </ContentStyled>
        <button onClick={handleOnClick}>차단</button>
      </WrapperStyled>
    </ModalLayout>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 149px;
  background-color: var(--white);
  border-radius: 15px;
  color: var(--lightgrey);
  h1 {
    font-size: 16px;
    margin-top: 16px;
    margin-bottom: 5px;
  }
  img {
    width: 25px;
  }
  button {
    cursor: pointer;
    margin-top: 10px;
    height: 30px;
    width: 70px;
    border: none;
    background-color: var(--lightgrey);
    color: var(--white);
    border: none;
    border-radius: 5px;
  }
  button:hover {
    background-color: var(--red);
    transition: background-color 0.2s ease-in-out;
  }
`;

const ContentStyled = styled.div`
  margin-top: 18px;
  font-size: 12px;
  text-align: center;
  padding: 0px 20px;
`;

export default BanModal;
