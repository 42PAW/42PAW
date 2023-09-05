import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NicknameSection from "@/pages/SignUpPage/Sections/NicknameSection";
import ProfileImageSection from "@/pages/SignUpPage/Sections/ProfileImageSection";
import IntroductionSection from "@/pages/SignUpPage/Sections/IntroductionSection";
import AnimalFilterSection from "@/pages/SignUpPage/Sections/AnimalFilterSection";
import SuccessSection from "@/pages/SignUpPage/Sections/SuccessSection";
import { styled } from "styled-components";
import ProfileCard from "@/pages/SignUpPage/components/ProfileCard";
import Toaster from "@/components/toast/Toaster";
import { SignUpInfoDTO } from "@/types/dto/member.dto";
import { getCookie } from "@/api/cookie/cookies";
import jwtDecode from "jwt-decode";

const token = getCookie("access_token");

interface IToken {
  campus: string;
  email: string;
  exp: number;
  oauthName: string;
  role: string;
}

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

export interface SectionProps {
  registerData: SignUpInfoDTO;
  setRegisterData: React.Dispatch<React.SetStateAction<SignUpInfoDTO>>;
  setStep: React.Dispatch<React.SetStateAction<Section>>;
}

const SignUpPage = () => {
  const [registerData, setRegisterData] = useState<SignUpInfoDTO>({
    memberName: "",
    imageData: null,
    statement: "",
    categoryFilters: [],
  });
  const [step, setStep] = useState<SectionType>(Section.Nickname);
  const navigator = useNavigate();

  useEffect(() => {
    if (!token) {
      navigator("/");
    }
    if (token) {
      try {
        const decodedToken: IToken = jwtDecode(token);
        if (decodedToken?.role === "USER") {
          navigator("/");
        }
      } catch (error) {
        navigator("/");
      }
    }
  }, []);

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
      <ProfileCardContainerStyled $step={step}>
        <ProfileCard
          registerData={registerData}
          setRegisterData={setRegisterData}
          step={step}
        />
      </ProfileCardContainerStyled>
      <Toaster />
    </MainStyled>
  );
};

const MainStyled = styled.main`
  position: relative;
  overflow: hidden;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
`;

const ProfileCardContainerStyled = styled.div<{
  $step: SectionType;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  height: 100vh;
  transition: transform 0.8s ease-in-out, opacity 0.4s ease-in-out;
  opacity: ${(props) => (props.$step === Section.AnimalFilter ? 0 : 1)};
  transform: ${(props) => {
    switch (props.$step) {
      case Section.Nickname:
        return "translate(-50%, -130px)";
      case Section.ProfileImage:
        return "translate(-50%, -300px)";
      case Section.Introduction:
        return "translate(-50%, -450px)";
      case Section.AnimalFilter:
        return "translate(-50%, -450px)";
      case Section.Success:
        return "translate(-50%, -450px)";
    }
  }};
`;

export default SignUpPage;
