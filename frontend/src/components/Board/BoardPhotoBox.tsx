import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

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
      <PhotoZoneStyled onDoubleClick={handleClickReaction}>
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
              <img src={boardImage} alt={`Image ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </PhotoZoneStyled>
    </WrapperStyled>
  );
};

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
  img {
    height: 100%;
    width: 100%;
    aspect-ratio: 1 / 1;
  }
`;

export default BoardPhotoBox;
