// Modal.js
import { ReactNode } from "react";
import styled from "styled-components";

interface IModalLayoutProps {
  /**closeModal의 인자로 들어가며, 닫을 모달을 알려주기 위한 string*/
  modalName: string;
  isOpen: boolean;
  closeModal: (modalName: string) => void;
  children: ReactNode;
}

const ModalLayout: React.FC<IModalLayoutProps> = ({
  modalName,
  isOpen,
  closeModal,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={() => closeModal(modalName)}>
      <ModalContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
};

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
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  box-shadow: var(--default-shadow);
`;

export default ModalLayout;
