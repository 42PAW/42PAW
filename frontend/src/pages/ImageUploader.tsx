import styled from "styled-components";
import { ChangeEvent, useState, useRef, useEffect } from "react";
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
import { languageState } from "@/recoil/atom";
import { useRecoilState } from "recoil";
import useNavigateCustom from "@/hooks/useNavigateCustom";

const ImageUploader = () => {
  const cropperRef = useRef<FixedCropperRef>(null);
  const [filesUploaded, setFilesUploaded] = useState<boolean>(false);
  const [language] = useRecoilState<any>(languageState);
  const [categoryList, setCategoryList] = useState<AnimalSpecies[]>([]);
  const [uploadFiles, setUploadFiles] = useState<Blob[]>([]);
  const [uploadDefaultFiles, setUploadDefaultFiles] = useState<Blob[]>([]);
  const [urlList, setUrlList] = useState<string[]>([]);
  const [urlDefaultList, setUrlDefaultList] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState<number>(0);
  const [uploadClicked, setUploadClicked] = useState(false);
  const [cropImageCompleted, setCropImageCompleted] = useState(false);

  const { popToast } = useToaster();
  const { parseDate } = useParseDate();
  const { moveToMain } = useNavigateCustom();

  const resetImage = (index: number) => {
    const newUrlList = [...urlList];
    newUrlList[index] = urlDefaultList[index];
    setUrlList(newUrlList);

    const resetFiles = [...uploadFiles];
    resetFiles[index] = uploadDefaultFiles[index];
    setUploadFiles(resetFiles);
  };

  useEffect(() => {
    const upload = async () => {
      if (uploadClicked && cropImageCompleted && uploadFiles.length > 0) {
        try {
          await axiosCreateBoard({
            mediaDataList: uploadFiles,
            categoryList: categoryList,
            content: caption,
          });
          const uploadCompleteMsg = language.uploadComplete;
          popToast(uploadCompleteMsg, "P");
          setFilesUploaded(true);
          goHome();
        } catch (error) {
          throw error;
        }
      }
    };
    upload();
  }, [cropImageCompleted, uploadFiles, categoryList, caption, language]);

  useEffect(() => {
    const uploadData = async () => {
      if (uploadClicked) {
        if (uploadFiles.length === 0) {
          const uploadImagesMsg = language.uploadImage;
          popToast(uploadImagesMsg, "N");
          setUploadClicked(false);
          return;
        }
        if (categoryList.length === 0) {
          const selectCategoryMsg = language.selectCategory;
          popToast(selectCategoryMsg, "N");
          setUploadClicked(false);
          return;
        }
        cropImage(selectedPreviewIndex);
      }
    };
    uploadData();
  }, [uploadClicked]);

  const upload = () => {
    setUploadClicked(true);
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

        canvas.toBlob(async (webpBlob) => {
          if (webpBlob) {
            const webpFile = new File([webpBlob], "image.webp", {
              type: "image/webp",
            });
            let newUploadFiles = [...uploadFiles];
            newUploadFiles.splice(index, 1, webpFile);
            await setUploadFiles([...newUploadFiles]);

            let newUrlList = [...urlList];
            newUrlList[index] = URL.createObjectURL(webpFile);
            await setUrlList(newUrlList);
            setCropImageCompleted(true);
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
      const belowFiveImagesMsg = language.belowFiveImages;
      popToast(belowFiveImagesMsg, "N");
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

          if (blob instanceof Blob) {
            file = new File(
              [conversionResult as Blob],
              file.name.split(".")[0] + ".webp",
              {
                type: "image/webp",
                lastModified: new Date().getTime(),
              }
            );
          }
        }
        const compressedFile = await imageCompression(file, options);
        if (compressedFile.size <= 2097152) {
          const imageBlob = compressedFile.slice(
            0,
            compressedFile.size,
            compressedFile.type
          );

          return new Promise((resolve) => {
            if (imageBlob) {
              resolve(imageBlob);
            } else {
              resolve(null);
            }
          });
        } else {
          popToast("이미지 용량을 초과했습니다.", "N");
          return null;
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

  // go home if u click cancel button
  const goHome = () => {
    moveToMain();
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
                    width: 4000,
                    height: 4000,
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
          <UploadMainPreviewStyled
            id="imageUploader"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />
          <UploadDemandStyled htmlFor="imageUploader">
            {language.uploadImage}
          </UploadDemandStyled>
          <UploadMainPreviewStyled
            id="imageUploader"
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
          placeholder={language.enterCaption}
          value={caption}
          onChange={captionChange}
          maxLength={100}
        />
      </CaptionBoxStyled>
      <CategoryButtonStyled>
        <AnimalButtonContainer
          columns={2}
          buttonRow={35}
          buttonFontSize={110}
          array={categoryList}
          setter={setCategoryList}
        />
      </CategoryButtonStyled>
      <ButtonDivStyled>
        <ButtonStyled onClick={upload} disabled={filesUploaded}>
          {language.confirm}
        </ButtonStyled>
        <ButtonStyled onClick={goHome}>{language.cancel}</ButtonStyled>
      </ButtonDivStyled>
      <ScrollMarginStyled />
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 500px;
`;

const SmallPreviewStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 55%;
  height: 48px;
  border-radius: 10px;
  margin-top: 5%;
`;

const SmallPreviewUnitStyled = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-right: 7px;
  background-color: var(--transparent);
  border-radius: 10px;
  overflow: hidden;
  &:hover {
    button {
      transition: all 0.3s ease;
      opacity: 1;
    }
  }
`;

const DeleteButtonStyled = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: var(--transparent);
  color: #ffffff;
  border: none;
  border-radius: 50%;
  padding: 3px 6px;
  font-size: 10px;
  cursor: pointer;
  opacity: 0;
`;

const SmallUploadButtonWrapperStyled = styled.div`
  display: flex;
  background-color: var(--transparent);
  background-size: cover;
  border-radius: 10px;
  cursor: pointer;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
`;

const SmallUploadButton = styled.input`
  display: flex;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const UploadMainPreviewWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 55%;
  height: 285px;
  color: var(--transparent2);
  border-radius: 15px;
  background-color: var(--transparent);
  opacity: 0.8;
  transition: all 0.3s ease;
  &:hover {
    opacity: 1;
  }
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const UploadMainPreviewStyled = styled.input`
  display: flex;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const UploadDemandStyled = styled.label`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.2rem;
  &:hover {
  }
`;

const DivisionLineStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  width: 54%;
  height: 1px;
  background-color: var(--transparent);
`;

const CaptionBoxStyled = styled.div`
  display: flex;
  align-items: start;
  width: 54%;
  min-height: 4%;
  margin-top: 10px;
  margin-bottom: 10px;
  textarea {
    display: flex;
    font-family: "Noto Sans KR", sans-serif;
    font-weight: bolder;
    width: 100%;
    height: 70%;
    background: none;
    outline: none;
    border: none;
    caret-color: var(--white);
    color: var(--white);
    font-size: 1.2rem;
    font-weight: lighter;
    white-space: pre-wrap;
    overflow-y: scroll;
    text-overflow: clip;
    &::placeholder {
      color: var(--transparent2);
      opacity: 0.7;
    }
  }
`;

const CategoryButtonStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--transparent);
  border-radius: 10px;
  padding: 10px;
`;

const ButtonDivStyled = styled.div`
  display: flex;
  width: 38%;
  height: 30px;
  justify-content: space-between;
  align-items: center;
  margin-top: 4%;
  margin-bottom: 5px;
`;

const ButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 80px;
  height: 30px;
  font-size: 12px;
  background-color: transparent;
  color: var(--white);
  border: 1px solid white;
  border-radius: 8px;
  &:hover {
    background-color: var(--white);
    color: var(--pink);
    transition: all 0.3s ease;
  }
`;

const ScrollMarginStyled = styled.div`
  display: flex;
  width: 100%;
  height: 110px;
  @media screen and (display-mode: standalone) {
    height: 130px;
  }
`;

// Cropper
const FixedCropperStyled = styled(FixedCropper)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--transparent);
  width: 55%;
  min-height: 285px;
  max-height: 295px;
  border-radius: 5px;

  margin-top: 5px;
`;

const CropperUtilsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 55%;
  height: 20px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const TodayDateStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  font-size: 1rem;
  margin-left: 5px;
  color: #ffffffd6;
  justify-content: flex-start;
  font-weight: 400;
`;

const ResetButtonStyled = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  width: 40px;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  font-weight: lighter;
  margin-right: 5px;
  padding: 0;
  img {
    width: 14px;
    height: 14px;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export default ImageUploader;
