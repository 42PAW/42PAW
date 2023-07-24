import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";
import AnimalButtonContainer from "../../components/AnimalButtonContainer";
import confetti from "https://esm.run/canvas-confetti@1";

interface ISectionStateInfo {
  isFirstSectionVisible: boolean;
  isFirstSectionDisplayed: boolean;
  isSecondSectionVisible: boolean;
  isSecondSectionDisplayed: boolean;
  isThirdSectionVisible: boolean;
  isThirdSectionDisplayed: boolean;
  isFourthSectionVisible: boolean;
  isFourthSectionDisplayed: boolean;
}

const SignUpPage: React.FC = () => {
  const [sectionState, setSectionState] = useState<ISectionStateInfo>({
    isFirstSectionVisible: false,
    isFirstSectionDisplayed: true,
    isSecondSectionVisible: false,
    isSecondSectionDisplayed: false,
    isThirdSectionVisible: false,
    isThirdSectionDisplayed: false,
    isFourthSectionVisible: false,
    isFourthSectionDisplayed: false,
  });
  const [sectionObserver, setSectionObserver] = useState<number>(0);
  const [nickname, setNickname] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const navigator = useNavigate();

  /**마지막 섹션에서 메인 페이지로 자동 리다이렉션 */
  if (sectionObserver === 4) {
    setTimeout(() => {
      navigator("/");
    }, 3000);
  }

  useEffect(() => {
    setSectionState({ ...sectionState, isFirstSectionVisible: true });
  }, []);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  const terminateNicknameSection = (
    event?:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event === undefined) return;

    const e = event.keyCode ?? 13;
    if (e === 13) {
      setNickname(event.currentTarget.value);
      setSectionState({ ...sectionState, isFirstSectionVisible: false });
      setSectionObserver(sectionObserver + 1);
      setTimeout(() => {
        setSectionState({
          ...sectionState,
          isFirstSectionDisplayed: false,
          isSecondSectionDisplayed: true,
        });
        setTimeout(() => {
          setSectionState({
            ...sectionState,
            isFirstSectionDisplayed: false,
            isSecondSectionDisplayed: true,
            isSecondSectionVisible: true,
          });
        }, 500);
      }, 500);
    }
  };

  const terminateImageSection = () => {
    setSectionState({ ...sectionState, isSecondSectionVisible: false });
    setSectionObserver(sectionObserver + 1);
    setTimeout(() => {
      setSectionState({
        ...sectionState,
        isSecondSectionDisplayed: false,
        isThirdSectionDisplayed: true,
      });
      setTimeout(() => {
        setSectionState({
          ...sectionState,
          isSecondSectionDisplayed: false,
          isThirdSectionDisplayed: true,
          isThirdSectionVisible: true,
        });
      }, 500);
    }, 500);
  };

  const terminateCaptionSection = (
    event?:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event === undefined) return;

    const e = event.keyCode ?? 13;
    if (e === 13) {
      setCaption(event.currentTarget.value);
      setSectionState({ ...sectionState, isThirdSectionVisible: false });
      setSectionObserver(sectionObserver + 1);
      setTimeout(() => {
        setSectionState({
          ...sectionState,
          isThirdSectionDisplayed: false,
          isFourthSectionDisplayed: true,
        });
        setTimeout(() => {
          setSectionState({
            ...sectionState,
            isThirdSectionDisplayed: false,
            isFourthSectionDisplayed: true,
            isFourthSectionVisible: true,
          });
        }, 500);
      }, 500);
    }
  };

  const terminateAnimalCategorySection = () => {
    setSectionState({ ...sectionState, isFourthSectionVisible: false });
    setSectionObserver(sectionObserver + 1);
    confetti({
      particleCount: 300,
      spread: 200,
    });
    setSectionState({
      ...sectionState,
      isFourthSectionDisplayed: false,
    });
  };

  return (
    <WrapperStyled>
      <NicknameSectionStyled $sectionState={sectionState}>
        <h1>당신의 닉네임은 무엇인가요?</h1>
        <InputContainerStyled>
          <InputBoxStyled
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            onKeyDown={terminateNicknameSection}
            maxLength={9}
          ></InputBoxStyled>
          <InputButtonStyled onClick={terminateNicknameSection}>
            <img src="/src/assets/arrowW.png" />
          </InputButtonStyled>
        </InputContainerStyled>
      </NicknameSectionStyled>
      <ImageSectionStyled $sectionState={sectionState}>
        <h1>사진을 변경해 주세요</h1>
        <InputButtonStyled onClick={terminateImageSection}>
          <img src="/src/assets/arrowW.png" />
        </InputButtonStyled>
      </ImageSectionStyled>
      <CaptionSectionStyled $sectionState={sectionState}>
        <h1>
          자신을 잘 표현하는 <br /> 소개를 적어 주세요
        </h1>
        <InputContainerStyled>
          <InputBoxStyled
            type="text"
            value={caption}
            onChange={handleCaptionChange}
            onKeyDown={terminateCaptionSection}
            maxLength={20}
          ></InputBoxStyled>
          <InputButtonStyled onClick={terminateCaptionSection}>
            <img src="/src/assets/arrowW.png" />
          </InputButtonStyled>
        </InputContainerStyled>
      </CaptionSectionStyled>
      <AnimalCategorySectionStyled $sectionState={sectionState}>
        <h1>
          만나고 싶은 동물 친구들을 <br /> 선택해 주세요.
        </h1>
        <AnimalButtonContainer />
        <InputButtonStyled onClick={terminateAnimalCategorySection}>
          <img src="/src/assets/arrowW.png" />
        </InputButtonStyled>
      </AnimalCategorySectionStyled>
      <ProfileCardWrapperStyled $sectionObserver={sectionObserver}>
        <h1>환영합니다, {nickname} 님!</h1>
        <ProfileCard
          nickname={nickname}
          caption={caption}
          sectionObserver={sectionObserver}
        />
      </ProfileCardWrapperStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  min-height: 860px;
`;

const InputContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 630px;
`;

const InputBoxStyled = styled.input`
  width: 500px;
  height: 80px;
  border: none;
  border-radius: 25px;
  font-size: 50px;
  padding-left: 20px;
  outline: none;
  background-color: #fdfdfd39;
  color: #ffffff;
`;

const InputButtonStyled = styled.button`
  background-color: transparent;
  border: none;
  img {
    width: 80px;
    opacity: 0.7;
  }
  img:hover {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }
`;

const NicknameSectionStyled = styled.div<{ $sectionState: ISectionStateInfo }>`
  display: ${(props) =>
    props.$sectionState.isFirstSectionDisplayed ? "flex" : "none"};
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.$sectionState.isFirstSectionVisible ? 1 : 0)};
  transition: ${(props) =>
    props.$sectionState.isFirstSectionVisible
      ? "opacity 3s ease"
      : "opacity 1s ease"};
  h1 {
    font-size: 60px;
  }
`;

const ImageSectionStyled = styled.div<{ $sectionState: ISectionStateInfo }>`
  display: ${(props) =>
    props.$sectionState.isSecondSectionDisplayed ? "flex" : "none"};
  flex-direction: column;
  align-items: center;
  margin-bottom: 200px;
  opacity: ${(props) => (props.$sectionState.isSecondSectionVisible ? 1 : 0)};
  transition: ${(props) =>
    props.$sectionState.isSecondSectionVisible
      ? "opacity 3s ease"
      : "opacity 1s ease"};
  h1 {
    font-size: 60px;
  }
  button {
    width: 200px;
    height: 50px;
    border: none;
    border-radius: 50px;
    font-size: 20px;
  }
  & > :nth-child(3) {
    margin-top: 100px;
  }
`;

const CaptionSectionStyled = styled.div<{ $sectionState: ISectionStateInfo }>`
  display: ${(props) =>
    props.$sectionState.isThirdSectionDisplayed ? "flex" : "none"};
  flex-direction: column;
  align-items: center;
  margin-bottom: 550px;
  opacity: ${(props) => (props.$sectionState.isThirdSectionVisible ? 1 : 0)};
  transition: ${(props) =>
    props.$sectionState.isThirdSectionVisible
      ? "opacity 1s ease"
      : "opacity 1s ease"};
  h1 {
    font-size: 60px;
  }
`;

const AnimalCategorySectionStyled = styled.div<{
  $sectionState: ISectionStateInfo;
}>`
  display: ${(props) =>
    props.$sectionState.isFourthSectionDisplayed ? "flex" : "none"};
  flex-direction: column;
  align-items: center;
  margin-bottom: 150px;
  width: 30%;
  min-width: 650px;
  opacity: ${(props) => (props.$sectionState.isFourthSectionVisible ? 1 : 0)};
  transition: ${(props) =>
    props.$sectionState.isFourthSectionVisible
      ? "opacity 1s ease"
      : "opacity 0s ease"};
  h1 {
    font-size: 60px;
  }
  img {
    margin-top: 100px;
  }
`;

const ProfileCardWrapperStyled = styled.div<{
  $sectionObserver: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: ${(props) => (props.$sectionObserver === 4 ? "none" : "absolute")};
  top: 100%;
  margin-top: ${(props) => {
    switch (props.$sectionObserver) {
      case 0:
        return "-200px";
      case 1:
        return "-360px";
      case 2:
        return "-500px";
      case 3:
        return "0px";
      case 4:
        return "0px";
    }
  }};
  transition: margin-top 2s ease-in-out;
  h1 {
    display: ${(props) => (props.$sectionObserver === 4 ? "flex" : "none")};
    font-size: 60px;
    margin-top: -80px;
  }
`;

export default SignUpPage;
