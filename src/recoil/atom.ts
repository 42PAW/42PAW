import { atom } from "recoil";

export const isRightSectionOpenedState = atom<boolean>({
  key: "isRightSectionOpened",
  default: false,
});
