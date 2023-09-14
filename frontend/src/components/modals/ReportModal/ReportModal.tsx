import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import ModalLayout from "@/components/modals//ModalLayout";
import ReportCategoryOption from "@/components/modals/ReportModal/ReportCategoryOption";
import { ReportReason } from "@/types/enum/report.enum";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState, languageState } from "@/recoil/atom";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import useToaster from "@/hooks/useToaster";
import { axiosReport } from "@/api/axios/axios.custom";
import {
  IMeatballMdoalUtils,
  meatballModalUtilsState,
} from "@/components/MeatballButton";
import { ReportDTO } from "@/types/dto/member.dto";
import useModal from "@/hooks/useModal";

const [language] = useRecoilState<any>(languageState);

const reportOptions = [
  {
    value: ReportReason.WRONG_ANIMAL_CATEGORY,
    label: language.incorrectAnimalCategory,
  },
  {
    value: ReportReason.INSULTS,
    label: language.profanityHarrassment,
  },
  {
    value: ReportReason.AD_SPAM,
    label: language.spamAdvertising,
  },
  {
    value: ReportReason.INAPPROPRIATE_NICKNAME,
    label: language.inappropriateUsername,
  },
  {
    value: ReportReason.SEXUAL,
    label: language.explicitContent,
  },
  {
    value: ReportReason.VIOLENCE,
    label: language.violentContent,
  },
  {
    value: ReportReason.IRRELEVANT,
    label: language.irrelevantToAnimals,
  },
  {
    value: ReportReason.ETC,
    label: language.etc,
  },
];

const ReportModal: React.FC = () => {
  const [meatballModalUtils] = useRecoilState<IMeatballMdoalUtils>(
    meatballModalUtilsState
  );
  const [content, setContent] = useState<string>("");
  const [reportUserInfo, setReportUserInfo] = useState<ReportDTO>({
    reportedMemberId: null,
    boardId: null,
    commentId: null,
    reason: null,
    content: "",
  });
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const [selectedCategory, setSelectedCategory] = useState<ReportReason | null>(
    null
  );
  const { popToast } = useToaster();
  const { closeModal } = useModal();

  useEffect(() => {
    setReportUserInfo({
      ...reportUserInfo,
      reportedMemberId: meatballModalUtils.memberId,
      boardId: meatballModalUtils.boardId ?? null,
      commentId: meatballModalUtils.commentId ?? null,
    });
  }, []);

  const handleSelectCategory = (category: ReportReason) => {
    setSelectedCategory(category);
  };

  const handleSubmitReport = async () => {
    if (!selectedCategory) {
      const selectReportReasonMsg = language.selectReportReason;
      popToast(selectReportReasonMsg, "N");
      return;
    }
    await closeModal(ModalType.REPORT);
    await axiosReport(
      reportUserInfo.reportedMemberId as number,
      content,
      selectedCategory,
      reportUserInfo.boardId,
      reportUserInfo.commentId
    );
    const reportSubmittedMsg = language.reportSubmitted;
    popToast(reportSubmittedMsg, "P");
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
        <h1>{language.reportTitle}</h1>
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
          placeholder={language.enterReasonWithin50Characters}
          value={content}
          maxLength={50}
          onChange={handleContent}
        />
        <button onClick={handleSubmitReport}>{language.submit}</button>
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
  border-radius: 0px;
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
