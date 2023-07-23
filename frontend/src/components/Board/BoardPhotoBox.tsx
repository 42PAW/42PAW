import { useState } from "react";
import styled from "styled-components";
import { IBoardImages } from "../../types/interface/board.interface";

const BoardPhotoBox = (boardImages: IBoardImages[]) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <WrapperStyled onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <PhotoZoneStyled>
        {boardImages.boardImages.map((boardImage) => (
          <img key={boardImage.index} src={boardImage.imageUrl} />
        ))}
      </PhotoZoneStyled>
      <LeftButtonStyled $isHovered={isHovered}>
        <img src="/src/assets/arrowW.png" />
      </LeftButtonStyled>
      <RightButtonStyled $isHovered={isHovered}>
        <img src="/src/assets/arrowW.png" />
      </RightButtonStyled>
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
  overflow-x: scroll;
`;

const PhotoZoneStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  overflow-x: auto;
  img {
    height: 100%;
    width: 100%;
    min-height: 100%;
    min-width: 100%;
  }
`;

const LeftButtonStyled = styled.button<{ $isHovered: boolean }>`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: none;
  img {
    opacity: ${(props) => (props.$isHovered ? 0.5 : 0)};
    width: 100%;
    transition: opacity 0.2s ease-in-out;
    transform: scaleX(-1);
  }
  img:hover {
    opacity: 0.8;
  }
  right: 87%;
`;

const RightButtonStyled = styled.button<{ $isHovered: boolean }>`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: none;
  img {
    opacity: ${(props) => (props.$isHovered ? 0.5 : 0)};
    width: 100%;
    transition: opacity 0.2s ease-in-out;
  }
  img:hover {
    opacity: 0.8;
  }
  left: 87%;
`;

export default BoardPhotoBox;
