import { styled } from "styled-components";
import ModalLayout from "@/components/modals/ModalLayout";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState, myProfileInfoState } from "@/recoil/atom";
import { useRecoilState } from "recoil";
import useModal from "../../../hooks/useModal";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import { useMutation } from "@tanstack/react-query";
import { axiosChangeMyProfile } from "@/api/axios/axios.custom";
import { ChangeEvent, useState } from "react";
import {
  MemberProfileChangeRequestDto,
  MemberProfileChangeResponseDto,
} from "@/types/dto/member.dto";

const ProfileEditModal = () => {
  const [previousProfileInfo] =
    useRecoilState<MemberProfileChangeResponseDto>(myProfileInfoState);
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const { closeModal } = useModal();
  const [profileInfo, setProfileInfo] = useState<MemberProfileChangeRequestDto>(
    {
      memberName: previousProfileInfo?.memberName!,
      imageData: null,
      statement: previousProfileInfo?.statement!,
    }
  );
  const editProfileMutation = useMutation(
    (profileInfo: MemberProfileChangeRequestDto) =>
      axiosChangeMyProfile(profileInfo)
  );
  const onChangeProfileInfo = () => {
    console.log(profileInfo);
    editProfileMutation.mutate(profileInfo);
  };
  // img wepb 변환
  const [imagePreview, setImagePreview] = useState<string>(
    previousProfileInfo?.imageData!
  );

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageBitmap = await createImageBitmap(file);
      const canvas = document.createElement("canvas");
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(imageBitmap, 0, 0);
        canvas.toBlob(async (webpBlob) => {
          if (webpBlob) {
            setProfileInfo({ ...profileInfo, imageData: webpBlob });
            const webpDataURL = URL.createObjectURL(webpBlob);
            setImagePreview(webpDataURL);
          }
        }, "image/webp");
      }
    }
  };
  // img wepb 변환

  return (
    <ModalLayout
      modalName={ModalType.PROFILEEDIT}
      isOpen={currentOpenModal.profileEditModal}
    >
      <WrapperStyled>
        <NameStyled>
          <table>
            <tbody>
              <tr>
                <td>
                  <Person.Text>이름</Person.Text>
                </td>
                <td>
                  <input
                    type="text"
                    value={profileInfo.memberName}
                    onChange={(e) =>
                      setProfileInfo((profileInfo) => {
                        return {
                          ...profileInfo,
                          memberName: e.target.value,
                        };
                      })
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </NameStyled>
        <img src={imagePreview ? imagePreview : "/assets/userG.png"} />

        <input
          type="file"
          accept="image/*"
          id="profileImage"
          onChange={handleImageChange}
        />
        <table>
          <tbody>
            <tr>
              <td>
                <Person.Text>한 줄 소개</Person.Text>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="최대 30자 이내" // 국가에 따라 언어 변경
                  value={profileInfo.statement}
                  maxLength={30}
                  onChange={(e) =>
                    setProfileInfo((profileInfo) => {
                      return {
                        ...profileInfo,
                        statement: e.target.value,
                      };
                    })
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
        {/* <CaptionStyled>{profileInfo.statement}</CaptionStyled> */}
        <ButtonContainerStyled>
          <button onClick={onChangeProfileInfo}>완료</button>
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

const Person = {
  InputTable: styled.table`
    border-spacing: 18px 0;

    text-align: center;

    margin: 0 auto;
  `,

  Text: styled.h3``,

  SaveButton: styled.button`
    width: 92px;
    height: 32px;

    border: none;
    border-radius: 8px;

    background-color: orange;

    color: #fff;

    cursor: pointer;
  `,
};

export default ProfileEditModal;
