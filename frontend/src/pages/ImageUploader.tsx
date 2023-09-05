import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import useParseDate from "@/hooks/useParseDate";
import { axiosCreateBoard } from "@/api/axios/axios.custom";
import { AnimalSpecies } from "@/types/enum/animal.filter.enum";
import AnimalButtonContainer from "@/components/AnimalButtonContainer";
import useToaster from "@/hooks/useToaster";
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
  uploadUrlArrayState,
} from "@/recoil/atom";

const ImageUploader = () => {
  const cropperRef = useRef<FixedCropperRef>(null);
  const [urlList, setUrlList] = useRecoilState<string[]>(uploadUrlArrayState);
  const [categoryList, setCategoryList] = useState<AnimalSpecies[]>([]);
  const [uploadFiles, setUploadFiles] = useRecoilState<Blob[]>(uploadFileState);
  const [uploadDefaultFiles, setUploadDefaultFiles] = useRecoilState<Blob[]>(
    uploadDefaultFileState
  );
  const [caption, setCaption] = useState("");
  const [prevIndex, setPrevIndex] = useState<number>(0);
  const [selectedPreviewIndex, setSelectedPreviewIndex] =
    useRecoilState<number>(currentUploadIndexState);

  const { popToast } = useToaster();
  const { parseDate } = useParseDate();

  const resetImage = () => {
    if (
      selectedPreviewIndex >= 0 &&
      selectedPreviewIndex < uploadFiles.length
    ) {
      const resetFiles = [...uploadFiles];
      resetFiles[selectedPreviewIndex] =
        uploadDefaultFiles[selectedPreviewIndex];
      setUploadFiles(resetFiles);
      const newUrlList = [...urlList];
      newUrlList[selectedPreviewIndex] = URL.createObjectURL(
        uploadFiles[selectedPreviewIndex]
      );
      setUrlList(newUrlList);
    }
  };

  const cropImage = (index: number) => {
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
            const webpFile = new File([webpBlob], "image.webp", {
              type: "image/webp",
            });
            const newUploadFiles = [...uploadFiles];
            newUploadFiles[index] = webpFile;
            setUploadFiles(newUploadFiles);
            const newUrlList = [...urlList];
            newUrlList[index] = URL.createObjectURL(webpFile);
            setUrlList(newUrlList);
          }
        }, "image/webp");
      };
    }
  };

  const handlePreviewClick = (index: number) => {
    console.log(prevIndex);
    cropImage(prevIndex);
    setSelectedPreviewIndex(index);
    setPrevIndex(index);
  };

  const handleDeleteClick = (indexToDelete: number) => {
    if (indexToDelete >= 0 && indexToDelete < uploadFiles.length) {
      const updatedFiles = uploadFiles.filter(
        (_, index) => index !== indexToDelete
      );
      const updatedDefaultFiles = uploadDefaultFiles.filter(
        (_, index) => index !== indexToDelete
      );
      setUploadFiles(updatedFiles);
      setUploadDefaultFiles(updatedDefaultFiles);
    }
  };

  const handleImageChange = (e: any) => {
    const selectedFiles: Blob[] = Array.from(e.target.files);
    if (!selectedFiles) return;
    if (selectedFiles.some((file: any) => file.size > 10000000)) {
      popToast("10MB 이하의 이미지만 업로드 가능합니다.", "N");
      return;
    }
    if (uploadFiles.length + selectedFiles.length > 5) {
      popToast("5개 이하의 이미지만 업로드 가능합니다.", "N");
      return;
    }
    const newUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setUrlList([...urlList, ...newUrls]);
    convertToWebp(selectedFiles);
  };

  const captionChange = (e: any) => {
    setCaption(e.target.value);
  };

  const convertToWebp = (files: any) => {
    files.forEach((file: Blob) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        canvas.toBlob((webpBlob) => {
          const webpFile = new File([webpBlob as BlobPart], "image.webp", {
            type: "image/webp",
          });
          setUploadFiles((prevUploadFiles) => [...prevUploadFiles, webpFile]);
          setUploadDefaultFiles((prevUploadDefaultFiles) => [
            ...prevUploadDefaultFiles,
            webpFile,
          ]);
        }, "image/webp");
      };
      img.src = URL.createObjectURL(file as Blob);
    });
  };

  // upload the board & send axios request
  const upload = async () => {
    if (uploadFiles.length === 0) {
      popToast("이미지를 업로드해주세요.", "N");
      return;
    }
    if (categoryList.length === 0) {
      popToast("카테고리를 선택해주세요.", "N");
      return;
    }
    try {
      cropImage(selectedPreviewIndex);
      const response = await axiosCreateBoard({
        mediaDataList: uploadFiles,
        categoryList: categoryList,
        content: caption,
      });
      popToast("업로드 완료!", "P");
      goHome();
      console.log(response);
    } catch (error) {
      throw error;
    }
  };

  // go home if u click cancel button
  const goHome = () => {
    window.location.href = "/";
    setUploadFiles([]);
    setCategoryList([]);
    setUrlList([]);
    setCaption("");
  };

  return (
    <WrapperStyled>
      <SmallPreviewStyled>
        {uploadFiles.map((file: Blob, index: number) => (
          <SmallPreviewUnitStyled
            key={index}
            onClick={() => handlePreviewClick(index)}
          >
            <img src={urlList[index]} alt={`Preview ${index + 1}`} />
            {index === selectedPreviewIndex && (
              <DeleteButtonStyled onClick={() => handleDeleteClick(index)}>
                x
              </DeleteButtonStyled>
            )}
          </SmallPreviewUnitStyled>
        ))}
        {uploadFiles.length < 5 && (
          <SmallUploadButtonWrapperStyled>
            <SmallUploadButton
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple
            />
          </SmallUploadButtonWrapperStyled>
        )}
      </SmallPreviewStyled>
      {uploadFiles.length > 0 &&
        uploadFiles.map((file: Blob, index: number) => (
          <>
            {index === selectedPreviewIndex && (
              <>
                <FixedCropperStyled
                  src={urlList[index]}
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
                  <ResetButtonStyled onClick={resetImage()}>
                    <img
                      src="/assets/reset.png"
                      alt="reset"
                      width="20px"
                      height="20px"
                    />
                  </ResetButtonStyled>
                </CropperUtilsStyled>
              </>
            )}
          </>
        ))}
      {uploadFiles.length === 0 && (
        <UploadMainPreviewWrapperStyled>
          <UploadDemandStyled>이미지를 업로드해주세요!</UploadDemandStyled>
          <UploadMainPreviewStyled
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />
        </UploadMainPreviewWrapperStyled>
      )}
      <DivisionLineStyled />
      <CaptionBoxStyled>
        <textarea
          id="expanding-input"
          placeholder="캡션을 입력하세요"
          value={caption}
          onChange={captionChange}
        />
      </CaptionBoxStyled>
      <CategoryButtonStyled>
        <AnimalButtonContainer
          columns={3}
          buttonRow={17}
          buttonFontSize={110}
          array={categoryList}
          setter={setCategoryList}
        />
      </CategoryButtonStyled>
      <ButtonDivStyled>
        <UploadbuttonStyled onClick={upload}>확인</UploadbuttonStyled>
        <CancelbuttonStyled onClick={goHome}>취소</CancelbuttonStyled>
      </ButtonDivStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 500px;
  height: 100%;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

const SmallPreviewStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 55%;
  border-radius: 10px;
  margin-top: 2%;
`;

const SmallPreviewUnitStyled = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 7px;
  background-color: var(--transparent);
  border: 4px solid var(--white);
  border-radius: 10px;
  overflow: hidden;
`;

const DeleteButtonStyled = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 3px 6px;
  font-size: 10px;
  cursor: pointer;
  opacity: 0.7;
`;

const SmallUploadButtonWrapperStyled = styled.div`
  background-image: url("/assets/upload.png");
  background-size: cover;
  border-radius: 10px;
  pointer: cursor;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
`;

const SmallUploadButton = styled.input`
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const UploadMainPreviewWrapperStyled = styled.div`
  width: 55%;
  height: 285px;
  justify-content: center;
  align-items: center;
  color: var(--white);
  border-radius: 5px;
  border: 5px solid var(--white);
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const UploadMainPreviewStyled = styled.input`
  opacity: 0;
  width: 100%;
  height: 93%;
  cursor: pointer;
`;

const UploadDemandStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%
  color: var(--white);
  font-size: 1.3rem;
`;

const DivisionLineStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 57%;
  height: 1px;
  background-color: var(--white);
`;

const CaptionBoxStyled = styled.div`
  display: flex;
  align-items: start;
  width: 60%;
  height: 4%;
  margin-top: 10px;
  margin-bottom: 10px;
  textarea {
    display: flex;
    width: 100%;
    height: 70%
    border: none;
    background: none;
    outline: none;
    border: none;
    caret-color: var(--white);
    color: var(--white);
    font-size: 12px;
    font-weight: lighter;
    white-space: pre-wrap;
    overflow-y: scroll;
    text-overflow: clip;
    &::placeholder {
      color: var(--white);
    }
`;

const CategoryButtonStyled = styled.div`
  display: flex;
  width: 75%;
  justify-content: center;
  align-items: center;
  background-color: var(--transparent);
  border-radius: 10px;
  padding: 10px;
`;

const ButtonDivStyled = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  margin-top: 5px;
`;

const UploadbuttonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer: cursor;
  width: 70px;
  height: 25px;
  font-size: 12px;
  background-color: var(--purple);
  color: var(--white);
  border: none;
  border-radius: 10px;
  margin-right: 10px;
  box-shadow: 0px 4px 4px var(--grey);
  &:hover {
    opacity: 0.5;
  }
`;

const CancelbuttonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 70px;
  height: 25px;
  font-size: 12px;
  background-color: var(--white);
  color: var(--black);
  border: none;
  border-radius: 10px;
  margin-left: 10px;
  box-shadow: 0px 4px 4px var(--grey);
  &:hover {
    opacity: 0.5;
  }
`;

// Cropper
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

export default ImageUploader;
