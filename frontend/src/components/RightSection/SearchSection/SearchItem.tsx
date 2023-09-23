import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
// import OptionButton from "../../OptionButton";
import FollowTypeButton from "@/components/FollowTypeButton";
import { useCountryEmoji } from "@/hooks/useCountryEmoji";
import { MemberSearchResponseDTO } from "@/types/dto/member.dto.ts";
import useModal from "@/hooks/useModal";
import { ModalType } from "@/types/enum/modal.enum";
import { currentMemberIdState } from "@/recoil/atom";
import { callbackStoreState } from "@/recoil/atom";
import MeatballButton from "@/components/MeatballButton";

interface SearchItemProps extends MemberSearchResponseDTO {
  updateFollowType: () => void;
  isMine: boolean;
}

const SearchItem = (props: SearchItemProps) => {
  const {
    memberId,
    memberName,
    intraName,
    profileImageUrl,
    country,
    relationship,
    updateFollowType,
    isMine,
  } = props;

  const { openModal } = useModal();
  const setCurrentMemberId = useSetRecoilState<number | null>(
    currentMemberIdState
  );
  const [callbackStore, setCallbackStore] =
    useRecoilState<Function[]>(callbackStoreState);

  const handleOpenProfile = () => {
    setCurrentMemberId(memberId);
    setCallbackStore([...callbackStore, updateFollowType]);
    openModal(ModalType.PROFILECARD);
  };

  return (
    <SearchItemStyled>
      <UserImageContainerStyled>
        <img
          src={profileImageUrl || "/assets/userW.png"}
          onClick={handleOpenProfile}
        />
      </UserImageContainerStyled>
      <SearchItemRightStyled>
        <NameContainerStyled onClick={handleOpenProfile}>
          <MemberNameStyled>
            {memberName} {useCountryEmoji(country)}
          </MemberNameStyled>
          <IntraNameStyled>{intraName}</IntraNameStyled>
        </NameContainerStyled>
        {!isMine && (
          <SearchItemRightSideStyled>
            <FollowTypeButton
              memberId={memberId}
              status={relationship}
              callback={updateFollowType}
            />
            <BufferStyled />
            <MeatballButton
              memberId={memberId}
              memberName={memberName}
              followStatus={relationship}
              callback={updateFollowType}
              component="search"
            />
          </SearchItemRightSideStyled>
        )}
      </SearchItemRightStyled>
    </SearchItemStyled>
  );
};

const SearchItemStyled = styled.div`
  height: 52px;
  min-height: 52px;
  display: flex;
  align-items: center;
  width: 90%;
  margin-bottom: 15px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 30px;
  background: var(--transparent);
`;

const UserImageContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 11px;
  img {
    cursor: pointer;
    width: 34px;
    height: 34px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 100%;
    border: 1px solid var(--transparent);
  }
`;

const SearchItemRightStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
`;

const NameContainerStyled = styled.div`
  display: flex;
  width: 60%;
  font-weight: 500;
  padding-left: 2px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MemberNameStyled = styled.div`
  cursor: pointer;
  font-size: 1.3rem;
  color: var(--white);
`;

const IntraNameStyled = styled.div`
  cursor: pointer;
  font-size: 1rem;
  color: var(--transparent2);
  transition: all 0.3s ease;
  &:hover {
    color: var(--white);
  }
`;

const SearchItemRightSideStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const BufferStyled = styled.div`
  width: 10px;
`;

export default SearchItem;
