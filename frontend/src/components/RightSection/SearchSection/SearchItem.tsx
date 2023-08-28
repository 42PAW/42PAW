import styled from "styled-components";
import { useSetRecoilState } from "recoil";
// import OptionButton from "../../OptionButton";
import FollowTypeButton from "@/components/FollowTypeButton";
import { useCountryEmoji } from "@/hooks/useCountryEmoji";
import { MemberSearchResponseDTO } from "@/types/dto/member.dto.ts";
import useModal from "@/hooks/useModal";
import { ModalType } from "@/types/enum/modal.enum";
import BoardOption from "@/components/BoardOption";
import { currentMemberIdState } from "@/recoil/atom";

const SearchItem = (user: MemberSearchResponseDTO) => {
  const {
    memberId,
    memberName,
    intraName,
    profileImageUrl,
    country,
    statement,
    relationship,
  } = user;

  const { openModal } = useModal();
  const setCurrentMemberId = useSetRecoilState(currentMemberIdState);

  const handleOpenProfile = () => {
    setCurrentMemberId(memberId);
    openModal(ModalType.PROFILECARD);
  };

  return (
    <SearchItemStyled>
      <UserImageContainerStyled>
        <img src={profileImageUrl} onClick={handleOpenProfile} />
      </UserImageContainerStyled>
      <SearchItemRightStyled>
        <NameContainerStyled onClick={handleOpenProfile}>
          <MemberNameStyled>
            {user.memberName}
            {useCountryEmoji(user.country)}
          </MemberNameStyled>
          <IntraNameStyled>{user.intraName}</IntraNameStyled>
        </NameContainerStyled>
        <SearchItemRightSideStyled>
          <FollowTypeButton status={user.relationship} isLoading={false} />
          <BufferStyled />
          <BoardOption memberId={memberId} memberName={memberName} />
        </SearchItemRightSideStyled>
      </SearchItemRightStyled>
    </SearchItemStyled>
  );
};

const SearchItemStyled = styled.div`
  display: flex;
  padding: 10px;
  width: 85%;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 30px;
  background: var(--transparent);
`;

const UserImageContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: 1px solid var(--transparent);
  }
`;

const SearchItemRightStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
`;

const NameContainerStyled = styled.div`
  display: flex;
  width: 60%;
  font-weight: bold;
  padding-left: 10px;
  color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  span {
    margin-top: 5px;
    font-weight: 300;
    font-size: 11px;
  }
`;

const MemberNameStyled = styled.div`
  font-size: 14px;
  font-color: var(--white);
`;

const IntraNameStyled = styled.div`
  font-size: 10px;
`;

const SearchItemRightSideStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const BufferStyled = styled.div`
  width: 10px;
`;

// const StateButtonStyled = styled.button`
//   width: 22%;
//   border-radius: 8px;
//   text-align: center;
//   border: 1px solid var(--white);
//   background: rgba(183, 184, 215, 0.00);
//   cursor: pointer;
//   background-color: ${props => {
//     if (props.rel === "FOLLOWING")
//         return "var(--transparent)";
//     else if (props.rel === "NONE")
//         return "var(--lightpurple)";
//     else if (props.rel === "BLOCKED")
//         return "var(--purple)";
//   }};
//   color: var(--white);
//   transition: background-color ease-in-out;
// `;

export default SearchItem;
