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

  if (status === followType.NONE)
    return (
      <FollowButtonStyled
        disabled={isLoading}
        onClick={handleClickFollowTypeButton}
      >
        {isLoading ? <LoadingDotsAnimation status={status} /> : "팔로우"}
      </FollowButtonStyled>
    );
  if (status === followType.FOLLOWING)
    return (
      <FollowingButtonStyled
        disabled={isLoading}
        onClick={handleClickFollowTypeButton}
      >
        {isLoading ? <LoadingDotsAnimation status={status} /> : "팔로잉"}
      </FollowingButtonStyled>
    );
  if (status === followType.BLOCK)
    return (
      <BannedButtonStyled
        disabled={isLoading}
        onClick={handleClickFollowTypeButton}
      >
        {isLoading ? <LoadingDotsAnimation status={status} /> : "차단됨"}
      </BannedButtonStyled>
    );
};

const FollowButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33px;
  width: 90px;
  border-radius: 10px;
  border: 1px solid var(--white);
  background-color: transparent;
  color: var(--white);
  transition: all 0.2s ease;
  &:hover {
    opacity: 0.8;
  }
`;

const FollowingButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33px;
  width: 90px;
  border-radius: 10px;
  border: 1px solid var(--white);
  background-color: var(--white);
  color: var(--pink);
  transition: opacity 0.2s ease;
  font-size: 1.3rem;
  &:hover {
    opacity: 0.8;
  }
`;

const BannedButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33px;
  width: 90px;
  border-radius: 10px;
  border: 1px solid #fc5656;
  background-color: #fc5656;
  color: var(--white);
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 1.3rem;
  &:hover {
    opacity: 0.8;
  }
`;

export default FollowTypeButton;
