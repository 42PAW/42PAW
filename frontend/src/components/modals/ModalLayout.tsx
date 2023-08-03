import { ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import { ModalType } from "../../types/enum/modal.enum";
import useModal from "../../hooks/useModal";

/**
 * @modalName 닫으려는 타깃 모달명
 * @isOpen 타깃 모달이 열렸는지에 대한 boolean
 * @children 모달 레이아웃 안에 전달돼 렌더링할 요소
 */
interface IModalLayoutProps {
  modalName: ModalType;
  isOpen: boolean;
  children: ReactNode;
}

const ModalLayout: React.FC<IModalLayoutProps> = ({
  modalName,
  isOpen,
  children,
}) => {
  const { closeModal } = useModal();

  if (!isOpen) return null;
  return (
    <ModalOverlay onClick={() => closeModal(modalName)}>
      <ModalContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const ModalOverlay = styled.div`
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.2s;
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  box-shadow: var(--modal-shadow);
  animation: ${fadeIn} 0.2s;
`;

export default ModalLayout;
