import heic2any from "heic2any";
import imageCompression from "browser-image-compression";
import { SignUpInfoDTO } from "@/types/dto/member.dto";
import { IChangeProfileInfo } from "@/types/interface/profileChange.interface";

function isIChangeProfileInfo(obj: any): obj is IChangeProfileInfo {
  // 여기서 obj의 특정 조건을 검사하여 IChangeProfileInfo 타입 여부를 반환
  return obj && "profileImageChanged" in obj;
}

function isSignUpInfoDto(obj: any): obj is SignUpInfoDTO {
  // 여기서 obj의 특정 조건을 검사하여 SignUpInfoDTO 타입 여부를 반환
  return obj && "categoryFilters" in obj; // 실제 필드를 확인해야 합니다.
}

export default async function processImage<T>(
  file: File,
  profileInfo: T,
  setProfileInfo: React.Dispatch<React.SetStateAction<T>>,
  setImagePreview: React.Dispatch<React.SetStateAction<string>>
): Promise<number> {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 2520,
  };
  console.log("file size: ", file.size); // true

  try {
    if (file.type === "image/heic" || file.type === "image/HEIC") {
      // HEIC 이미지를 WebP로 변환
      const blob = await fetch(URL.createObjectURL(file))
        .then((res) => res.blob())
        .then((blob) => heic2any({ blob, toType: "image/webp" }))
        .catch((error) => {
          console.log(error);
          return null;
        });

      if (blob instanceof Blob) {
        console.log(blob);
        file = new File([blob], file.name.split(".")[0] + ".webp", {
          type: "image/webp",
          lastModified: new Date().getTime(),
        });
      }
    }

    const compressedFile = await imageCompression(file, options);
    console.log("compressedFile type: ", compressedFile.type); // true
    console.log("compressedFile size: ", compressedFile.size); // true
    if (compressedFile.size > 2097152) {
      console.log("이미지 용량을 초과했습니다.");
      return 1;
    }

    // const imageBlob = await createImageBlob(compressedFile);
    const imageBlob = compressedFile.slice(
      0,
      compressedFile.size,
      compressedFile.type
    );
    console.log(imageBlob);

    console.log("imageBlob type: ", imageBlob.type); // true
    console.log("imageBlob size: ", imageBlob.size); // true

    // setProfileInfo 함수의 타입을 검사하고 분기 처리
    if (isIChangeProfileInfo(profileInfo)) {
      // MemberProfileChangeRequestDto 타입 처리
      console.log("profileImageChanged");
      console.log("type: " + imageBlob.type);
      console.log("size: " + imageBlob.size);
      setProfileInfo({
        ...profileInfo,
        imageData: imageBlob,
        profileImageChanged: true,
      });
    } else if (isSignUpInfoDto(profileInfo)) {
      console.log("SignUpInfoDTO");
      // SignUpInfoDTO 타입 처리
      setProfileInfo({
        ...profileInfo,
        imageData: imageBlob,
      });
    }

    const webpDataURL = URL.createObjectURL(imageBlob);
    setImagePreview(webpDataURL);
  } catch (error) {
    console.log(error);
    return 1;
  }
  return 0;
}
