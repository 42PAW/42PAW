import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import ModalLayout from "@/components/modals/ModalLayout";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState } from "@/recoil/atom";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import OptionButton from "@/components/OptionButton";
import { useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import { userInfoState } from "@/recoil/atom";
import { currentMemberIdState } from "@/recoil/atom";
import { UserInfoDTO } from "@/types/dto/member.dto";
import LoadingAnimation from "@/components/loading/LoadingAnimation";

const ProfileCardModal = () => {
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState);
  const [currentMemberId] = useRecoilState<number | null>(currentMemberIdState);
  const { fetchProfile } = useFetch();
  const {
    data: profileData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profileCard"],
    queryFn: fetchProfile,
  });

  if (isLoading) {
    return (
      <>
        <LoadingAnimation />
      </>
    );
  }
  return (
    <ModalLayout
      modalName={ModalType.PROFILECARD}
      isOpen={currentOpenModal.profileCardModal}
    >
      <WrapperStyled>
        <LogoStyled>
          <img src="/src/assets/paw.png" />
        </LogoStyled>
        <OptionButtonContainerStyled>
          <OptionButton />
        </OptionButtonContainerStyled>
        <ProfileImageStyled src={profileData.profileImageUrl} />
        <MainAreaStyled>
          <NickNameStyled>{profileData.memberName}</NickNameStyled>
          <IntraNameStyled>{profileData.intraName}</IntraNameStyled>
          <CountryStyled>🇰🇷 {profileData.country}</CountryStyled>
          <StatementStyled>{profileData.statement}</StatementStyled>
          <CardInfoStyled>
            <InfoItemStyled>
              게시물
              <div>{profileData.boardCount}</div>
            </InfoItemStyled>
            <InfoItemStyled>
              팔로워
              <div>{profileData.followerCount}</div>
            </InfoItemStyled>
            <InfoItemStyled>
              팔로잉
              <div>{profileData.followingCount}</div>
            </InfoItemStyled>
          </CardInfoStyled>
          <ButtonContainerStyled>
            {userInfo?.memberId !== currentMemberId ? (
              <>
                <button>프로필</button>
                <button>팔로우</button>
              </>
            ) : (
              <button>내 프로필</button>
            )}
          </ButtonContainerStyled>
        </MainAreaStyled>
      </WrapperStyled>
    </ModalLayout>
  );
};

const WrapperStyled = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
  height: 300px;
  background-color: var(--white);
  border-radius: 15px;
  color: var(--white);
  @media (max-width: 1023px) {
    width: 280px;
    height: 470px;
  }
`;

const LogoStyled = styled.div`
  z-index: 3;
  position: absolute;
  left: 11px;
  top: 8px;
  img {
    width: 35px;
  }
`;

const OptionButtonContainerStyled = styled.div`
  z-index: 1;
  background-color: transparent;
  padding: none;
  border: none;
  position: absolute;
  right: 10px;
  top: 8px;
  img {
    width: 30px;
  }
  @media (min-width: 1024px) {
    right: 15px;
    top: 5px;
  }
`;

const ProfileImageStyled = styled.img`
  @media (max-width: 1023px) {
    width: 110%;
    border-radius: 0;
  }
  @media (min-width: 1024px) {
    z-index: 2;
    position: absolute;
    height: 380px;
    width: 380px;
    border-radius: 100%;
    left: -110px;
    top: -50px;
    box-shadow: 6px 3px 3px rgba(0, 0, 0, 0.25);
  }
`;

const MainAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: none;
  height: 500px;
  width: 500px;
  background: linear-gradient(
    228deg,
    #878abe 0%,
    #d1c1cd 52.34%,
    #e6dade 76.75%
  );
  @media (max-width: 1023px) {
    position: absolute;
    bottom: -290px;
    border-radius: 100%;
  }
  @media (min-width: 1024px) {
    position: absolute;
    right: -110px;
  }
`;

const NickNameStyled = styled.h1`
  font-size: 1.6rem;
  margin: 0;
  margin-top: 17px;
  color: var(--white);
  @media (min-width: 1024px) {
    margin-top: 35px;
  }
`;

const IntraNameStyled = styled.div`
  color: var(--transparent2);
  transition: color 0.3s ease;
  &:hover {
    color: var(--white);
  }
`;

const CountryStyled = styled.div`
  margin-top: 5px;
`;

const StatementStyled = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  width: 200px;
  text-align: center;
  @media (min-width: 1024px) {
    margin-top: 30px;
  }
`;

const CardInfoStyled = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 240px;
  margin-top: 15px;
  div:nth-child(3) {
    border: none;
  }
  @media (min-width: 1024px) {
    margin-top: 30px;
  }
`;

const InfoItemStyled = styled.div`
  display: flex;
  width: 33.3%;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid var(--transparent2);
`;

const ButtonContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 18px;
  width: 230px;
  @media (min-width: 1024px) {
    margin-top: 40px;
  }
  button {
    height: 33px;
    width: 90px;
    border-radius: 10px;
    border: 1px solid var(--white);
    background-color: transparent;
    color: var(--white);
    transition: background-color 0.3s ease, color 0.3s ease;
    &:hover {
      background-color: var(--white);
      color: var(--pink);
    }
  }
`;

export default ProfileCardModal;
