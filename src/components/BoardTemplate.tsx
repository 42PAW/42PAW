import styled from "styled-components";

const BoardTemplate = () => {
  return (
    <>
      <BoardWrapperStyled>
        <BoardHeaderStyled>
          <BoardProfileStyled>
            <img src="/src/assets/profileImage.jpg" />
            <div>오덕애비</div>
            <div></div>
          </BoardProfileStyled>
          <BoardBurgerStyled>
            <img src="src/assets/burgerW.png" />
          </BoardBurgerStyled>
        </BoardHeaderStyled>
        <BoardBodyStyled>
          <PhotoZoneWrapperStyled>
            <PhotoZoneStyled>
              <img src="/src/assets/oduck.png" />
            </PhotoZoneStyled>
          </PhotoZoneWrapperStyled>
        </BoardBodyStyled>
      </BoardWrapperStyled>
    </>
  );
};

const BoardWrapperStyled = styled.div`
  border-radius: 50px;
  margin-top: 3%;
  margin-bottom: 3%;
  height: 90vh;
  width: 90%;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.25);
`;

const BoardHeaderStyled = styled.div`
  display: flex;
  background-color: #fdfdfd39;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  justify-content: space-between;
  width: 100%;
  height: 8%;
`;

const BoardProfileStyled = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3%;
  width: 40%;
  img {
    width: 15%;
    border-radius: 100%;
  }
  div {
    margin-left: 3%;
    font-size: 150%;
    color: #ffffff;
  }
`;

const BoardBurgerStyled = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
  background-color: transparent;
  border: none;
  img {
    width: 8%;
    margin-right: 10%;
  }
`;

const BoardBodyStyled = styled.div`
  height: 92%;
  background-color: #ffffff;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

const PhotoZoneWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 75%;
  width: 100%;
  /* background-color: red; */
`;

const PhotoZoneStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95%;
  width: 100%;
  img {
    width: 90%;
    border-radius: 30px;
  }
`;

export default BoardTemplate;
