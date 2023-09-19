import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Section, SectionType } from "@/pages/SignUpPage/SignUpPage";
import { SignUpInfoDTO } from "@/types/dto/member.dto";
import useToaster from "@/hooks/useToaster";
import processImage from "@/components/processImage";
import { languageState } from "@/recoil/atom";
import { useRecoilState } from "recoil";
import LoadingDotsAnimation from "@/components/loading/LoadingDotsAnimation";

/**
 * @registerData.memberName 유저가 설정한 닉네임
 * @statement 유저가 설정한 캡션
 * @sectionObserver ImageSection에서만 프로필 설정 변경 벼튼을 활성화
 */
interface IProfileCardProps {
  registerData: SignUpInfoDTO;
  setRegisterData: React.Dispatch<React.SetStateAction<SignUpInfoDTO>>;
  step: SectionType;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileCard = ({
  registerData,
  setRegisterData,
  step,
  isLoading,
  setIsLoading,
}: IProfileCardProps) => {
  const [language] = useRecoilState<any>(languageState);
  const [imagePreview, setImagePreview] = useState<string>("");
  const { popToast } = useToaster();
  // const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = e.target.files?.[0];
    if (file) {
      if (
        await processImage(file, registerData, setRegisterData, setImagePreview)
      ) {
        popToast("10MB 이하의 이미지만 업로드 가능합니다.", "N");
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <ProfileCardStyled
        $imageUploadEnabled={isLoading || step != Section.ProfileImage}
      >
        <ProfileCardNicknameStyled>
          {registerData.memberName}
        </ProfileCardNicknameStyled>
        <ProfileCardEmptyImageStyled>
          <LabelWrapper>
            <LabelStyled htmlFor="profileImage" $isLoading={isLoading}>
              <img src={imagePreview ? imagePreview : "/assets/userG.png"} />
              {isLoading && (
                <LoadingStyled>
                  <LoadingDotsAnimation />
                </LoadingStyled>
              )}
            </LabelStyled>
          </LabelWrapper>
        </ProfileCardEmptyImageStyled>
        <ProfileCardFormStyled>
          {step === Section.ProfileImage ? (
            <label htmlFor="profileImage">
              {language.changeProfilePicture}
            </label>
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

const LoadingStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const ProfileCardStyled = styled.div<{ $imageUploadEnabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 330px;
  height: 420px;
  border-radius: 30px;
  background-color: var(--white);
  box-shadow: var(--default-shadow);
  label {
    pointer-events: ${(props) => props.$imageUploadEnabled && "none"};
  }
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

const LabelWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  aspect-ratio: 1 / 1;
`;

const LabelStyled = styled.label<{ $isLoading: boolean }>`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    filter: ${(props) => (props.$isLoading ? "brightness(70%)" : "none")};
  }

  /* loadingDotsAnimation의 스타일 */
  ${LoadingStyled} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2; /* loadingDotsAnimation을 이미지 위에 올립니다. */
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
