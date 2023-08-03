import styled, { css } from "styled-components";

interface ButtonProps {
  handleClick: () => void;
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const SIZES = {
  sm: css`
    --button-font-size: 0.875rem;
    --button-padding: 8px 12px;
    --button-radius: 4px;
  `,
  md: css`
    --button-font-size: 1rem;
    --button-padding: 12px 16px;
    --button-radius: 8px;
  `,
  lg: css`
    --button-font-size: 1.6rem;
    --button-padding: 16px 20px;
    --button-radius: 10px;
    --button-width: 300px;
    --button-height: 40px;
  `,
};

const Button = ({ handleClick, size, children }: ButtonProps) => {
  const sizestyle = SIZES[size];

  return (
    <ButtonStyled onClick={handleClick} sizestyle={sizestyle}>
      {children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<{ sizestyle: ReturnType<typeof css> }>`
  ${(p) => p.sizestyle}
  margin: 0;
  border: none;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-size: var(--button-font-size, 1rem);
  //   padding: var(--button-padding, 12px 16px);
  border-radius: var(--button-radius, 8px);
  width: var(--button-width);
  height: var(--button-height);
  font-size: 1.6rem;
  border-radius: 10px;
  background: var(--button-grey, #ffffff);
  color: var(--grey, #ffffff);

  &:active,
  &:hover {
    background: var(--button-grey-hover, #ffffff);
  }
`;

export default Button;
