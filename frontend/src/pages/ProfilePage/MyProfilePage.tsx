import ProfileTemplate from "@/pages/ProfilePage/Component/ProfileTemplate";
import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import { Board } from "@/types/enum/board.category.enum";
import { useSetRecoilState, useRecoilState } from "recoil";
import { boardCategoryState } from "@/recoil/atom";
import { IBoardInfo } from "@/types/interface/board.interface";
import { useParams } from "react-router-dom";

const MyProfilePage = () => {
  const { memberId } = useParams<{ memberId: string }>();
  console.log("memberId : ", memberId);
  const { fetchMyProfile } = useFetch();
  const profileQuery = useQuery({
    queryKey: ["myProfile"],
    queryFn: fetchMyProfile,
    refetchOnMount: "always",
  });
  const { fetchBoards } = useFetch();
  const [boardCategory, setBoardCategory] =
    useRecoilState<Board>(boardCategoryState);

  const handleTabState = (newTabState: Board) => {
    setBoardCategory(newTabState);
  };
  console.log(boardCategory);
  useEffect(() => {
    setBoardCategory(Board.MINE);
  }, []);

  const boardsQuery = useQuery<IBoardInfo[]>({
    queryKey: ["profileBoards", boardCategory], // 여기서 boardCategory를 그냥 Board.MINE하는게?
    queryFn: () => fetchBoards(0),
    keepPreviousData: true,
  });

  const isLoading = profileQuery.isLoading || boardsQuery.isLoading;

  if (isLoading) {
    return <LoadingAnimation />;
  }

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
