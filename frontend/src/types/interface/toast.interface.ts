/**
 * @isPopped 토스트 메시지가 열렸는지에 대한 boolean
 * @text 토스트 메시지 내용
 */
export interface IToastInfo {
  isPopped: boolean;
  text: string;
  type: string;
}
