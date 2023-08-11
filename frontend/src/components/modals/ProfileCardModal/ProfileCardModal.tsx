import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import ModalLayout from "@/components/modals/ModalLayout";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState } from "@/recoil/atom";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";

const ProfileCardModal = () => {
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );

  return (
    <ModalLayout
      modalName={ModalType.PROFILECARD}
      isOpen={currentOpenModal.profileCardModal}
    >
      <WrapperStyled>
        <LogoStyled>
          <img src="/src/assets/paw.png" />
        </LogoStyled>
        <BurgerButtonStyled>
          <img src="/src/assets/burgerPurple.png" />
        </BurgerButtonStyled>
        <img src="/src/assets/profileImage.jpg" />
        <MainAreaStyled>g</MainAreaStyled>
      </WrapperStyled>
    </ModalLayout>
  );
};

const WrapperStyled = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  height: 440px;
  background-color: var(--white);
  border-radius: 15px;
  color: var(--grey);
  h1 {
    font-size: 18px;
    margin-top: 40px;
    margin-bottom: 5px;
  }
  img {
    width: 110%;
  }
`;

const LogoStyled = styled.div`
  position: absolute;
  left: 11px;
  top: 8px;
  img {
    width: 35px;
  }
`;

const BurgerButtonStyled = styled.button`
  background-color: transparent;
  padding: none;
  border: none;
  position: absolute;
  right: 5px;
  top: 8px;
  img {
    width: 30px;
  }
`;

const MainAreaStyled = styled.div`
  position: absolute;
  bottom: -310px;
  border-radius: 100%;
  height: 500px;
  width: 500px;
  background: linear-gradient(
    228deg,
    #878abe 0%,
    #d1c1cd 52.34%,
    #e6dade 76.75%
  );
`;

export default ProfileCardModal;
