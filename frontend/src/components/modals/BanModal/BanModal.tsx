import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import ModalLayout from "@/components/modals/ModalLayout";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState } from "@/recoil/atom";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import useModal from "@/hooks/useModal";
import useToaster from "@/hooks/useToaster";
import { axiosBlockUser } from "@/api/axios/axios.custom";
import { callbackStoreState, languageState } from "@/recoil/atom";
import { followType } from "@/types/enum/followType.enum";
import { IMeatballMdoalUtils } from "@/components/MeatballButton";
import { meatballModalUtilsState } from "@/components/MeatballButton";

const BanModal: React.FC = () => {
  const [language] = useRecoilState<any>(languageState);
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const [callbackStore] = useRecoilState<Function[]>(callbackStoreState);
  const [meatballModealUtils] = useRecoilState<IMeatballMdoalUtils>(
    meatballModalUtilsState
  );
  const { closeModal } = useModal();
  const { popToast } = useToaster();

  const handleOnClick = async () => {
    await closeModal(ModalType.BAN);
    //이미 차단된 유저 차단 시도 시
    console.log(meatballModealUtils);
    if (meatballModealUtils.followStatus == followType.BLOCK) {
      const alreadyBannedMsg = language.alreadyBanned;
      popToast(alreadyBannedMsg, "N");
      return;
    }
    await axiosBlockUser(meatballModealUtils.memberId as number);
    if (meatballModealUtils.callback) meatballModealUtils.callback();
    //검색창에서 프로필 카드 모달을 띄웠을 시 차단할 경우 프로필 카드 모달과 검색창 아이템의 팔로우 타입 버튼 모두 렌더링 해주기 위함
    if (callbackStore.length !== 0) {
      callbackStore.forEach((callback) => callback());
    }
    popToast(`${meatballModealUtils.memberName} 님이 차단됐습니다.`, "N");
  };

  return (
    <ModalLayout modalName={ModalType.BAN} isOpen={currentOpenModal.banModal}>
      <WrapperStyled>
        <h1>{language.blockUserTitle}</h1>
        <ContentStyled>
          {meatballModealUtils.memberName} {language.blockUserConfirmation}
        </ContentStyled>
        <button onClick={handleOnClick}>{language.ban}</button>
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
