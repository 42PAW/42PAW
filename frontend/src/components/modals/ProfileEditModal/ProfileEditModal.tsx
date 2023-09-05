import { styled } from "styled-components";
import ModalLayout from "@/components/modals/ModalLayout";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState } from "@/recoil/atom";
import { useRecoilState } from "recoil";
import useModal from "../../../hooks/useModal";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import { IChangeProfileInfo } from "@/types/interface/profileChange.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosChangeMyProfile } from "@/api/axios/axios.custom";
import { ChangeEvent, useState, useRef } from "react";
import { ProfileInfoDTO } from "@/types/dto/member.dto";
import useToaster from "@/hooks/useToaster";
import useNicknameValidation from "@/hooks/useNicknameValidation";
import useDebounce from "@/hooks/useDebounce";
import useFetch from "@/hooks/useFetch";
import heic2any from "heic2any";

const ProfileEditModal = () => {
  const queryClient = useQueryClient();
  const prevProfileInfo = queryClient.getQueryData<ProfileInfoDTO | undefined>([
    "myProfile",
  ]); // undefined일 경우를 대비해 타입 지정 (어떤 문제가 생길려나?)
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const { popToast } = useToaster();
  const { nicknameValidation } = useNicknameValidation();
  const { debounce } = useDebounce();
  const { closeModal } = useModal();
  const { fetchMyInfo } = useFetch();
  const nameInputRef = useRef<HTMLInputElement | null>(null); // name input 요소에 대한 ref
  const statementInputRef = useRef<HTMLInputElement | null>(null); // statement input 요소에 대한 ref

  const [profileInfo, setProfileInfo] = useState<IChangeProfileInfo>({
    memberName: prevProfileInfo?.memberName!,
    imageData: null,
    statement: prevProfileInfo?.statement!,
    nameChanged: false,
    profileImageChanged: false,
    statementChanged: false,
  });
  const editProfileMutation = useMutation(
    (profileInfo: IChangeProfileInfo) => axiosChangeMyProfile(profileInfo),
    {
      onSuccess: () => {
        // 캐시가 있는 모든 쿼리 무효화
        queryClient.invalidateQueries(["myProfile"]);
        fetchMyInfo();
      },
      onError: (error) => {
        throw error;
      },
    }
  );

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      if (e.target === nameInputRef.current) {
        // name input 요소에서 엔터 키를 눌렀을 때
        if (statementInputRef.current) {
          statementInputRef.current.focus(); // statement input 요소로 포커스 이동
          statementInputRef.current.selectionStart =
            statementInputRef.current.value.length;
        }
      } else if (e.target === statementInputRef.current) {
        // statement input 요소에서 엔터 키를 눌렀을 때
        onChangeProfileInfo(); // onChangeProfileInfo 함수 호출
      }
    }
  };

  // submitProfileInfo
  const onChangeProfileInfo = async () => {
    try {
      if (isWrong === true) {
        popToast("잠시 후에 다시 시도해주세요.", "N");
        return;
      }
      if (profileInfo.memberName !== prevProfileInfo?.memberName) {
        profileInfo.nameChanged = true;
        const isValid = await nicknameValidation(profileInfo.memberName!);
        if (!isValid) {
          setIsWrong(true);
          debounce("nickname", () => setIsWrong(false), 2000);
          return;
        }
      } else {
        profileInfo.nameChanged = false;
      }
      if (profileInfo.statement !== prevProfileInfo?.statement) {
        profileInfo.statementChanged = true;
      } else {
        profileInfo.statementChanged = false;
      }
      try {
        const mutationResult = await editProfileMutation.mutateAsync(
          profileInfo
        ); // 기다림
        if (mutationResult) {
          popToast("성공적으로 수정하였습니다.", "P");
          closeModal(ModalType.PROFILEEDIT);
        }
      } catch (error: any) {
        if (error.response) {
          popToast(error.response.data.message, "N");
        }
      }
    } catch (error) {
      throw error;
    }
  };
  const imageReset = () => {
    setProfileInfo((profileInfo) => {
      return {
        ...profileInfo,
        imageData: null,
        profileImageChanged: true,
      };
    });
    setImagePreview("");
  };

  // img wepb 변환
  const [imagePreview, setImagePreview] = useState<string>(
    prevProfileInfo?.profileImageUrl!
  );

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    // test
    if (file) {
      if (file.type === "image/heic" || file.type === "image/HEIC") {
        let blob = file;
        heic2any({ blob: blob, toType: "image/webp" }).then(function (
          resultBlob: any
        ) {
          file = new File([resultBlob], file!.name.split(".")[0] + ".webp", {
            type: "image/webp",
            lastModified: new Date().getTime(),
          });
        });
      }
    }
    // test
    if (file) {
      if (file.size > 10000000) {
        popToast("10MB 이하의 이미지만 업로드 가능합니다.", "N");
        return;
      }
      const imageBitmap = await createImageBitmap(file);
      const canvas = document.createElement("canvas");
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(imageBitmap, 0, 0);
        canvas.toBlob(async (webpBlob) => {
          if (webpBlob) {
            setProfileInfo({
              ...profileInfo,
              imageData: webpBlob,
              profileImageChanged: true,
            });
            const webpDataURL = URL.createObjectURL(webpBlob);
            setImagePreview(webpDataURL);
          }
        }, "image/webp");
      }
    }
  };
  // img wepb 변환

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.slice(0, 10);
    }

    setProfileInfo((profileInfo) => {
      return {
        ...profileInfo,
        memberName: e.target.value,
      };
    });
  };

  const handleStatementChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 30) {
      e.target.value = e.target.value.slice(0, 30);
    }
    setProfileInfo((profileInfo) => {
      return {
        ...profileInfo,
        statement: e.target.value,
      };
    });
  };

  return (
    <ModalLayout
      modalName={ModalType.PROFILEEDIT}
      isOpen={currentOpenModal.profileEditModal}
    >
      <WrapperStyled>
        <LogoStyled>
          <img src="/assets/paw.png" />
        </LogoStyled>
        <ProfileImageStyled
          src={imagePreview ? imagePreview : "/assets/userG.png"}
        />
        <MainAreaStyled>
          <EditImageStyled>
            <label htmlFor="uploadPhoto">이미지 업로드</label>
            <input
              type="file"
              accept="image/*"
              id="uploadPhoto"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="profileImageReset">이미지 제거</label>
            <input
              type="button"
              accept="image/*"
              id="profileImageReset"
              onClick={imageReset}
              style={{ display: "none" }}
            />
          </EditImageStyled>
          <EditInfoStyled>
            <span>이름</span>
            <input
              ref={nameInputRef}
              placeholder="최대 10자 이내"
              name="name"
              type="text"
              value={profileInfo.memberName!}
              onChange={(e) => handleNameChange(e)}
              maxLength={10}
              onKeyDown={handleEnterKey}
            />
          </EditInfoStyled>
          <EditInfoStyled>
            <span>자기소개</span>
            <input
              ref={statementInputRef}
              type="text"
              name="statement"
              placeholder="최대 50자 이내" // 국가에 따라 언어 변경
              value={profileInfo.statement}
              maxLength={50}
              onChange={(e) => handleStatementChange(e)}
              onKeyDown={handleEnterKey}
            />
          </EditInfoStyled>
          <ButtonContainerStyled>
            <button onClick={onChangeProfileInfo}>완료</button>
            <button onClick={() => closeModal(ModalType.PROFILEEDIT)}>
              취소
            </button>
          </ButtonContainerStyled>
        </MainAreaStyled>
      </WrapperStyled>
    </ModalLayout>
  );
};

