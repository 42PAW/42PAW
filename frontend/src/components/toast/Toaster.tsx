import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { toastMessagesState } from "../../recoil/atom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { IToastInfo } from "../../types/interface/toast.interface";

const Toast: React.FC = () => {
  const [toastMessages, setToastMessages] =
    useRecoilState<IToastInfo[]>(toastMessagesState);
  const resetToastMessage = useResetRecoilState(toastMessagesState);

  useEffect(() => {
    const timer = setTimeout(() => {
      closeAllToasts();
    }, 3000);
    return () => clearTimeout(timer);
  }, [toastMessages]);

  const closeAllToasts = () => {
    const updatedToasts = toastMessages.map((toast) => ({
      ...toast,
      isPopped: false,
    }));
    setToastMessages(updatedToasts);
    setTimeout(() => {
      resetToastMessage();
    }, 200);
  };

  return (
    <>
      {toastMessages.map((toast, index) => (
        <ToastWrapperStyled
          key={index}
          $index={index}
          $isToastPopped={toast.isPopped}
          onClick={closeAllToasts}
        >
          <p>{toast.text}</p>
        </ToastWrapperStyled>
      ))}
    </>
  );
};

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const ToastWrapperStyled = styled.div<{
  $index: number;
  $isToastPopped: boolean;
}>`
  position: fixed;
  top: ${({ $index }) => 60 * $index + 20}px;
  right: 20px;
  background-color: var(--white);
  color: var(--lightgrey);
  padding: 5px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  transition: opacity 0.3s ease-in-out;
  opacity: ${(props) => (props.$isToastPopped ? 1 : 0)};
  pointer-events: ${(props) => (props.$isToastPopped ? "auto" : "none")};
  animation: ${(props) => (props.$isToastPopped ? slideIn : slideOut)} 0.3s
    forwards;
`;

export default Toast;
