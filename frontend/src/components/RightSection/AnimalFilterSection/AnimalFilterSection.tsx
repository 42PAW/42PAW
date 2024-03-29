import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import AnimalButtonContainer from "@/components/AnimalButtonContainer";
import { userInfoState, languageState } from "@/recoil/atom";
import { UserInfoDTO } from "@/types/dto/member.dto";
import { AnimalSpecies } from "@/types/enum/animal.filter.enum";
import { axiosUpdateAnimalCategory } from "@/api/axios/axios.custom";
import useToaster from "@/hooks/useToaster";
import useRightSectionHandler from "@/hooks/useRightSectionHandler";
import useFetch from "@/hooks/useFetch";

const AnimalFilterSection = () => {
  const [language] = useRecoilState<any>(languageState);
  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState);
  const [animalCategory, setAnimalCategory] = useState<AnimalSpecies[] | null>(
    null
  );
  const { popToast } = useToaster();
  const { closeRightSection } = useRightSectionHandler();
  const { fetchMyInfo } = useFetch();

  useEffect(() => {
    //로그인 상태에서 유저 정보 카테고리 불러오기
    if (userInfo) {
      setAnimalCategory(userInfo.animalCategories);
      return;
    }
    const allAnimalSpecies = Object.values(AnimalSpecies);
    setAnimalCategory(allAnimalSpecies);
  }, []);

  const updateAnimalCategory = async () => {
    if (!animalCategory || animalCategory.length === 0) {
      const selectedCategoryMsg = language.selectCategory;
      popToast(selectedCategoryMsg, "N");
      return;
    }
    // 로그인 상태 -> api에 실제 데이터 변경 요청
    if (userInfo) {
      await axiosUpdateAnimalCategory(animalCategory as AnimalSpecies[]);
      fetchMyInfo();
      const categoryChangedToastMsg = language.categoryChangedToast;
      popToast(categoryChangedToastMsg, "P");
    }
    closeRightSection();
  };

  return (
    <WrapperStyled>
      <CategoryIconContainerStyled>
        <img src="/assets/category.svg" />
        {language.filterTitle}
      </CategoryIconContainerStyled>
      {animalCategory && (
        <AnimalButtonContainer
          columns={2}
          buttonRow={50}
          buttonFontSize={145}
          array={animalCategory}
          setter={setAnimalCategory}
        />
      )}
      <SubmitButtonStyled onClick={updateAnimalCategory}>
        {language.confirm}
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
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;

  margin-bottom: 50px;
  color: var(--white);
  font-weight: bold;
  font-size: 1.3rem;
  img {
    margin-left: 17%;
    margin-right: 10px;
    width: 24px;
  }
`;

const SubmitButtonStyled = styled.button`
  cursor: pointer;
  margin-top: 40px;
  width: 100px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--white);
  color: var(--white);
  background-color: transparent;
  &:hover {
    background-color: var(--white);
    color: var(--pink);
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }
`;

export default AnimalFilterSection;
