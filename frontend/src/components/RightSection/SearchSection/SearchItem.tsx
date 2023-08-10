import styled from "styled-components";
import OptionButton from "../../OptionButton";

interface UserData {
  memberId: number;
  memberName: string;
  intraName: string;
  statement : string;
  country: string;
  relationship: string;
  profileImageUrl: string;
}

interface SearchItemProps {
  user: UserData; // Change to user instead of results
}

const SearchItem: React.FC<SearchItemProps> = ( { user } ) => {  
  return (
    <SearchItemStyled>
      <UserImageContainerStyled>
        <img src = "/src/assets/dogLogo.png" />
      </UserImageContainerStyled>
      <SearchItemRightStyled>
        <NameContainerStyled>
          <MemberNameStyled>
            {user.memberName}
          </MemberNameStyled>
          <IntraNameStyled>
            {user.intraName}
          </IntraNameStyled>
        </NameContainerStyled>
        <StateButtonStyled>
          {user.relationship}
        </StateButtonStyled>  
        <OptionButton memberId={user.memberId} memberName={user.memberName} />
      </SearchItemRightStyled>
    </SearchItemStyled>
  );
};

const SearchItemStyled = styled.div`
  display: flex;
  padding: 10px;
  margin-bottom: 20px;
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

const StateButtonStyled = styled.button`
  width: 20%;
  border-radius: 8px;
  border: 1px solid rgba(240, 240, 240, 0.60);
  background: rgba(183, 184, 215, 0.00);
  cursor: pointer
`;

export default SearchItem;