import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import ModalLayout from "@/components/modals/ModalLayout";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState } from "@/recoil/atom";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import { banUserInfoState } from "@/recoil/atom";
import { IBanUserInfo } from "@/types/interface/user.interface";
import useModal from "@/hooks/useModal";
import useToaster from "@/hooks/useToaster";
import { axiosBlockUser } from "@/api/axios/axios.custom";
import { callbackStoreState } from "@/recoil/atom";

const BanModal: React.FC = () => {
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const [banUserInfo] = useRecoilState<IBanUserInfo>(banUserInfoState);
  const [callbackStore] = useRecoilState<Function[]>(callbackStoreState);
  const { closeModal } = useModal();
  const { popToast } = useToaster();

  const handleOnClick = async () => {
    await closeModal(ModalType.BAN);
    await axiosBlockUser(banUserInfo.memberId as number);
    if (banUserInfo.callback) banUserInfo.callback();
    //검색창에서 프로필 카드 모달을 띄웠을 시 차단할 경우 프로필 카드 모달과 검색창 아이템의 팔로우 타입 버튼 모두 렌더링 해주기 위함
    if (callbackStore.length !== 0) {
      callbackStore.forEach((callback) => callback());
    }
    popToast(`${banUserInfo.userName} 님이 차단됐습니다.`, "N");
  };

  return (
    <ModalLayout modalName={ModalType.BAN} isOpen={currentOpenModal.banModal}>
      <WrapperStyled>
        <h1>차단하기</h1>
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
    color: var(--red);
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

export default BanModal;
