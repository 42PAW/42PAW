import { styled } from "styled-components";
import ModalLayout from "@/components/modals/ModalLayout";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState } from "@/recoil/atom";
import { useRecoilState } from "recoil";
import useModal from "../../../hooks/useModal";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";

const profileInfo = {
  memberName: "오덕애비",
  nicknameUpdatedAt: "2023-01-23",
  profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  statement: "강아지는 항상 옳다. 오덕아 사랑해",
  followingCount: 279,
  followerCount: 678,
  boardCount: 3423434347,
};

const ProfileEditModal = () => {
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const { closeModal } = useModal();

  return (
    <ModalLayout
      modalName={ModalType.PROFILEEDIT}
      isOpen={currentOpenModal.profileEditModal}
    >
      <WrapperStyled>
        <NameStyled>
          <h1>{profileInfo.memberName}</h1>
          <button
            onClick={() => {
              alert("click!");
            }}
          >
            <img src="/src/assets/edit_icon.png" />
          </button>
        </NameStyled>
        <ProfileImageStyled src={profileInfo.profileImage} />
        <CaptionStyled>{profileInfo.statement}</CaptionStyled>
        <ButtonContainerStyled>
          <button>완료</button>
          <button onClick={() => closeModal(ModalType.PROFILEEDIT)}>
            취소
          </button>
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
  button {
    background-color: transparent;
    border: none;
    img {
      width: 20px;
      height: 20px;
    }
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
  width: 180px;
  border: 0.5px dashed;
  border-radius: 5px;
  background-color: #f1f1f1;
  margin-top: 25px;
  color: var(--grey, #000000);
  font-size: 1.4rem;
  text-align: center;
  word-break: keep-all;
  padding-inline: 10px;
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
