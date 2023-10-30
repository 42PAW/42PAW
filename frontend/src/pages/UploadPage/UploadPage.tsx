import ImageUploader from "@/pages/UploadPage/components/ImageUploader";
import styled from "styled-components";

const UploadPage = () => {
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
