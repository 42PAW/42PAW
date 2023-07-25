// Modal.js
import { ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalLayout: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
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
  background-color: var(--white);
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: var(--default-shadow);
`;

export default ModalLayout;
