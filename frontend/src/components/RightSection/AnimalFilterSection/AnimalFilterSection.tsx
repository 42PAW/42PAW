import { styled } from "styled-components";
import AnimalButtonContainer from "../../AnimalButtonContainer";

const AnimalFilterSection = () => {
  return (
    <WrapperStyled>
      <CategoryIconContainerStyled>
        <img src="/src/assets/categoryW.png" />
        필터
      </CategoryIconContainerStyled>
      <AnimalButtonContainer columns={2} />
      <SubmitButtonStyled>확인</SubmitButtonStyled>
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
