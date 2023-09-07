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

  try {
    if (file.type === "image/heic" || file.type === "image/HEIC") {
      await fetch(URL.createObjectURL(file))
        .then((res) => res.blob())
        .then((blob) => heic2any({ blob, toType: "image/webp" }))
        .then((conversionResult) => {
          file = new File(
            [conversionResult as Blob],
            file.name.split(".")[0] + ".webp",
            {
              type: "image/webp",
              lastModified: new Date().getTime(),
            }
          );
          console.log(file);
        })
        .catch((error) => {
          console.log(error);
          return 1;
        });
    }

    const compressedFile = await imageCompression(file, options);

    if (compressedFile.size > 10000000) {
      console.log("사진 용량은 10MB가 넘어갈 수 없습니다");
      return 1;
    }

    const imageBitmap = await createImageBitmap(compressedFile);
    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(imageBitmap, 0, 0);
      canvas.toBlob(async (webpBlob) => {
        if (webpBlob) {
          // setProfileInfo 함수의 타입을 검사하고 분기 처리
          if (isIChangeProfileInfo(profileInfo)) {
            // MemberProfileChangeRequestDto 타입 처리
            console.log("profileImageChanged");
            setProfileInfo({
              ...profileInfo,
              imageData: webpBlob,
              profileImageChanged: true,
            });
          } else if (isSignUpInfoDto(profileInfo)) {
            console.log("SignUpInfoDTO");
            // SignUpInfoDTO 타입 처리
            setProfileInfo({
              ...profileInfo,
              imageData: webpBlob,
            });
          }
          const webpDataURL = URL.createObjectURL(webpBlob);
          setImagePreview(webpDataURL);
        }
      }, "image/webp");
    }
  } catch (error) {
    console.log(error);
    return 1;
  }
  return 0;
}

// const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0];
//   if (file) {
//     processImage(file);
//   }
// };

// 외부에서 사용할 경우
// processImage 함수를 import한 후 필요한 파일을 전달하여 사용합니다.
