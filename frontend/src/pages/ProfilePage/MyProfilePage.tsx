import ProfileTemplate from "@/pages/ProfilePage/Component/ProfileTemplate";
import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import { Board } from "@/types/enum/board.category.enum";
import { useSetRecoilState, useRecoilState } from "recoil";
import { boardCategoryState } from "@/recoil/atom";
import { IBoardInfo } from "@/types/interface/board.interface";
import { useNavigate } from "react-router-dom";

const MyProfilePage = () => {
  const { fetchProfile } = useFetch();
  const navigator = useNavigate();
  const profileQuery = useQuery({
    queryKey: ["myProfile"],
    queryFn: fetchProfile,
    refetchOnMount: "always",
  });
  const { fetchBoards } = useFetch();
  const [boardCategory, setBoardCategory] =
    useRecoilState<Board>(boardCategoryState);

  const handleTabState = (newTabState: Board) => {
    setBoardCategory(newTabState);
  };

  useEffect(() => {
    setBoardCategory(Board.MINE);
  }, []);

  const boardsQuery = useQuery<IBoardInfo[]>({
    queryKey: ["profileBoards", boardCategory], // 여기서 boardCategory를 그냥 Board.MINE하는게?
    queryFn: () => fetchBoards(0),
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
