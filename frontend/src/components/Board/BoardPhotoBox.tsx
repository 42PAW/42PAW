import { useState } from "react";
import styled from "styled-components";
import { IBoardImages } from "../../types/interface/board.interface";

const BoardPhotoBox = ({ boardImages }: { boardImages: IBoardImages[] }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const imagesLength = boardImages.length;
  const handleShowButtons = (state: string) => {
    if (state === "show") {
      setIsHovered(true);
    } else if (state === "hide") {
      setIsHovered(false);
    }
  };

  const handleSwipe = (direction: string) => {
    if (direction === "LEFT" && photoIndex > 0) {
      setPhotoIndex(photoIndex - 1);
    }
    if (direction === "RIGHT" && photoIndex < imagesLength - 1) {
      setPhotoIndex(photoIndex + 1);
    }
  };

  return (
    <WrapperStyled
      onMouseEnter={() => handleShowButtons("show")}
      onMouseLeave={() => handleShowButtons("hide")}
    >
      <PhotoZoneStyled $photoIndex={photoIndex}>
        {boardImages.map((boardImage) => (
          <img key={boardImage.index} src={boardImage.imageUrl} />
        ))}
      </PhotoZoneStyled>
      <SwipeButtonStyled
        $isHovered={isHovered}
        $isLeft={true}
        onClick={() => handleSwipe("LEFT")}
      >
        <img src="/src/assets/arrowW.png" />
      </SwipeButtonStyled>
      <SwipeButtonStyled
        $isHovered={isHovered}
        onClick={() => handleSwipe("RIGHT")}
      >
        <img src="/src/assets/arrowW.png" />
      </SwipeButtonStyled>
      <IndexDotsContainerStyled>
        {Array.from({ length: imagesLength }).map((_, index) => (
          <IndexDotStyled
            key={index}
            $index={index}
            $currentIndex={photoIndex}
          />
        ))}
      </IndexDotsContainerStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;

  position: relative;
  align-items: center;
  width: 100%;
  height: 78%;
  background-color: black;
`;

const PhotoZoneStyled = styled.div<{ $photoIndex: number }>`
  height: 100%;
  width: 100%;
  display: flex;

  align-items: center;
  overflow-x: hidden;
  img {
    transform: translateX(${(props) => props.$photoIndex * -100}%);
    height: 100%;
    width: 100%;
    min-height: 100%;
    min-width: 100%;
    transition: transform 0.5s ease;
  }
`;

const SwipeButtonStyled = styled.button<{
  $isHovered: boolean;
  $isLeft?: boolean;
}>`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: none;
  img {
    opacity: ${(props) => (props.$isHovered ? 0.5 : 0)};
    width: 100%;
    transition: opacity 0.2s ease-in-out;
    transform: ${(props) => (props.$isLeft ? "scaleX(-1)" : "none")};
  }
  img:hover {
    opacity: 0.9;
  }
  left: ${(props) => (props.$isLeft ? "0%" : "89%")};
  right: ${(props) => (props.$isLeft ? "87%" : "0%")};
`;

const IndexDotsContainerStyled = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 97%;
  width: 100%;
`;

const IndexDotStyled = styled.div<{ $index: number; $currentIndex: number }>`
  height: 7px;
  width: 7px;
  background-color: ${(props) =>
    props.$index === props.$currentIndex
      ? "var(--white)"
      : "var(--transparent)"};
  transition: background-color 0.3s ease-in-out;
  border-radius: 100%;
  margin: 0px 3px;
`;

export default BoardPhotoBox;
