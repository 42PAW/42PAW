import { ReactNode } from "react";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ModalType } from "../../types/enum/modal.enum";
import useModal from "../../hooks/useModal";

interface IModalLayoutProps {
  /**closeModal의 인자로 들어가며, 닫을 모달을 알려주기 위한 string*/
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
  const [isOpened, setIsOpened] = useState<boolean>(false);

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
  animation: ${fadeIn} 0.2s ease-in-out;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  box-shadow: var(--modal-shadow);
  animation: ${fadeIn} 0.2s ease-in-out;
`;

export default ModalLayout;