const WrapperStyled = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--transparent);
  width: 280px;
  height: 450px;
  border-radius: 15px;
  color: var(--white);
`;

const LogoStyled = styled.div`
  z-index: 3;
  position: absolute;
  left: 11px;
  top: 8px;
  img {
    width: 35px;
  }
`;

const ProfileImageStyled = styled.img`
  width: 110%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0;
`;

const MainAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: none;
  height: 480px;
  width: 600px;
  background: linear-gradient(
    228deg,
    #878abe 0%,
    #d1c1cd 52.34%,
    #e6dade 76.75%
  );

  position: absolute;
  bottom: -280px;
  border-radius: 100%;
`;

const EditImageStyled = styled.div`
  // const ProfileImageStyled = styled.img
  margin-top: 20px;
  margin-bottom: 10px;
  label {
    cursor: pointer;
    margin-right: 15px;
    margin-left: 15px;
    &:hover {
      color: var(--transparent2);
      font-weight: 500;
    }
  }
`;

const EditInfoStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  // margin-bottom: 10px;
  span {
    margin-right: 10px;
    font-size: 1.2rem;
    width: 50px;
    text-align: center;
  }
  ::placeholder {
    color: #d9d9d9;
  }
  input {
    width: 180px;
    height: 20px;
    border: none;
    border-bottom: 1.5px solid var(--white);
    font-size: 1.2rem;
    text-align: center;
    background-color: transparent;
    color: var(--white);
    &:focus {
      outline: none;
    }
  }
`;

const ButtonContainerStyled = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 215px;
  button {
    cursor: pointer;
    height: 33px;
    width: 90px;
    border-radius: 10px;
    border: 1px solid var(--white);
    &:nth-child(1) {
      background-color: transparent;
      color: var(--white);
    }
    &:nth-child(2) {
      background-color: transparent;
      color: var(--white);
    }
    &:hover {
      background-color: var(--white);
      color: var(--pink);
    }
  }
`;

export default ProfileEditModal;
