import styled from "styled-components";
import { ChangeEvent, useState, useRef } from "react";
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
import heic2any from "heic2any";
import imageCompression from "browser-image-compression";

const ImageUploader = () => {
  const cropperRef = useRef<FixedCropperRef>(null);
  const [categoryList, setCategoryList] = useState<AnimalSpecies[]>([]);
  const [uploadFiles, setUploadFiles] = useState<Blob[]>([]);
  const [uploadDefaultFiles, setUploadDefaultFiles] = useState<Blob[]>([]);
  const [urlList, setUrlList] = useState<string[]>([]);
  const [urlDefaultList, setUrlDefaultList] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState<number>(0);

  const { popToast } = useToaster();
  const { parseDate } = useParseDate();

  const resetImage = (index: number) => {
    const newUrlList = [...urlList];
    newUrlList[index] = urlDefaultList[index];
    setUrlList(newUrlList);

    const resetFiles = [...uploadFiles];
    resetFiles[index] = uploadDefaultFiles[index];
    setUploadFiles(resetFiles);
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
    if (index === selectedPreviewIndex) {
      return;
    }
    cropImage(selectedPreviewIndex);
    setSelectedPreviewIndex(index);
  };

  const handleDeleteClick = (indexToDelete: number) => {
    const updatedFiles = [...uploadFiles];
    updatedFiles.splice(indexToDelete, 1);

    const updatedDefaultFiles = [...uploadDefaultFiles];
    updatedDefaultFiles.splice(indexToDelete, 1);

    const updatedUrlList = [...urlList];
    URL.revokeObjectURL(updatedUrlList[indexToDelete]);
    updatedUrlList.splice(indexToDelete, 1);

    const updatedUrlDefaultList = [...urlDefaultList];
    updatedUrlDefaultList.splice(indexToDelete, 1);

    setUploadFiles(updatedFiles);
    if (indexToDelete === uploadFiles.length) {
      setSelectedPreviewIndex(uploadFiles.length - 1);
    }
    setUploadDefaultFiles(updatedDefaultFiles);
    setUrlList(updatedUrlList);
    setUrlDefaultList(updatedUrlDefaultList);
    if (indexToDelete !== 0) {
      setSelectedPreviewIndex(indexToDelete - 1);
    } else {
      setSelectedPreviewIndex(0);
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 2520,
    };

    if (!fileList) return;

    let selectedFiles = Array.from(fileList);

    if (uploadFiles.length + selectedFiles.length > 5) {
      popToast("5개 이하의 이미지만 업로드 가능합니다.", "N");
      return;
    }

    const convertedFiles = await Promise.all(
      selectedFiles.map(async (file: File) => {
        if (file.type === "image/heic" || file.type === "image/HEIC") {
          const response = await fetch(URL.createObjectURL(file));
          const blob = await response.blob();
          const conversionResult = await heic2any({
            blob,
            toType: "image/webp",
          });

          const webpFile = new File(
            [conversionResult as Blob],
            file.name.split(".")[0] + ".webp",
            {
              type: "image/webp",
              lastModified: new Date().getTime(),
            }
          );

          return webpFile;
        } else {
          const compressedFile = await imageCompression(file, options);
          if (compressedFile.size <= 10000000) {
            const imageBitmap = await createImageBitmap(file);
            const canvas = document.createElement("canvas");
            canvas.width = imageBitmap.width;
            canvas.height = imageBitmap.height;
            const ctx = canvas.getContext("2d");

            if (ctx) {
              ctx.drawImage(imageBitmap, 0, 0);

              return new Promise((resolve) => {
                canvas.toBlob((webpBlob) => {
                  if (webpBlob) {
                    resolve(webpBlob);
                  } else {
                    resolve(null);
                  }
                }, "image/webp");
              });
            }
          } else {
            popToast("10MB 이하의 이미지만 업로드 가능합니다.", "N");
            return null;
          }
        }
      })
    );

    const validConvertedFiles = convertedFiles.filter(
      (file) => file !== null
    ) as Blob[];

    setUploadFiles([...uploadFiles, ...validConvertedFiles]);
    setUploadDefaultFiles([...uploadDefaultFiles, ...validConvertedFiles]);

    const webpDataURLs = validConvertedFiles.map((file: Blob) =>
      URL.createObjectURL(file)
    );

    setUrlList([...urlList, ...webpDataURLs]);
    setUrlDefaultList([...urlDefaultList, ...webpDataURLs]);
  };

  const captionChange = (e: any) => {
    setCaption(e.target.value);
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
      await cropImage(selectedPreviewIndex);
      await axiosCreateBoard({
        mediaDataList: uploadFiles,
        categoryList: categoryList,
        content: caption,
      });
      popToast("업로드 완료!", "P");
      goHome();
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
        {urlList.map((url: string, index: number) => (
          <SmallPreviewUnitStyled
            key={index}
            onClick={() => handlePreviewClick(index)}
          >
            <img src={url} />
            {index === selectedPreviewIndex && (
              <DeleteButtonStyled
                onClick={() => {
                  (e: React.MouseEvent) => e.stopPropagation();
                  handleDeleteClick(index);
                }}
              >
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
        urlList.map((url: string, index: number) => (
          <>
            {index === selectedPreviewIndex && (
              <>
                <FixedCropperStyled
                  src={url}
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
                  <ResetButtonStyled onClick={() => resetImage(index)}>
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
