import { useState } from "react";
import styled from "styled-components";
import { AnimalSpecies } from "../types/enum/animal.filter.enum";

const renderAnimalSpecies = (buttonName: string) => {
  if (buttonName === AnimalSpecies.DOG) return "🐶 강아지";
  if (buttonName === AnimalSpecies.CAT) return "🐱 고양이";
  if (buttonName === AnimalSpecies.FISH) return "🐠 물고기";
  if (buttonName === AnimalSpecies.BIRD) return "🐤 새";
  if (buttonName === AnimalSpecies.SMALLANIMAL) return "🐹 소동물";
  if (buttonName === AnimalSpecies.REPTILES) return "🐍 파충류";
  if (buttonName === AnimalSpecies.AMPHIBIAN) return "🐸 양서류";
  if (buttonName === AnimalSpecies.INSECT) return "🐝 곤충";
};

const AnimalButtonContainer = () => {
  const [selectedAnimals, setSelectedAnimals] = useState<Set<string>>(
    new Set([AnimalSpecies.DOG, AnimalSpecies.CAT])
  );
  const buttons: string[] = [
    AnimalSpecies.DOG,
    AnimalSpecies.CAT,
    AnimalSpecies.FISH,
    AnimalSpecies.BIRD,
    AnimalSpecies.SMALLANIMAL,
    AnimalSpecies.REPTILES,
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
  };

  return (
    <AnimalButtonContainerStyled>
      {buttons.map((buttonName) => (
        <AnimalButtonStyled
          key={buttonName}
          onClick={() => handleButtonClick(buttonName)}
          selectedAnimals={selectedAnimals}
          buttonName={buttonName}
        >
          {renderAnimalSpecies(buttonName)}
        </AnimalButtonStyled>
      ))}
    </AnimalButtonContainerStyled>
  );
};

const AnimalButtonContainerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const AnimalButtonStyled = styled.button<{
  selectedAnimals: Set<string>;
  buttonName: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;
  width: 23%;
  margin: 10px 0px;
  border-radius: 50px;
  border: none;
  font-weight: 600;
  font-size: 145%;
  color: ${(props) =>
    props.selectedAnimals.has(props.buttonName)
      ? "var(--white)"
      : "var(--grey)"};
  background-color: ${(props) =>
    props.selectedAnimals.has(props.buttonName)
      ? "var(--lightpurple)"
      : "var(--white)"};
  box-shadow: ${(props) =>
    props.selectedAnimals.has(props.buttonName)
      ? "var(--clicked-shadow)"
      : "var(--button-shadow)"};
  &:hover {
    opacity: 0.8;
  }
`;

export default AnimalButtonContainer;
