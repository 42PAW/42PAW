import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import ModalLayout from "@/components/modals/ModalLayout";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState } from "@/recoil/atom";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import BoardOption from "@/components/OptionButton/BoardOption";
import { useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import { userInfoState } from "@/recoil/atom";
import { currentMemberIdState } from "@/recoil/atom";
import { ProfileInfoDTO, UserInfoDTO } from "@/types/dto/member.dto";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import useNavigateCustom from "@/hooks/useNavigateCustom";
import useModal from "@/hooks/useModal";
import { useCountryEmoji } from "@/hooks/useCountryEmoji";
import { Country } from "@/types/enum/country.enum";
import FollowTypeButton from "../../FollowTypeButton";
import { useQueryClient } from "@tanstack/react-query";

const ProfileCardModal = () => {
  const queryClient = useQueryClient();
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState);
  const [currentMemberId] = useRecoilState<number | null>(currentMemberIdState);
  const { fetchProfile } = useFetch();
  const { moveToMyProfile, moveToProfile } = useNavigateCustom();
  const { closeModal } = useModal();
  const { data, isLoading } = useQuery({
    queryKey: ["profile", currentMemberId],
    queryFn: fetchProfile,
    keepPreviousData: true,
  });

  const profileData = data as ProfileInfoDTO;

  const toMyProfile = () => {
    moveToMyProfile();
    closeModal(ModalType.PROFILECARD);
  };

  const toProfile = () => {
    moveToProfile();
    closeModal(ModalType.PROFILECARD);
  };

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
      zIndex={9998}
    >
      <WrapperStyled>
        <LogoStyled>
          <img src="/src/assets/paw.png" />
        </LogoStyled>
        <OptionButtonContainerStyled>
          {currentMemberId !== userInfo?.memberId && (
            <BoardOption
              memberId={currentMemberId as number}
              memberName={profileData.memberName}
              callback={() => {
                queryClient.invalidateQueries([
                  "profile",
                  currentMemberId as number,
                ]);
              }}
            />
          )}
        </OptionButtonContainerStyled>
        <ProfileImageStyled src={profileData.profileImageUrl} />
        <MainAreaStyled>
          <NickNameStyled>{profileData.memberName}</NickNameStyled>
          <IntraNameStyled>{profileData.intraName}</IntraNameStyled>
          <CountryStyled>
            {useCountryEmoji(profileData.country as Country)}{" "}
            {profileData.campus}
          </CountryStyled>
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
                <ButtonStyled onClick={toProfile}>프로필</ButtonStyled>
                <FollowTypeButton
                  memberId={currentMemberId as number}
                  status={profileData.followType}
                  callback={() => {
                    queryClient.invalidateQueries([
                      "profile",
                      currentMemberId as number,
                    ]);
                  }}
                />
              </>
            ) : (
              <MyProfileButtonStyled onClick={toMyProfile}>
                내 프로필
              </MyProfileButtonStyled>
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
    width: 25px;
  }
  @media (min-width: 1024px) {
    right: 10px;
    top: 5px;
  }
`;

const ProfileImageStyled = styled.img`
  @media (max-width: 1023px) {
    width: 110%;
    aspect-ratio: 1 / 1;
    border-radius: 0;
  }
  @media (min-width: 1024px) {
    z-index: 2;
    position: absolute;
    height: 380px;
    width: 380px;
    border-radius: 50%;
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
    right: -130px;
    padding-left: 130px;
    width: 550px;
    height: 300px;
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
`;

const ButtonStyled = styled.button`
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
`;

const MyProfileButtonStyled = styled.button`
  height: 33px;
  width: 120px;
  border-radius: 10px;
  border: 1px solid var(--white);
  background-color: transparent;
  color: var(--white);
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: var(--white);
    color: var(--pink);
  }
`;

export default ProfileCardModal;
