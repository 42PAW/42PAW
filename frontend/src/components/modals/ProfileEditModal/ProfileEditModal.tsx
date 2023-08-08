import { styled } from "styled-components";
import ModalLayout from "@/components/modals/ModalLayout";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState } from "@/recoil/atom";
import { useRecoilState } from "recoil";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import PropTypes from "prop-types";

interface Props {
  property1: "frame-16053";
  className: any;
  componentClassName: any;
  hasButton: boolean;
}
const ProfileEditModal = ({
  property1,
  className,
  componentClassName,
  hasButton = true,
}: Props): JSX.Element => {
  return (
    <WrapperStyled>
      <div className={`property-frame-wrapper ${className}`}>
        <div className={`component ${componentClassName}`}>
          {hasButton && <div className="button">Button</div>}
        </div>
      </div>
    </WrapperStyled>
  );
  //   const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
  //     currentOpenModalState
  //   );

  //   return (
  //     <ModalLayout
  //       modalName={ModalType.PROFILEEDIT}
  //       isOpen={currentOpenModal.profileEditModal}
  //     >
  //       <WrapperStyled>
  //         <h1>오덕애비</h1>
  //         <ProfileImageStyled src="/src/assets/profileImage.jpg" />
  //         <CaptionStyled>안녕하세요안녕하세요안녕하세요안녕하세요</CaptionStyled>
  //         <ButtonContainerStyled>
  //           <button>프로필</button>
  //           <button>팔로우</button>
  //         </ButtonContainerStyled>
  //         <SubButtonContainerStyled>
  //           <button>
  //             <img src="/src/assets/ban.png" />
  //             차단하기
  //           </button>
  //           <button>
  //             <img src="/src/assets/report.png" />
  //             신고하기
  //           </button>
  //         </SubButtonContainerStyled>
  //       </WrapperStyled>
  //     </ModalLayout>
  //   );
};

ProfileEditModal.propTypes = {
  property1: PropTypes.oneOf(["frame-16053"]),
  hasButton: PropTypes.bool,
};
const WrapperStyled = styled.div`
  .property-frame-wrapper {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 45px;
    justify-content: center;
    position: relative;
    width: 89px;
  }

  .property-frame-wrapper .component {
    align-items: flex-start;
    background-color: #020080;
    border-radius: 1000px;
    display: inline-flex;
    flex: 0 0 auto;
    gap: 10px;
    padding: 10px 25px;
    position: relative;
  }

  .property-frame-wrapper .button {
    color: #ffffff;
    font-family: "Inter-SemiBold", Helvetica;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: normal;
    margin-top: -1px;
    position: relative;
    text-align: center;
    width: fit-content;
  }
`;

// const WrapperStyled = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 280px;
//   background-color: var(--white);
//   border-radius: 15px;
//   color: var(--grey);
//   h1 {
//     font-size: 18px;
//     margin-top: 40px;
//     margin-bottom: 5px;
//   }
// `;

// const ProfileImageStyled = styled.img`
//   border-radius: 100%;
//   width: 100px;
// `;
// const CaptionStyled = styled.div`
//   margin-top: 25px;
//   font-size: 13px;
// `;

// const ButtonContainerStyled = styled.div`
//   margin-top: 30px;
//   margin: 25px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width: 215px;
//   button {
//     cursor: pointer;
//     height: 40px;
//     width: 100px;
//     border-radius: 10px;
//     border: none;
//     &:nth-child(1) {
//       background-color: var(--purple);
//       color: var(--white);
//     }
//     &:nth-child(2) {
//       background-color: var(--white);
//       border: 1px solid var(--grey);
//       color: var(--grey);
//     }
//     &:hover {
//       opacity: 0.7;
//     }
//   }
// `;

// const SubButtonContainerStyled = styled.div`
//   margin-top: -8px;
//   padding-bottom: 25px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 160px;
//   button {
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border: none;
//     background-color: var(--white);
//     color: var(--lightgrey);
//     font-size: 12px;
//     width: 50%;
//     &:hover {
//       opacity: 0.7;
//     }
//   }
//   img {
//     width: 14px;
//     margin-right: 5px;
//   }
// `;

export default ProfileEditModal;
