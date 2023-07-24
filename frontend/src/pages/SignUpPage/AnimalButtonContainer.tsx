import { useState } from "react";
import styled from "styled-components";

const renderAnimalSpecies = (buttonName: string) => {
  if (buttonName === "DOG") return "🐶 강아지";
  if (buttonName === "CAT") return "🐱 고양이";
  if (buttonName === "FISH") return "🐠 물고기";
  if (buttonName === "BIRD") return "🐤 새";
  if (buttonName === "SMALLANIMAL") return "🐹 소동물";
  if (buttonName === "REPTILES") return "🐍 파충류";
  if (buttonName === "AMPHIBIAN") return "🐸 양서류";
  if (buttonName === "INSECT") return "🐝 곤충";
};

const AnimalButtonContainer = () => {
  const [selectedAnimals, setSelectedAnimals] = useState<Set<string>>(
    new Set(["CAT", "DOG"])
  );
  const buttons: string[] = [
    "DOG",
    "CAT",
    "FISH",
    "BIRD",
    "SMALLANIMAL",
    "REPTILES",
    "AMPHIBIAN",
    "INSECT",
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
    <>
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
    </>
  );
};

const AnimalButtonContainerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 800px;
  margin-bottom: 40px;
`;

const AnimalButtonStyled = styled.button<{
  selectedAnimals: Set<string>;
  buttonName: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 170px;
  margin: 10px 0px;
  border-radius: 50px;
  border: none;
  font-weight: 600;
  font-size: 17px;
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
