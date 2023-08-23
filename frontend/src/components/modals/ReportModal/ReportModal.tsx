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
    value: ReportReason.WRONG_ANIMAL_CATEGORY,
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
  const [content, setContent] = useState<string>("");
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
    await axiosReport(
      reportUserInfo.reportedMemberId as number,
      content,
      selectedCategory,
      reportUserInfo.boardId,
      reportUserInfo.commentId
    );
    popToast("신고가 접수됐습니다.", "P");
    resetReportUserInfo();
  };

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <ModalLayout
      modalName={ModalType.REPORT}
      isOpen={currentOpenModal.reportModal}
    >
      <WrapperStyled>
        <h1>신고하기</h1>
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
        <EtcInputStyled
          placeholder="사유를 적어주세요(50자 이내)"
          value={content}
          maxLength={50}
          onChange={handleContent}
        />
        <button onClick={handleSubmitReport}>제출</button>
      </WrapperStyled>
    </ModalLayout>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 300px;
  width: 220px;
  background-color: var(--white);
  border-radius: 10px;
  color: var(--grey);
  h1 {
    font-size: 1.4rem;
    margin-top: 20px;
    font-weight: 500;
  }
  img {
    width: 25px;
  }
  button {
    cursor: pointer;
    margin-top: 10px;
    height: 40px;
    width: 100%;
    font-size: 1.2rem;
    color: var(--grey);
    border: none;
    background-color: transparent;
    border-top: 0.5px solid #eaeaea;
  }
`;

const CategoryContatinerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 160px;
  width: 100%;
  margin-top: 15px;
  margin-left: 90px;
`;

const EtcInputStyled = styled.input`
  margin-top: 8px;
  border: none;
  border-bottom: 0.7px solid var(--grey);
  width: 130px;
  height: 15px;
  outline: none;
  color: var(--grey);
  font-size: 1rem;
  &::placeholder {
    color: var(--lightgrey);
    font-size: 1rem;
  }
`;

export default ReportModal;
