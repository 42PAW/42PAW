import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { Section, SectionType } from "../SignUpPage";

/**
 * @nickname 유저가 설정한 닉네임
 * @caption 유저가 설정한 캡션
 * @sectionObserver ImageSection에서만 프로필 설정 변경 벼튼을 활성화
 */
interface IProfileCardProps {
  nickname: string;
  caption: string;
  step: SectionType;
}

const ProfileCard = ({ nickname, caption, step }: IProfileCardProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <ProfileCardStyled>
        <ProfileCardNicknameStyled>{nickname}</ProfileCardNicknameStyled>
        <ProfileCardEmptyImageStyled>
          <img src={imagePreview ? imagePreview : "/src/assets/userG.png"} />
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
        <ProfileCardSectionStyled>{caption}</ProfileCardSectionStyled>
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
  &:hover {
    color: var(--grey);
    font-weight: 500;
  }
  input {
    display: none;
  }
`;

const ProfileCardSectionStyled = styled.div`
  margin-top: 10px;
  font-size: 1.4rem;
`;

export default ProfileCard;
