import { useRecoilState } from "recoil";
import { ICurrentModalStateInfo } from "../../types/interface/modal.interface";
import { currentOpenModalState } from "../../recoil/atom";
import BanModal from "./BanModal/BanModal";
import ReportModal from "./ReportModal/ReportModal";
import ProfileCardModal from "./ProfileCardModal/ProfileCardModal";
import ProfileEditModal from "./ProfileEditModal/ProfileEditModal";
import DeleteModal from "./DeleteModal/DeleteModal";

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
      {currentOpenModal.profileEditModal && <ProfileEditModal />}
    </>
  );
};

export default ModalContainer;
