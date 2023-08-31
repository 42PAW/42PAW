import styled from "styled-components";
import { useState } from "react";
import { axiosCreateBoard } from "@/api/axios/axios.custom";
import { AnimalSpecies } from "@/types/enum/animal.filter.enum";
import useParseDate from "@/hooks/useParseDate";
import AnimalButtonContainer from "@/components/AnimalButtonContainer";
import useToaster from "@/hooks/useToaster";

const ImageUploader = () => {
  // category list
  const [categoryList, setCategoryList] = useState<AnimalSpecies[]>([]);
  // upload files
  const [uploadFiles, setUploadFiles] = useState<Blob[]>([]);
  // caption
  const [caption, setCaption] = useState("");
  // check if the user is trying to put more than 5 images
  const [filecnt, setFilecnt] = useState<number>(0);
  // if u click small preview, it will be selected & shown in main preview box
  // const [selectedPreviewIndex, setSelectedPreviewIndex] = useState<number>(0);
  // if u hover small preview, it will be shown in main preview box -> it's for deleting or editing image
  const [hoveringIndex, setHoveringIndex] = useState<number | null>(null);
  // utils
  const { parseDate } = useParseDate();
  const { popToast } = useToaster();

  const uploadFilesCount = uploadFiles.length;
  const showUploadButton = uploadFilesCount < 5;

  // handle preview click: select the image & show it in main preview box
  // const handlePreviewClick = (index: number) => {
  //   setSelectedPreviewIndex(index);
  // };

  const handlePreviewHover = (index: number) => {
    setHoveringIndex(index);
  };

  // delete the image: update uploadFiles
  const handleDeleteClick = (indexToDelete: number) => {
    const updatedFiles = uploadFiles.filter(
      (_, index) => index !== indexToDelete
    );
    setUploadFiles(updatedFiles);
  };

  // handle image change: convert to webp & update uploadFiles
  const handleImageChange = (e: any) => {
    if (!uploadFiles) return;
    const selectedFiles: Blob[] = Array.from(e.target.files);
    if (!selectedFiles || !uploadFiles) return;
    if (selectedFiles.some((file: any) => file.size > 5000000)) {
      popToast("5MB 이하의 이미지만 업로드 가능합니다.", "N");
      return;
    }
    if (uploadFiles.length + selectedFiles.length > 5) {
      popToast("5개 이하의 이미지만 업로드 가능합니다.", "N");
      return;
    }
    setFilecnt(filecnt + selectedFiles.length);
    setUploadFiles([...uploadFiles, ...selectedFiles]);
    convertToWebp(selectedFiles as Blob[]);
  };

  // caption change
  const captionChange = (e: any) => {
    setCaption(e.target.value);
  };

  // convert any image file to webp
  const convertToWebp = (files: any) => {
    files.forEach(() => {
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
          setUploadFiles([...uploadFiles, webpFile]);
        }, "image/webp");
      };
    });
  };

  // upload the board & send axios request
  const upload = async () => {
    if (uploadFiles.length === 0) {
      popToast("이미지를 업로드해주세요.", "N");
      return;
    }
    try {
      const response = await axiosCreateBoard({
        mediaDataList: uploadFiles,
        categoryList: categoryList,
        content: caption,
      });
      console.log(response);
    } catch (error) {
      throw error;
    }
  };

  // go home if u click cancel button
  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <WrapperStyled>
      <SmallPreviewStyled>
        {uploadFiles.map((file: Blob, index: number) => (
          <SmallPreviewUnitStyled
            key={index}
            // onClick={() => handlePreviewClick(index)}
            onMouseEnter={() => handlePreviewHover(index)}
            onMouseLeave={() => handlePreviewHover(0)} //원래 null
          >
            <img src={URL.createObjectURL(file)} alt={"Preview ${index + 1}"} />
            {hoveringIndex === index && (
              <DeleteButtonStyled onClick={() => handleDeleteClick(index)}>
                x
              </DeleteButtonStyled>
            )}
          </SmallPreviewUnitStyled>
        ))}
        {showUploadButton && (
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
      {uploadFilesCount === 0 && (
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
      <TodayDateStyled>{parseDate(new Date())}</TodayDateStyled>
      <DivisionLineStyled />
      <CaptionBoxStyled>
        <textarea
          id="expanding-input"
          placeholder="캡션을 입력하세요"
          value={caption}
          onChange={captionChange}
        />
      </CaptionBoxStyled>
      {/* category button: to pick some */}
      <CategoryButtonStyled>
        <AnimalButtonContainer
          columns={3}
          buttonRow={30}
          buttonFontSize={120}
          array={categoryList}
          setter={setCategoryList}
        />
      </CategoryButtonStyled>
      {/* upload & cancel button */}
      <ButtonDivStyled>
        <UploadbuttonStyled onClick={upload}>확인</UploadbuttonStyled>
        <CancelbuttonStyled onClick={goHome}>취소</CancelbuttonStyled>
      </ButtonDivStyled>
    </WrapperStyled>
  );
};

const SmallPreviewStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 350px;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const SmallPreviewUnitStyled = styled.div`
  display: flex;
  position: relative;
  width: 50px;
  height: 50px;
  margin-right: 20px;
  background-color: var(--white);
  border-radius: 10px;
  overflow: hidden;
`;

const DeleteButtonStyled = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
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
  background-image: url("/src/assets/upload.png");
  background-size: cover;
  border-radius: 10px;
  pointer: cursor;
  width: 50px;
  height: 50px;
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
  width: 350px;
  height: 350px;
  justify-content: center;
  align-items: center;
  color: var(--white);
  border-radius: 10px;
  border: 5px solid var(--white);
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const UploadMainPreviewStyled = styled.input`
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const UploadDemandStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  color: var(--white);
  font-size: 1.3rem;
`;

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 100%;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
`;

const TodayDateStyled = styled.div`
  display: flex;
  width: 80%;
  padding-left: 45px;
  margin-bottom: 10px;
  font-size: 1.3rem;
  color: var(--white);
  justify-content: flex-start;
  align-items: center;
  font-weight: lighter;
`;

const DivisionLineStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 380px;
  height: 1px;
  background-color: var(--white);
`;

const CaptionBoxStyled = styled.div`
  display: flex;
  align-items: start;
  width: 380px;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 20px;
  textarea {
    display: flex;
    width: 380px;
    height: 100px;
    border: none;
    background: none;
    outline: none
    caret-color: var(--white);
    color: var(--white);
    font-size: 1.3rem;
    font-family: "Noto Sans KR", sans-serif;
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
  width: 80%;
  justify-content: center;
  align-items: center;
  background-color: var(--transparent);
  border-radius: 10px;
  margin-top: 10px;
  padding: 15px;
`;

const ButtonDivStyled = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  margin-top: 10px;
`;

const UploadbuttonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer: cursor;
  width: 100px;
  height: 40px;
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
  pointer: cursor;
  width: 100px;
  height: 40px;
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

export default ImageUploader;
