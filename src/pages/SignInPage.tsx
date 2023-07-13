import { useState, useEffect } from "react";
import styled from "styled-components";
import TypingEffect from "../components/TypingEffect";

const SignInPage = () => {
  const [visibleSection, setvisibleSection] = useState(0);
  const [displayNone, setdisplayNone] = useState(0);
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    setvisibleSection(1);
    setdisplayNone(1);
  }, [visibleSection === 0]);

  const terminateNicknameSection = (event: any) => {
    if (event.keyCode === 13) {
      setNickname(event.target.value);
      setvisibleSection(2);
      setTimeout(function () {
        setdisplayNone(2);
      }, 1000);
    }
  };
  const terminateImageSection = () => {
    setvisibleSection(3);
    setTimeout(function () {
      setdisplayNone(3);
    }, 1000);
  };
  const terminateCaptionSection = (event: any) => {
    if (event.keyCode === 13) {
      setNickname(event.target.value);
      setvisibleSection(4);
      setTimeout(function () {
        setdisplayNone(4);
      }, 1000);
    }
  };
  return (
    <WrapperStyled>
      <NicknameSectionStyled $visible={visibleSection} $display={displayNone}>
        <h1>당신의 닉네임은 무엇인가요?</h1>
        <input type="text" onKeyDown={terminateNicknameSection}></input>
        <ProfileCardStyled>{nickname}</ProfileCardStyled>
      </NicknameSectionStyled>
      <ImageSectionStyled $visible={visibleSection} $display={displayNone}>
        <h1>사진을 변경해 주세요</h1>
        <button onClick={terminateImageSection}>확인</button>
        <ProfileCardStyled>{nickname}</ProfileCardStyled>
      </ImageSectionStyled>
      <CaptionSectionStyled $visible={visibleSection} $display={displayNone}>
        <ProfileCardStyled>{nickname}</ProfileCardStyled>
        <h1>
          자신을 잘 표현하는 <br /> 소개를 적어 주세요
        </h1>
        <input type="text" onKeyDown={terminateCaptionSection}></input>
      </CaptionSectionStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-family: "Nunito Sans";
`;

const ProfileCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 700px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #929292;
`;

const NicknameSectionStyled = styled.div`
  display: ${(props) => (props.$display < 2 ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.$visible === 1 ? 1 : 0)};
  transition: ${(props) =>
    props.$visible === 1 ? "opacity 3s ease" : "opacity 1s ease"};
  margin-top: 350px;
  h1 {
    font-size: 60px;
  }
  input {
    width: 600px;
    height: 80px;
    border: none;
    border-radius: 25px;
    font-size: 50px;
    padding-left: 20px;
    outline: none;
    margin-bottom: 200px;
  }
  & > :nth-child(3) {
  }
`;

const ImageSectionStyled = styled.div`
  display: ${(props) => (props.$display < 3 ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.$visible === 2 ? 1 : 0)};
  transition: ${(props) =>
    props.$visible === 2 ? "opacity 5s ease" : "opacity 1s ease"};
  margin-top: 250px;
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

const CaptionSectionStyled = styled.div`
  display: ${(props) => (props.$display < 4 ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.$visible === 3 ? 1 : 0)};
  transition: ${(props) =>
    props.$visible === 3 ? "opacity 5s ease" : "opacity 1s ease"};
  h1 {
    font-size: 60px;
  }
  input {
    width: 600px;
    height: 80px;
    border: none;
    border-radius: 25px;
    font-size: 50px;
    padding-left: 20px;
    outline: none;
    margin-bottom: 200px;
  }
  & > :nth-child(1) {
    transition: ${(props) =>
      props.$visible === 3 ? "opacity 5s ease" : "opacity 1s ease"};
    margin-top: -300px;
  }
`;

export default SignInPage;
