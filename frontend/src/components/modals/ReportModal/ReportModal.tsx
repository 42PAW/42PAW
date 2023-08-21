import { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { styled } from "styled-components";
import ModalLayout from "@/components/modals//ModalLayout";
import ReportCategoryOption from "@/components/modals/ReportModal/ReportCategoryOption";
import { ReportReason } from "@/types/enum/report.enum";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState } from "@/recoil/atom";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import useToaster from "@/hooks/useToaster";
import { axiosReport } from "@/api/axios/axios.custom";
import { reportUserInfoState } from "@/recoil/atom";
import { ReportDTO } from "@/types/dto/member.dto";

const reportOptions = [
  {
    value: ReportReason.WRONG_ANIMAL,
    label: "잘못된 동물 카테고리",
  },
  {
    value: ReportReason.INSULTS,
    label: "욕설 및 비방",
  },
  {
    value: ReportReason.AD_SPAM,
    label: "스팸 및 광고",
  },
  {
    value: ReportReason.INAPPROPRIATE_NICKNAME,
    label: "부적절한 닉네임",
  },
  {
    value: ReportReason.SEXUAL,
    label: "음란물",
  },
  {
    value: ReportReason.VIOLENCE,
    label: "폭력적인 글",
  },
  {
    value: ReportReason.IRRELEVANT,
    label: "동물과 관련없는 글",
  },
  {
    value: ReportReason.ETC,
    label: "기타",
  },
];

const ReportModal: React.FC = () => {
  const [reportUserInfo] = useRecoilState<ReportDTO>(reportUserInfoState);
  const resetReportUserInfo = useResetRecoilState(reportUserInfoState);
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const [selectedCategory, setSelectedCategory] = useState<ReportReason | null>(
    null
  );
  const { popToast } = useToaster();

  const handleSelectCategory = (category: ReportReason) => {
    setSelectedCategory(category);
  };

  const handleSubmitReport = async () => {
    if (!selectedCategory) {
      popToast("신고 사유를 선택해주세요.", "N");
      return;
    }
    console.log(reportUserInfo, selectedCategory);
    await axiosReport(
      reportUserInfo.reportedMemberId as number,
      "hello",
      selectedCategory,
      reportUserInfo.boardId,
      reportUserInfo.commentId
    );
    popToast("신고가 접수됐습니다.", "P");
    resetReportUserInfo();
  };

  return (
    <ModalLayout
      modalName={ModalType.REPORT}
      isOpen={currentOpenModal.reportModal}
    >
      <WrapperStyled>
        <h1>신고하기</h1>
        <img src="/src/assets/report.png" />
        <CategoryContatinerStyled>
          {reportOptions.map((option) => (
            <ReportCategoryOption
              key={option.value}
              value={option.value}
              label={option.label}
              isSelected={selectedCategory === option.value}
              onSelect={handleSelectCategory}
            />
          ))}
        </CategoryContatinerStyled>
        <EtcInputStyled placeholder="사유를 적어주세요" maxLength={50} />
        <button onClick={handleSubmitReport}>제출</button>
      </WrapperStyled>
    </ModalLayout>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 400px;
  width: 270px;
  background-color: var(--white);
  border-radius: 15px;
  color: var(--grey);
  h1 {
    font-size: 16px;
    margin-top: 28px;
    margin-bottom: 7px;
  }
  img {
    width: 25px;
  }
  button {
    cursor: pointer;
    margin-top: 30px;
    height: 30px;
    width: 90px;
    border: none;
    background-color: var(--grey);
    color: var(--white);
    border: none;
    border-radius: 5px;
  }
  button:hover {
    background-color: var(--purple);
    transition: background-color 0.2s ease-in-out;
  }
`;

const CategoryContatinerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 160px;
  width: 100%;
  margin-top: 35px;
  margin-left: 90px;
`;

const EtcInputStyled = styled.input`
  margin-top: 5px;
  border: none;
  border-bottom: 0.7px solid var(--grey);
  width: 170px;
  height: 25px;
  outline: none;
  color: var(--grey);
  font-size: 12px;
  &::placeholder {
    color: var(--lightgrey);
    font-size: 12px;
  }
`;

export default ReportModal;
