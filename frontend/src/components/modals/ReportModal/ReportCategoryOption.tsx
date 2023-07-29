import { styled } from "styled-components";
import { ReportReason } from "../../../types/enum/report.enum";

/**
 * @value 신고 사유
 * @label 신고 사유에 대한 label
 * @isSelected 해당 신고 사유가 선택되었는지에 대한 boolean
 * @onSelect 선택되었을 시, value(신고 사유)를 set해 주기 위한 함수
 */
interface ReportCategoryOptionProps {
  value: ReportReason;
  label: string;
  isSelected: boolean;
  onSelect: (category: ReportReason) => void;
}

const ReportCategoryOption: React.FC<ReportCategoryOptionProps> = ({
  value,
  label,
  isSelected,
  onSelect,
}) => {
  return (
    <LabelStyled $isSelected={isSelected}>
      <RadioInputStyled
        type="radio"
        value={value}
        checked={isSelected}
        onChange={() => onSelect(value)}
      />
      {label}
    </LabelStyled>
  );
};

const LabelStyled = styled.label<{ $isSelected: boolean }>`
  cursor: pointer;
  position: relative;
  padding-left: 25px;
  font-size: 12px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: 10px;
    height: 10px;
    border: 2px solid #cccccc;
    border-radius: 50%;
    background-color: ${(props) =>
      props.$isSelected ? "var(--purple)" : "transparent"};
    transition: background-color 0.2s ease;
  }
`;

const RadioInputStyled = styled.input.attrs({ type: "radio" })`
  display: none;
`;

export default ReportCategoryOption;
