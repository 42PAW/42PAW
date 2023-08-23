import styled from "styled-components";
import OptionButton from "../../OptionButton";
import { useState } from "react";
import useToaster from "@/hooks/useToaster";
import FollowTypeButton from "@/components/FollowTypeButton";
import { useCountryEmoji } from "@/hooks/useCountryEmoji";
import { MemberSearchResponseDTO } from "@/types/dto/member.dto.ts";
import useModal from "@/hooks/useModal";
import { ModalType } from "@/types/enum/modal.enum";

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
  const { popToast } = useToaster();
  const [relation, setRelation] = useState(user.relationship);

  const handleOpenProfile = () => {
    openModal(ModalType.PROFILECARD);
  };

  const handleStateChange = () => {
    if (relation === "FOLLOWING") {
      setRelation("NONE");
      popToast(`${user.memberName}의 팔로우를 취소했습니다`, "P");
    } else if (relation === "NONE") setRelation("FOLLOWING");
    else {
      setRelation("NONE");
      popToast(`${user.memberName}의 차단을 해제했습니다`, "P");
    }
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
        <FollowTypeButton status={user.relationship} isLoading={false} />
        <OptionButton memberId={user.memberId} memberName={user.memberName} />
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
    width: 30px;
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
  font-color: var(--white);
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
`;

const IntraNameStyled = styled.div`
  font-size: 10px;
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
