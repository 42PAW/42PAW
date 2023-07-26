import { styled } from "styled-components";
import ModalLayout from "../ModalLayout";
import { ModalType } from "../../../types/enum/modal.enum";
import { currentOpenModalState } from "../../../recoil/atom";
import { useRecoilState } from "recoil";
import { ICurrentModalStateInfo } from "../../../types/interface/modal.interface";

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
        <h1>오덕애비</h1>
        <ProfileImageStyled src="/src/assets/profileImage.jpg" />
        <CaptionStyled>안녕하세요안녕하세요안녕하세요안녕하세요</CaptionStyled>
        <ButtonContainerStyled>
          <button>프로필</button>
          <button>팔로우</button>
        </ButtonContainerStyled>
        <SubButtonContainerStyled>
          <button>
            <img src="/src/assets/ban.png" />
            차단하기
          </button>
          <button>
            <img src="/src/assets/report.png" />
            신고하기
          </button>
        </SubButtonContainerStyled>
      </WrapperStyled>
    </ModalLayout>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  background-color: var(--white);
  border-radius: 15px;
  color: var(--grey);
  h1 {
    font-size: 18px;
    margin-top: 40px;
    margin-bottom: 5px;
  }
`;

const ProfileImageStyled = styled.img`
  border-radius: 100%;
  width: 100px;
`;
const CaptionStyled = styled.div`
  margin-top: 25px;
  font-size: 13px;
`;

const ButtonContainerStyled = styled.div`
  margin-top: 30px;
  margin: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 215px;
  button {
    cursor: pointer;
    height: 40px;
    width: 100px;
    border-radius: 10px;
    border: none;
    &:nth-child(1) {
      background-color: var(--purple);
      color: var(--white);
    }
    &:nth-child(2) {
      background-color: var(--white);
      border: 1px solid var(--grey);
      color: var(--grey);
    }
    &:hover {
      opacity: 0.7;
    }
  }
`;

const SubButtonContainerStyled = styled.div`
  margin-top: -8px;
  padding-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: var(--white);
    color: var(--lightgrey);
    font-size: 12px;
    width: 50%;
    &:hover {
      opacity: 0.7;
    }
  }
  img {
    width: 14px;
    margin-right: 5px;
  }
`;

export default ProfileCardModal;
