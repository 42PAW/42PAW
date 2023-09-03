import styled, { keyframes } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BoardPhotoBox = ({
  boardImages,
  handleClickReaction,
}: {
  boardImages: string[];
  handleClickReaction: () => void;
}) => {
  return (
    <WrapperStyled>
      <PhotoZoneStyled>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          style={{ zIndex: 0, width: "100vw" }}
        >
          {boardImages.map((boardImage, index) => (
            <SwiperSlide key={index}>
              <img
                src={boardImage}
                alt={`Image ${index}`}
                onDoubleClick={handleClickReaction}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </PhotoZoneStyled>
    </WrapperStyled>
  );
};

const waveAnimation = keyframes`
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`;

const WrapperStyled = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  background-color: var(--white);
  aspect-ratio: 1 / 1;
`;

const PhotoZoneStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(270deg, var(--lightpurple), var(--lightpink));
  background-size: 200% 200%;
  animation: ${waveAnimation} 3s ease infinite;
  img {
    height: 100%;
    width: 100%;
    aspect-ratio: 1 / 1;
  }
`;

export default BoardPhotoBox;
