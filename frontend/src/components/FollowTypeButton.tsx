import { useState } from "react";
import { axiosFollow, axiosUnfollow } from "@/api/axios/axios.custom";
import { axiosUndoBlockUser } from "@/api/axios/axios.custom";
import { styled } from "styled-components";
import { followType } from "@/types/enum/followType.enum";
import LoadingDotsAnimation from "@/components/loading/LoadingDotsAnimation";
import useDebounce from "@/hooks/useDebounce";
import { callbackStoreState } from "@/recoil/atom";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";

interface FollowTypeButtonsProps {
  memberId: number;
  status: followType;
  callback?: () => void;
  size?: string;
}

/**
 * @param {number} memberId - 팔로우 상태를 변경할 대상 유저 id
 * @param {followType} status - 해당 유저에 대한 팔로우 상태
 * @param {Function} callback - 상태 업데이트 후 실행시킬 콜백 함수(ex.리렌더링) (optional)
 */
const FollowTypeButton = ({
  memberId,
  status,
  callback,
  size,
}: FollowTypeButtonsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [callbackStore] = useRecoilState<Function[]>(callbackStoreState);
  const { debounce } = useDebounce();
  const queryClient = useQueryClient();
  const location = useLocation();

  const isProfilePage: boolean = /^\/(my-)?profile(\/\d+)?$/.test(
    location.pathname
  );
  const handleClickFollowType = async () => {
    let response;
    try {
      if (status === followType.NONE)
        response = await axiosFollow(memberId as number);
      if (status === followType.FOLLOWING)
        response = await axiosUnfollow(memberId as number);
      if (status === followType.BLOCK)
        response = await axiosUndoBlockUser(memberId as number);

      if (callback) {
        console.log("callback");

        callback();
      }
      if (callbackStore.length !== 0) {
        console.log("callbackStore");
        callbackStore.forEach((callback) => callback());
      }
      if (isProfilePage) {
        if (location.pathname === "/my-profile") {
          queryClient.invalidateQueries(["myProfile"]);
        } else {
          console.log("profile");
          queryClient.invalidateQueries(["profile", memberId]);
        }
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleClickFollowTypeButton = () => {
    setIsLoading(true);
    debounce("follow", handleClickFollowType, 300);
  };

  return (
    <ButtonStyled
      $status={status}
      $size={size}
      disabled={isLoading}
      onClick={handleClickFollowTypeButton}
    >
      {isLoading ? (
        <LoadingDotsAnimation status={status} />
      ) : (
        buttonTextByStatus[status]
      )}
    </ButtonStyled>
  );
};

const buttonTextByStatus = {
  [followType.NONE]: " 팔로우",
  [followType.FOLLOWING]: "팔로잉",
  [followType.BLOCK]: "차단됨",
};

const ButtonStyled = styled.button<{ $status: followType; $size: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $size }) => ($size === "large" ? "40px" : "33px")};
  width: ${({ $size }) => ($size === "large" ? "200px" : "90px")};
  border-radius: ${({ $size }) => ($size === "large" ? "20px" : "10px")};
  font-size: ${({ $size }) => $size === "large" && "1.6rem"};
  font-weight: ${({ $size }) => $size === "large" && "bold"};
  margin-top: ${({ $size }) => $size === "large" && "-20px"};
  border: 1px solid
    ${({ $status }) =>
      $status === followType.BLOCK ? "#fc5656" : "var(--white)"};
  background-color: ${({ $status, $size }) =>
    $status === followType.BLOCK
      ? "#fc5656"
      : $status === followType.FOLLOWING
      ? "var(--white)"
      : $size === "large"
      ? "#9497ca"
      : "transparent"};
  color: ${({ $status }) =>
    $status === followType.FOLLOWING ? "var(--pink)" : "var(--white)"};
  transition: all 0.2s ease;
  cursor: pointer;
  // &:hover {
  //   opacity: 0.8;
  // }
`;

export default FollowTypeButton;
