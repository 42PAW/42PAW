import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Section, SectionType } from "@/pages/SignUpPage/SignUpPage";
import { SignUpInfoDTO } from "@/types/dto/member.dto";

/**
 * @registerData.memberName 유저가 설정한 닉네임
 * @statement 유저가 설정한 캡션
 * @sectionObserver ImageSection에서만 프로필 설정 변경 벼튼을 활성화
 */
interface IProfileCardProps {
  registerData: SignUpInfoDTO;
  setRegisterData: React.Dispatch<React.SetStateAction<SignUpInfoDTO>>;
  step: SectionType;
}

const ProfileCard = ({
  registerData,
  setRegisterData,
  step,
}: IProfileCardProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
            setRegisterData({ ...registerData, imageData: webpBlob });
            const webpDataURL = URL.createObjectURL(webpBlob);
            setImagePreview(webpDataURL);
          }
        }, "image/webp");
      }
    }
  };

  return (
    <>
      <ProfileCardStyled>
        <ProfileCardNicknameStyled>
          {registerData.memberName}
        </ProfileCardNicknameStyled>
        <ProfileCardEmptyImageStyled>
          <img src={imagePreview ? imagePreview : "/assets/userG.png"} />
        </ProfileCardEmptyImageStyled>
        <ProfileCardFormStyled>
          {step === Section.ProfileImage ? (
            <label htmlFor="profileImage">프로필 사진 변경</label>
          ) : null}
          <input
            type="file"
            accept="image/*"
            id="profileImage"
            onChange={handleImageChange}
          />
        </ProfileCardFormStyled>
        <ProfileCardSectionStyled>
          {registerData.statement}
        </ProfileCardSectionStyled>
      </ProfileCardStyled>
    </>
  );
};

const ProfileCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 330px;
  height: 420px;
  border-radius: 30px;
  background-color: var(--white);
  box-shadow: var(--default-shadow);
`;

const ProfileCardNicknameStyled = styled.div`
  height: 50px;
  margin-top: 40px;
  font-size: 1.6rem;
`;

const ProfileCardEmptyImageStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  height: 150px;
  width: 150px;
  border-radius: 100%;
  font-size: 50px;
  overflow: hidden;
  img {
    width: 100%;
  }
`;

const ProfileCardFormStyled = styled.form`
  margin-top: 15px;
  font-size: 15px;
  color: var(--lightgrey);
  input {
    display: none;
  }
  label {
    cursor: pointer;
    &:hover {
      color: var(--grey);
      font-weight: 500;
    }
  }
`;

const ProfileCardSectionStyled = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 1.4rem;
  width: 75%;
  line-height: 20px;
`;

export default ProfileCard;
