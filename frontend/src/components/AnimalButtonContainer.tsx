import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { AnimalSpecies } from "@/types/enum/animal.filter.enum";

const renderAnimalSpecies = (buttonName: string) => {
  if (buttonName === AnimalSpecies.DOG) return "🐶 강아지";
  if (buttonName === AnimalSpecies.CAT) return "🐱 고양이";
  if (buttonName === AnimalSpecies.FISH) return "🐠 물고기";
  if (buttonName === AnimalSpecies.BIRD) return "🐤 새";
  if (buttonName === AnimalSpecies.SMALLANIMAL) return "🐹 소동물";
  if (buttonName === AnimalSpecies.REPTILE) return "🐍 파충류";
  if (buttonName === AnimalSpecies.AMPHIBIAN) return "🐸 양서류";
  if (buttonName === AnimalSpecies.INSECT) return "🐝 곤충";
};

/**
 * @columns 버튼 컨테이너 열의 개수
 */
interface AnimalButtonContainerProps {
  columns: number;
  buttonRow: number;
  buttonFontSize: number;
  array?: AnimalSpecies[];
  setter: React.Dispatch<React.SetStateAction<any>>;
}

const AnimalButtonContainer = ({
  columns,
  buttonRow,
  buttonFontSize,
  array,
  setter,
}: AnimalButtonContainerProps): JSX.Element => {
  const [selectedAnimals, setSelectedAnimals] = useState<Set<string>>(
    new Set(array ?? [AnimalSpecies.DOG, AnimalSpecies.CAT])
  );

  const buttons: string[] = [
    AnimalSpecies.DOG,
    AnimalSpecies.CAT,
    AnimalSpecies.FISH,
    AnimalSpecies.BIRD,
    AnimalSpecies.SMALLANIMAL,
    AnimalSpecies.REPTILE,
    AnimalSpecies.AMPHIBIAN,
    AnimalSpecies.INSECT,
  ];

  const handleButtonClick = (buttonName: string) => {
    const updatedSelectedAnimals = new Set(selectedAnimals);

    if (updatedSelectedAnimals.has(buttonName)) {
      updatedSelectedAnimals.delete(buttonName);
    } else {
      updatedSelectedAnimals.add(buttonName);
    }
    setSelectedAnimals(updatedSelectedAnimals);
    setter([...updatedSelectedAnimals]);
  };

  return (
    <AnimalButtonContainerStyled $columns={columns} $buttonRow={buttonRow}>
      {buttons.map((buttonName) => (
        <AnimalButtonStyled
          key={buttonName}
          onClick={() => handleButtonClick(buttonName)}
          $selectedAnimals={selectedAnimals}
          $buttonName={buttonName}
          $buttonFontSize={buttonFontSize}
        >
          {renderAnimalSpecies(buttonName)}
        </AnimalButtonStyled>
      ))}
    </AnimalButtonContainerStyled>
  );
};

const waveAnimation = keyframes`
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`;

const AnimalButtonContainerStyled = styled.div<{
  $columns: number;
  $buttonRow: number;
}>`
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 120px);
  grid-auto-rows: ${(props) => `${props.$buttonRow}px`}; //default: 50px
  grid-row-gap: 15px; //default: 15px
  grid-column-gap: 15px; //default: 15px
`;

const AnimalButtonStyled = styled.button<{
  $selectedAnimals: Set<string>;
  $buttonName: string;
  $buttonFontSize: number;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: none;
  margin: 0;
  width: 100%;
  font-weight: 600;
  font-size: ${(props) => `${props.$buttonFontSize}%`}; //default: 145%
  color: ${(props) =>
    props.$selectedAnimals.has(props.$buttonName)
      ? "var(--white)"
      : "var(--grey)"};
  background-color: ${(props) =>
    props.$selectedAnimals.has(props.$buttonName)
      ? "var(--lightpurple)"
      : "var(--white)"};
  box-shadow: ${(props) =>
    props.$selectedAnimals.has(props.$buttonName)
      ? "var(--clicked-shadow)"
      : "var(--button-shadow)"};
  background: ${(props) =>
    props.$selectedAnimals.has(props.$buttonName) &&
    "linear-gradient(270deg, var(--lightpurple), var(--lightpink))"};
  background-size: 200% 200%;
  animation: ${waveAnimation} 3s ease infinite;
  &:hover {
    opacity: 0.8;
  }
`;

export default AnimalButtonContainer;
