import ProfileTemplate from "@/pages/ProfilePage/Component/ProfileTemplate";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import { Board } from "@/types/enum/board.category.enum";
import { useRecoilState } from "recoil";
import { boardCategoryState } from "@/recoil/atom";
import { IBoardInfo } from "@/types/interface/board.interface";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { memberId } = useParams<{ memberId: string }>();
  console.log(memberId);
  const { fetchProfile, fetchBoards } = useFetch(Number(memberId));
  const profileQuery = useQuery({
    queryKey: ["profile", Number(memberId)],
    queryFn: fetchProfile,
    refetchOnMount: "always",
  });
  // const { fetchBoards } = useFetch();
  const [boardCategory, setBoardCategory] =
    useRecoilState<Board>(boardCategoryState);

  useEffect(() => {
    setBoardCategory(Board.OTHER);
  }, []); // 빈 배열을 넣어 마운트 시 한 번만 실행되도록 함

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
      isMyProfile={false}
    />
  );
};

export default ProfilePage;
