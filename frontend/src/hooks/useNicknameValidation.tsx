import useToaster from "./useToaster";
import { axiosCheckNicknameValid } from "@/api/axios/axios.custom";
import { languageState } from "@/recoil/atom";
import { useRecoilState } from "recoil";

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

  /**
   * 유효성 검사 후 boolean 값 반환. true : 유효.
   * @param {string} nickname - 유효성을 검사할 닉네임.
   */
  const [language] = useRecoilState<any>(languageState);
  const nicknameValidation = async (nickname: string) => {
    if (
      nickname.length < 3 ||
      hasWhitespace(nickname) ||
      hasSpecialLetter(nickname)
    ) {
      if (nickname.length < 3) {
        const nicknameMinimumCharacterMsg = language.NicknameMinimumCharacter;
        popToast(nicknameMinimumCharacterMsg, "N");
      } else if (hasWhitespace(nickname)) {
        const nicknameExcludeSpaceMsg = language.NicknameExcludeSpace;
        popToast(nicknameExcludeSpaceMsg, "N");
      } else if (hasSpecialLetter(nickname)) {
        const nicknameInvalidCharacterMsg = language.NicknameInvalidCharacter;
        popToast(nicknameInvalidCharacterMsg, "N");
      }
      return false;
    }
    const isMembernameValid = await axiosCheckNicknameValid(nickname);
    if (!isMembernameValid) {
      const nicknameAlreadyUsedMsg = language.NicknameAlreadyUsed;
      popToast(nicknameAlreadyUsedMsg, "N");
      return false;
    }
    return true;
  };

  return {
    nicknameValidation,
  };
};

export default useNicknameValidation;
