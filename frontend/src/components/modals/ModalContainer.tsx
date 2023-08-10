import { useRecoilState } from "recoil";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import { currentOpenModalState } from "@/recoil/atom";
import BanModal from "@/components/modals/BanModal/BanModal";
import ReportModal from "@/components/modals/ReportModal/ReportModal";
import ProfileCardModal from "@/components/modals/ProfileCardModal/ProfileCardModal";
import ProfileEditModal from "@/components/modals/ProfileEditModal/ProfileEditModal";
import DeleteModal from "@/components/modals/DeleteModal/DeleteModal";
import LanguageModal from "@/components/modals/LanguageModal/LanguageModal";

const ModalContainer = () => {
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  return (
    <>
      {currentOpenModal.banModal && <BanModal />}
      {currentOpenModal.reportModal && <ReportModal />}
      {currentOpenModal.profileCardModal && <ProfileCardModal />}
      {currentOpenModal.deleteModal && <DeleteModal />}
      {/* {currentOpenModal.profileEditModal && <ProfileEditModal />} */}
      {currentOpenModal.languageModal && <LanguageModal />}
    </>
  );
};

export default ModalContainer;
