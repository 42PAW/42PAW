import { useState } from "react";
import { axiosCreateBoard } from "@/api/axios/axios.custom";
import { AnimalSpecies } from "@/types/enum/animal.filter.enum";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [webpImage, setWebpImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    console.log("size:", file.size, "bytes"); // Log the size of the selected image
    convertToWebp(file);
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
        console.log("webp", webpFile.size, "bytes"); // Log the size of the WebP image
        setWebpImage(webpFile);
      }, "image/webp");
    };

    img.src = URL.createObjectURL(file);
  };

  const handleOnClick = () => {
    if (webpImage) {
      axiosCreateBoard({
        mediaDataList: [webpImage],
        categoryList: [AnimalSpecies.DOG],
        content: "백으로 보냈다 이자식아",
      });
    }
  };

  console.log(typeof webpImage);
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
      )}
      {/* {webpImage && <img src={URL.createObjectURL(webpImage)} alt="WebP" />} */}
      <button onClick={handleOnClick}>백으로 보내 이자식아</button>
    </div>
  );
};

export default ImageUploader;
