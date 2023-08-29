import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { toastMessagesState } from "@/recoil/atom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { IToastInfo } from "@/types/interface/toast.interface";
import useDebounce from "@/hooks/useDebounce";

const Toast: React.FC = () => {
  const [toastMessages, setToastMessages] =
    useRecoilState<IToastInfo[]>(toastMessagesState);
  const { debounce } = useDebounce();
  const resetToastMessage = useResetRecoilState(toastMessagesState);

  useEffect(() => {
    debounce("toaster", closeAllToasts, 1300);
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
          $type={toast.type}
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
  $type: string;
}>`
  position: fixed;
  top: ${({ $index }) => 50 * $index + 20}px;
  right: 20px;
  background-color: ${({ $type }) =>
    $type === "P" ? "var(--white)" : $type === "N" ? "#fae4e3" : "#fae4e3"};
  color: ${({ $type }) =>
    $type === "P" ? "var(--grey)" : $type === "N" ? "#dd4e48" : "#dd4e48"};
  padding: 5px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  transition: opacity 0.3s ease-in-out;
  opacity: ${(props) => (props.$isToastPopped ? 1 : 0)};
  pointer-events: ${(props) => (props.$isToastPopped ? "auto" : "none")};
  animation: ${(props) => (props.$isToastPopped ? slideIn : slideOut)} 0.3s
    forwards;
`;

export default Toast;
