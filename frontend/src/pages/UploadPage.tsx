import ImageUploader from "@/pages/ImageUploader";
import styled from "styled-components";

const UploadPage = () => {
  return (
    <WrapperStyled>
      <ImageUploader></ImageUploader>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  height: 100vh;
`;

export default UploadPage;
