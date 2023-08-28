import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import AnimalButtonContainer from "@/components/AnimalButtonContainer";
import { userInfoState } from "@/recoil/atom";
import { UserInfoDTO } from "@/types/dto/member.dto";
import { AnimalSpecies } from "@/types/enum/animal.filter.enum";
import { axiosUpdateAnimalCategory } from "@/api/axios/axios.custom";
import useToaster from "@/hooks/useToaster";
import useRightSectionHandler from "@/hooks/useRightSectionHandler";
import { useQueryClient } from "@tanstack/react-query";
import { boardCategoryState } from "@/recoil/atom";
import { Board } from "@/types/enum/board.category.enum";

const AnimalFilterSection = () => {
  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState);
  const [animalCategory, setAnimalCategory] = useState<AnimalSpecies[] | null>(
    null
  );
  const [boardCategory] = useRecoilState<Board>(boardCategoryState);
  const queryClient = useQueryClient();
  const { popToast } = useToaster();
  const { closeRightSection } = useRightSectionHandler();

  useEffect(() => {
    //로그인 상태에서 유저 정보 카테고리 불러오기
    if (userInfo) {
      setAnimalCategory(userInfo.animalCategories);
      return;
    }
    const localCategoryValue = localStorage.getItem("animal_category");
    // 로그아웃 상태에서 로컬 스토리지에 저장되어 있는 카테고리 불러오기
    if (!userInfo && localCategoryValue) {
      const localCategory: AnimalSpecies[] = JSON.parse(localCategoryValue);
      setAnimalCategory(localCategory);
      // 로그아웃 상태에서 로컬 스토리지 기록 없을 시, 기본 카테고리 값(모든 동물)
    } else {
      const allAnimalSpecies = Object.values(AnimalSpecies);
      setAnimalCategory(allAnimalSpecies);
    }
  }, []);

  const updateAnimalCategory = () => {
    // 로그인 상태 -> api에 실제 데이터 변경 요청
    if (userInfo) axiosUpdateAnimalCategory(animalCategory as AnimalSpecies[]);
    // 로그아웃 상태 -> 로컬 스토리지에 새로 업데이트할 카테고리 등록
    else {
      localStorage.setItem("animal_category", JSON.stringify(animalCategory));
      queryClient.invalidateQueries(["boards", boardCategory]);
    }
    closeRightSection();
    popToast("동물 카테고리가 변경되었습니다.", "P");
  };

  return (
    <WrapperStyled>
      <CategoryIconContainerStyled>
        <img src="/src/assets/categoryW.png" />
        필터
      </CategoryIconContainerStyled>
      {animalCategory && (
        <AnimalButtonContainer
          columns={2}
          array={animalCategory}
          setter={setAnimalCategory}
        />
      )}
      <SubmitButtonStyled onClick={updateAnimalCategory}>
        확인
      </SubmitButtonStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CategoryIconContainerStyled = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-left: 15%;
  margin-bottom: 50px;
  color: var(--white);
  font-weight: bold;
  font-size: 16px;
  img {
    margin-right: 10px;
    width: 6%;
  }
`;

const SubmitButtonStyled = styled.button`
  cursor: pointer;
  margin-top: 50px;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid var(--white);
  color: var(--white);
  background-color: transparent;
  &:hover {
    background-color: var(--white);
    color: var(--pink);
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }
`;

export default AnimalFilterSection;
