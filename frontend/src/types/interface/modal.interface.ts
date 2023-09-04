/**
 * 현재 열려야 하는 모달창을 판단하기 위해 boolean 모달 속성들을 담는 인터페이스
 * @banModal 차단 모달
 * @reportModal 신고 모달
 * @deleteModal 삭제 모달
 * @profileCardModal 프로필 카드 모달
 */
export interface ICurrentModalStateInfo {
  banModal: boolean;
  reportModal: boolean;
  deleteModal: boolean;
  profileCardModal: boolean;
  profileEditModal: boolean;
  languageModal: boolean;
  loginModal: boolean;
  meatballModal: boolean;
}
