import useToaster from "./useToaster";
import { axiosCheckNicknameValid } from "@/api/axios/axios.custom";

const hasWhitespace = (str: string) => {
  return str.indexOf(" ") >= 0;
};

const hasSpecialLetter = (str: string) => {
  const forbiddenCharacters =
    /[!@#$%^&*()_+={}\[\]|\\:;"'<>.,\/?`ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣㅐㅒㅔㅖㅘㅙㅚㅝㅞㅟㅢ]/;
  return forbiddenCharacters.test(str);
};

const useNicknameValidation = () => {
  const { popToast } = useToaster();

  const nicknameValidation = async (nickname: string) => {
    const isMembernameValid = await axiosCheckNicknameValid(nickname);
    if (
      nickname.length < 3 ||
      hasWhitespace(nickname) ||
      hasSpecialLetter(nickname) ||
      !isMembernameValid
    ) {
      if (nickname.length < 3) {
        popToast("닉네임은 3글자 이상이어야 합니다.", "N");
      } else if (hasWhitespace(nickname)) {
        popToast("닉네임에 띄어쓰기는 포함될 수 없습니다.", "N");
      } else if (hasSpecialLetter(nickname)) {
        popToast("유효하지 않은 문자가 포함돼 있습니다.", "N");
      } else if (!isMembernameValid) {
        popToast("이미 사용 중인 닉네임입니다.", "N");
      }
      return false;
    }
    return true;
  };

  return {
    nicknameValidation,
  };
};

export default useNicknameValidation;
