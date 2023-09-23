import ImageUploader from "@/pages/ImageUploader";
import styled from "styled-components";
import { getCookie } from "@/api/cookie/cookies";
import { useEffect } from "react";
import useNavigateCustom from "@/hooks/useNavigateCustom";
import useModal from "@/hooks/useModal";
import { ModalType } from "@/types/enum/modal.enum";

const token = getCookie("access_token");

const UploadPage = () => {
  const { moveToMain } = useNavigateCustom();
  const { openModal } = useModal();

  useEffect(() => {
    if (token === undefined) {
      moveToMain();
      openModal(ModalType.LOGIN);
    }
  }, []);

  return (
    <WrapperStyled>
      <ImageUploader></ImageUploader>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  overflow-y: scroll;
`;

export default UploadPage;
