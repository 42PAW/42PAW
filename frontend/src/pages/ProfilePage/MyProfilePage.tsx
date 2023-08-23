import ProfileTemplate from "@/pages/ProfilePage/Component/ProfileTemplate";
import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import { Board } from "@/types/enum/board.category.enum";
import { useSetRecoilState, useRecoilState } from "recoil";
import { boardCategoryState } from "@/recoil/atom";
import { IBoardInfo } from "@/types/interface/board.interface";

const MyProfilePage = () => {
  const { fetchMyProfile } = useFetch();
  const profileQuery = useQuery({
    queryKey: ["myProfile"],
    queryFn: fetchMyProfile,
    refetchOnMount: "always",
  });
  const { fetchBoards } = useFetch();
  const [boardCategory] = useRecoilState<Board>(boardCategoryState);
  const setBoard = useSetRecoilState<Board>(boardCategoryState);
  const [tabState, setTabState] = useState("myPosts");

  const handleTabState = (newTabState: string) => {
    setTabState(newTabState);
    if (newTabState === "myPosts") {
      setBoard(Board.MINE);
    } else if (newTabState === "scrapPosts") {
      setBoard(Board.SCRAPPED);
    }
  };

  // useEffect(() => {
  //   setBoard(Board.MINE);
  // }, []);

  const boardsQuery = useQuery<IBoardInfo[]>({
    queryKey: ["boards", boardCategory], // 여기서 boardCategory를 그냥 Board.MINE하는게?
    queryFn: fetchBoards,
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
      tabState={tabState}
      onTabChange={handleTabState}
    />
  );
};

export default MyProfilePage;
