import { styled } from "styled-components";
import { followType } from "@/types/enum/followType.enum";
import LoadingDotsAnimation from "@/components/loading/LoadingDotsAnimation";

interface FollowTypeButtonsProps {
  status: followType;
  isLoading: boolean;
}

const FollowTypeButton = ({ status, isLoading }: FollowTypeButtonsProps) => {
  if (status === followType.NONE)
    return (
      <FollowButtonStyled disabled={isLoading}>
        {isLoading ? <LoadingDotsAnimation status={status} /> : "팔로우"}
      </FollowButtonStyled>
    );
  if (status === followType.FOLLOWING)
    return (
      <FollowingButtonStyled disabled={isLoading}>
        {isLoading ? <LoadingDotsAnimation status={status} /> : "팔로잉"}
      </FollowingButtonStyled>
    );
  if (status === followType.BLOCK)
    return (
      <BannedButtonStyled disabled={isLoading}>
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
  border: 1px solid var(--white);
  background-color: transparent;
  color: var(--white);
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: var(--white);
    color: var(--pink);
  }
`;

export default FollowTypeButton;
