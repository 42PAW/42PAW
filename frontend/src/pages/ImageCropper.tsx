import styled from "styled-components";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import useParseDate from "@/hooks/useParseDate";
import {
  FixedCropper,
  FixedCropperRef,
  ImageRestriction,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import {
  uploadFileState,
  uploadDefaultFileState,
  currentUploadIndexState,
} from "@/recoil/atom";

const ImageCropper = ({ src }: any) => {
  const cropperRef = useRef<FixedCropperRef>(null);
  const { parseDate } = useParseDate();
  const [uploadFiles, setUploadFiles] = useRecoilState<Blob[]>(uploadFileState);
  const [currentUploadIndex] = useRecoilState<number>(currentUploadIndexState);
  const [uploadDefaultFiles, setUploadDefaultFiles] = useRecoilState<Blob[]>(
    uploadDefaultFileState
  );

  const cropImage = () => {
    const canvas = cropperRef.current?.getCanvas() as HTMLCanvasElement;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.src = canvas.toDataURL("image/webp");

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        // Convert the canvas to a Blob in WebP format
        canvas.toBlob((webpBlob) => {
          if (webpBlob) {
            // Create a File object from the Blob
            const webpFile = new File([webpBlob], "image.webp", {
              type: "image/webp",
            });

            // Update the uploadFiles state with the new File object
            const newUploadFiles = [...uploadFiles];
            newUploadFiles[currentUploadIndex] = webpFile;
            setUploadFiles(newUploadFiles);
          }
        }, "image/webp");
      };
    }
  };

  const resetImage = () => {
    if (currentUploadIndex >= 0 && currentUploadIndex < uploadFiles.length) {
      const resetDefaultFiles = [...uploadDefaultFiles];
      const resetFiles = [...uploadFiles];
      resetFiles[currentUploadIndex] = uploadDefaultFiles[currentUploadIndex];
      setUploadFiles(resetFiles);
      setUploadDefaultFiles(resetDefaultFiles);
    }
  };

  return (
    <>
      <FixedCropperStyled
        src={src}
        ref={cropperRef}
        stencilProps={{
          handlers: false,
          lines: false,
          movable: false,
          resizable: false,
          grid: true,
        }}
        stencilSize={{
          width: 350,
          height: 350,
        }}
        imageRestriction={ImageRestriction.stencil}
      />
      <CropperUtilsStyled>
        <TodayDateStyled>{parseDate(new Date())}</TodayDateStyled>
        <CropSummitStyled onClick={cropImage}>
          <img src="/assets/crop.png" width="20px" height="20px" />
        </CropSummitStyled>
        <ResetButtonStyled onClick={resetImage}>
          <img src="/assets/reset.png" width="20px" height="20px" />
        </ResetButtonStyled>
      </CropperUtilsStyled>
    </>
  );
};

const FixedCropperStyled = styled(FixedCropper)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--transparent);
  overflow: auto;
  width: 55%;
  height: 285px;
  border-radius: 5px;
  border: 5px solid var(--white);
  margin-top: 5px;
`;

const CropperUtilsStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 55%;
  height: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const TodayDateStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  margin-right: 50%;
  font-size: 10px;
  color: var(--white);
  justify-content: flex-start;
  font-weight: lighter;
`;

const CropSummitStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--purple);
  pointer: cursor;
  width: 40px;
  height: 100%;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
  border: none;
  font-weight: lighter;
  box-shadow: 0px 4px 4px var(--grey);
  img {
    width: 15px;
    height: 15px;
  }
`;

const ResetButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--purple);
  pointer: cursor;
  width: 40px;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  font-weight: lighter;
  box-shadow: 0px 4px 4px var(--grey);
  img {
    width: 15px;
    height: 15px;
  }
`;

export default ImageCropper;
