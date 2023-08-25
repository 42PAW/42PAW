import styled from "styled-components";
import { useState } from "react";
import { axiosCreateBoard } from "@/api/axios/axios.custom";
import { AnimalSpecies } from "@/types/enum/animal.filter.enum";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [webpImages, setWebpImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const selectedFiles = Array.from(files);
    setSelectedImage(selectedFiles);
    selectedFiles.forEach((file) => {
      console.log("size:", file.size, "bytes"); // Log the size of each selected image
      convertToWebp(file);
    });
  };

  const convertToWebp = (file) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((webpBlob) => {
        const webpFile = new File([webpBlob], "image.webp", {
          type: "image/webp",
        });
        console.log("webp", webpFile.size, "bytes"); // Log the size of each WebP image
        setWebpImages((prevWebpImages) => [...prevWebpImages, webpFile]);
      }, "image/webp");
    };

    img.src = URL.createObjectURL(file);
  };

  const upload = async () => {
    if (webpImages.length === 0) {
      return;
    }
    try {
      const response = await axiosCreateBoard({
        mediaDataList: webpImages, // Use the array of WebP images
        categoryList: [AnimalSpecies.DOG],
        content: "백으로 보냈다 이자식아",
      });
      console.log(response);
    } catch (error) {
      throw error;
    }
  };

  return (
    <WrapperStyled>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        multiple
      />
      {selectedImage.map((file, index) => (
        <img
          key={index}
          src={URL.createObjectURL(file)}
          alt={`Selected ${index}`}
        />
      ))}
      {/* {webpImage && <img src={URL.createObjectURL(webpImage)} alt="WebP" />} */}
      <button onClick={upload}>백으로 보내 이자식아</button>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  width: 505px;
  height: 100%;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
`;

export default ImageUploader;
