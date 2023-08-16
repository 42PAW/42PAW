import { useRef } from "react";

const useDebounce = () => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * 인자로 주어진 콜백 함수를 디바운스 후 실행시키는 함수.
   * @param {Function} callback - 디바운스 후 실행할 함수.
   * @param {number} milliseconds - 디바운스 딜레이 시간.
   */
  const debounce = (callback: () => void, milliseconds: number) => {
    clearTimeout(debounceRef.current!);
    debounceRef.current = setTimeout(() => {
      callback();
    }, milliseconds);
  };
  return {
    debounce,
  };
};

export default useDebounce;
