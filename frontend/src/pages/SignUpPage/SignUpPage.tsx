import { useState } from "react";
import NicknameSection from "./Sections/NicknameSection";
import ProfileImageSection from "./Sections/ProfileImageSection";
import IntroductionSection from "./Sections/IntroductionSection";
import AnimalFilterSection from "./Sections/AnimalFilterSection";
import SuccessSection from "./Sections/SuccessSection";
import { AnimalSpecies } from "../../types/enum/animal.filter.enum";
import { styled } from "styled-components";
import ProfileCard from "./components/ProfileCard";
import Toaster from "../../components/toast/Toaster";

export enum Section {
  Nickname = "NicknameSection",
  ProfileImage = "ProfileImageSection",
  Introduction = "IntroductionSection",
  AnimalFilter = "AnimalFilterSection",
  Success = "SuccessSection",
}

export type SectionType =
  | Section.Nickname
  | Section.ProfileImage
  | Section.Introduction
  | Section.AnimalFilter
  | Section.Success;

interface IRegisterDataInfo {
  Nickname: string;
  ProfileImage: File | null;
  Introduction: string;
  AnimalFilter: AnimalSpecies[];
}

export interface SectionProps {
  registerData: IRegisterDataInfo;
  setRegisterData: React.Dispatch<React.SetStateAction<IRegisterDataInfo>>;
  setStep: React.Dispatch<React.SetStateAction<Section>>;
}

const SignUpPage = () => {
  const [registerData, setRegisterData] = useState<IRegisterDataInfo>({
    Nickname: "",
    ProfileImage: null,
    Introduction: "",
    AnimalFilter: [],
  });
  const [step, setStep] = useState<SectionType>(Section.Nickname);

  return (
    <MainStyled>
      {step === Section.Nickname && (
        <NicknameSection
          registerData={registerData}
          setRegisterData={setRegisterData}
          setStep={setStep}
        />
      )}
      {step === Section.ProfileImage && (
        <ProfileImageSection
          registerData={registerData}
          setRegisterData={setRegisterData}
          setStep={setStep}
        />
      )}
      {step === Section.Introduction && (
        <IntroductionSection
          registerData={registerData}
          setRegisterData={setRegisterData}
          setStep={setStep}
        />
      )}
      {step === Section.AnimalFilter && (
        <AnimalFilterSection
          registerData={registerData}
          setRegisterData={setRegisterData}
          setStep={setStep}
        />
      )}
      {step === Section.Success && (
        <SuccessSection
          registerData={registerData}
          setRegisterData={setRegisterData}
          setStep={setStep}
        />
      )}
      <ProfileCardWrapperStyled $step={step}>
        <ProfileCard
          nickname={registerData.Nickname}
          caption={registerData.Introduction}
          step={step}
        />
      </ProfileCardWrapperStyled>
      <Toaster />
    </MainStyled>
  );
};

const MainStyled = styled.main`
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
`;

const SectionContainer = styled.div<{ $visible: boolean }>`
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 1s ease;
  pointer-events: ${(props) => (props.$visible ? "auto" : "none")};
`;

const ProfileCardWrapperStyled = styled.div<{
  $step: SectionType;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  height: 100vh;
  transition: transform 1s ease-in-out, opacity 0.3s ease-in-out;
  opacity: ${(props) => (props.$step === Section.AnimalFilter ? 0 : 1)};
  transform: ${(props) => {
    switch (props.$step) {
      case Section.Nickname:
        return "translate(-50%, -130px)";
      case Section.ProfileImage:
        return "translate(-50%, -300px)";
      case Section.Introduction:
        return "translate(-50%, -470px)";
      case Section.AnimalFilter:
        return "translate(-50%, -470px)";
      case Section.Success:
        return "translate(-50%, -470px)";
    }
  }};
`;

export default SignUpPage;
