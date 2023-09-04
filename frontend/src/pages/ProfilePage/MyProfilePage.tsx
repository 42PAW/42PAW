import ProfileTemplate from "@/pages/ProfilePage/Component/ProfileTemplate";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import { Board } from "@/types/enum/board.category.enum";
import { useRecoilState, useSetRecoilState } from "recoil";
import { boardCategoryState, myProfileInfoState } from "@/recoil/atom";
import { IBoardInfo } from "@/types/interface/board.interface";
import { useNavigate } from "react-router-dom";
import { IchangeProfileInfo } from "@/types/interface/profile.interface";
import useDebounce from "@/hooks/useDebounce";
import styled from "styled-components";

const MyProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const { debounce } = useDebounce();
  const { fetchProfile } = useFetch();
  const navigator = useNavigate();
  const profileQuery = useQuery({
    queryKey: ["myProfile"],
    queryFn: fetchProfile,
  });
  const { fetchBoards } = useFetch();
  const [boardCategory, setBoardCategory] =
    useRecoilState<Board>(boardCategoryState);
  const setMyInfo = useSetRecoilState<IchangeProfileInfo>(myProfileInfoState);

  const handleTabState = (newTabState: Board) => {
    setBoardCategory(newTabState);
  };

  useEffect(() => {
    setBoardCategory(Board.MINE);
    setLoading(true);
    debounce("myProfileLoading", () => setLoading(false), 400);
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  useEffect(() => {
    if (profileQuery.data) {
      // profileQuery.data가 존재하는 경우에만 setMyInfo 호출
      setMyInfo({
        memberName: profileQuery.data.memberName,
        imageData: profileQuery.data.profileImageUrl,
        statement: profileQuery.data.statement,
        nicknameUpdatedAt: profileQuery.data.nicknameUpdatedAt,
      });
    }
  }, [profileQuery.data]); // profileQuery.data가 변경될 때마다 실행

  const boardsQuery = useQuery<IBoardInfo[]>({
    queryKey: ["profileBoards", boardCategory], // 여기서 boardCategory를 그냥 Board.MINE하는게?
    queryFn: () => fetchBoards(0),
    keepPreviousData: true,
  });

  const isLoading = loading || profileQuery.isLoading || boardsQuery.isLoading;
  const isError = profileQuery.isError || boardsQuery.isError;

  if (isLoading) {
    return (
      <>
        <LoadingAnimation />
        <WrapperStyled></WrapperStyled>
      </>
    );
  }

  if (isError) navigator("/");

  return (
    <WrapperStyled>
      <ProfileTemplate
        userInfo={profileQuery.data || null}
        boards={boardsQuery.data || null}
        tabState={boardCategory}
        onTabChange={handleTabState}
        memberId={0}
      />
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  height: 100vh;
  width: 100%;
`;

export default MyProfilePage;
