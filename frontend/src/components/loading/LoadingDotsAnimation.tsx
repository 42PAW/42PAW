import styled, { keyframes } from "styled-components";
import { followType } from "@/types/enum/followType.enum";

interface Props {
  status: followType;
}

const LoadingDotsAnimation = ({ status }: Props) => {
  return <LoadingSpinner $status={status} />;
};

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div<{ $status: followType }>`
  &:not(:required) {
    font: 0/0 a;
    color: transparent;
    text-shadow: none;
    background-color: transparent;
    border: 0;
  }

  &:not(:required)::after {
    content: "";
    display: block;
    font-size: 4px;
    width: 4px;
    height: 4px;

    animation: ${spinAnimation} 1500ms infinite linear;
    border-radius: 0.5em;
    box-shadow: ${(props) =>
      props.$status === followType.FOLLOWING
        ? "#d1c1cd75 1.5em 0 0 0, #d1c1cd75 1.1em 1.1em 0 0, #d1c1cd75 0 1.5em 0 0, #d1c1cd75 -1.1em 1.1em 0 0, #d1c1cd50 -1.5em 0 0 0, #d1c1cd50 -1.1em -1.1em 0 0, #d1c1cd75 0 -1.5em 0 0, #d1c1cd75 1.1em -1.1em 0 0"
        : "rgba(255, 255, 255, 0.75) 1.5em 0 0 0, rgba(255, 255, 255, 0.75) 1.1em 1.1em 0 0, rgba(255, 255, 255, 0.75) 0 1.5em 0 0, rgba(255, 255, 255, 0.75) -1.1em 1.1em 0 0, rgba(255, 255, 255, 0.5) -1.5em 0 0 0, rgba(255, 255, 255, 0.5) -1.1em -1.1em 0 0, rgba(255, 255, 255, 0.75) 0 -1.5em 0 0, rgba(255, 255, 255, 0.75) 1.1em -1.1em 0 0"};
  }
`;

export default LoadingDotsAnimation;
