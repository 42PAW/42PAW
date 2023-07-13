import styled from "styled-components";
import ProfileTemplate from "../components/ProfileTemplate";

const ProfilePage = () => {
  return (
    <WrapperStyled>
      <ProfileTemplate></ProfileTemplate>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ProfilePage;
