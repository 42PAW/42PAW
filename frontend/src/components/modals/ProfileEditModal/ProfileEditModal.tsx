import { styled } from "styled-components";
import ModalLayout from "../ModalLayout";
import { ModalType } from "../../../types/enum/modal.enum";
import { currentOpenModalState } from "../../../recoil/atom";
import { useRecoilState } from "recoil";
import { ICurrentModalStateInfo } from "../../../types/interface/modal.interface";
import PropTypes from "prop-types";

const ProfileEditModal = () => {
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );

  return (
    <ModalLayout
      modalName={ModalType.PROFILEEDIT}
      isOpen={currentOpenModal.profileEditModal}
    >
      <WrapperStyled>
        <NameStyled>
          <h1>오덕애비</h1>
          <img src="/src/assets/edit_icon.png" style={{ width: "20px" }} />
        </NameStyled>
        <ProfileImageStyled src="/src/assets/profileImage.jpg" />
        <CaptionStyled>
          안녕녕하세요 안녕녕하세요 안녕녕하세요 안녕녕하세요
        </CaptionStyled>
        <ButtonContainerStyled>
          <button>완료</button>
          <button>취소</button>
        </ButtonContainerStyled>
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
`;

const NameStyled = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 5px;
  h1 {
    width: 180px;
    font-size: 1.8rem;
    border-bottom: 1.5px solid var(--grey);
    text-align: center;
  }
  img {
    width: 20px;
    height: 20px;
  }
`;

const ProfileImageStyled = styled.img`
  border-radius: 100%;
  width: 100px;
  margin-top: 20px;
`;
const CaptionStyled = styled.div`
  display: flex; /* Use flexbox */
  align-items: center; /* Vertically center the text */
  justify-content: center; /* Horizontally center the text */
  height: 50px;
  width: 200px;
  border: 0.5px dashed;
  border-radius: 5px;
  background-color: #f1f1f1;
  margin-top: 25px;
  color: var(--grey, #000000);
  font-size: 1.4rem;
  text-align: center;
  word-break: keep-all;
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
    height: 25px;
    width: 100px;
    border-radius: 10px;
    border: none;
    &:nth-child(1) {
      background-color: var(--purple);
      color: var(--white);
    }
    &:nth-child(2) {
      background-color: var(--lightgrey);
      //   border: 1px solid var(--lightgrey);
      color: var(--white);
    }
    &:hover {
      opacity: 0.7;
    }
  }
`;

export default ProfileEditModal;
