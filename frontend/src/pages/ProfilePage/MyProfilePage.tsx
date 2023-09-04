import ProfileTemplate from "@/pages/ProfilePage/Component/ProfileTemplate";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import { Board } from "@/types/enum/board.category.enum";
import { useRecoilState, useSetRecoilState } from "recoil";
import { boardCategoryState, myProfileInfoState } from "@/recoil/atom";
import { IBoardInfo } from "@/types/interface/board.interface";
import { useNavigate } from "react-router-dom";
import { IchangeProfileInfo } from "@/types/interface/profile.interface";

const MyProfilePage = () => {
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

  const isLoading = profileQuery.isLoading || boardsQuery.isLoading;
  const isError = profileQuery.isError || boardsQuery.isError;

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (isError) navigator("/");

  return (
    <ProfileTemplate
      userInfo={profileQuery.data || null}
      boards={boardsQuery.data || null}
      tabState={boardCategory}
      onTabChange={handleTabState}
      memberId={0}
    />
  );
};

export default MyProfilePage;
