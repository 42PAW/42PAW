import { useState } from "react";
import { axiosFollow, axiosUnfollow } from "@/api/axios/axios.custom";
import { useQueryClient } from "@tanstack/react-query";
import { axiosUndoBlockUser } from "@/api/axios/axios.custom";
import { styled } from "styled-components";
import { followType } from "@/types/enum/followType.enum";
import LoadingDotsAnimation from "@/components/loading/LoadingDotsAnimation";
import useDebounce from "@/hooks/useDebounce";

interface FollowTypeButtonsProps {
  memberId: number;
  status: followType;
  isProfile?: boolean;
}

/**
 * @param {number} memberId - 팔로우 상태를 변경할 대상 유저 id
 * @param {followType} status - 해당 유저에 대한 팔로우 상태
 * @param {boolean} isProfile - 부모 컴포넌트가 프로필인지 (optional)
 */
const FollowTypeButton = ({
  memberId,
  status,
  isProfile,
}: FollowTypeButtonsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { debounce } = useDebounce();

  const handleClickFollowType = async () => {
    if (status === followType.NONE) await axiosFollow(memberId as number);
    if (status === followType.FOLLOWING)
      await axiosUnfollow(memberId as number);
    if (status === followType.BLOCK)
      await axiosUndoBlockUser(memberId as number);
    if (isProfile) queryClient.invalidateQueries(["profile", memberId]);
    setIsLoading(false);
  };

  const handleClickFollowTypeButton = () => {
    setIsLoading(true);
    debounce("follow", handleClickFollowType, 500);
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
  &:hover {
    opacity: 0.8;
  }
`;

export default FollowTypeButton;
