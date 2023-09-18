import ProfileTemplate from "@/pages/ProfilePage/Component/ProfileTemplate";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import { Board } from "@/types/enum/board.category.enum";
import { useSetRecoilState } from "recoil";
import { boardCategoryState } from "@/recoil/atom";
import { IBoardInfo } from "@/types/interface/board.interface";
import { useParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import styled from "styled-components";

const ProfilePage = () => {
  const { debounce } = useDebounce();
  const [loading, setLoading] = useState(true);
  const { memberId } = useParams<{ memberId: string }>(); // 내 memberId랑 같다면 myProfilePage로 이동 처리해야돼
  const { fetchProfile, fetchBoards } = useFetch(Number(memberId));
  const profileQuery = useQuery({
    queryKey: ["profile", Number(memberId)],
    queryFn: fetchProfile,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  const setBoardCategory = useSetRecoilState<Board>(boardCategoryState);

  useEffect(() => {
    setBoardCategory(Board.OTHER);
    setLoading(true);
    debounce("profileLoading", () => setLoading(false), 200);
  }, []); // 빈 배열을 넣어 마운트 시 한 번만 실행되도록 함

  const boardsQuery = useQuery<IBoardInfo[]>({
    queryKey: ["profileBoards", Board.OTHER, memberId], // 여기서 boardCategory를 그냥 Board.MINE하는게?
    queryFn: () => fetchBoards(Board.OTHER, 0),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const isLoading = loading || profileQuery.isLoading || boardsQuery.isLoading;

  if (isLoading) {
    return (
      <>
        <LoadingAnimation />
        <WrapperStyled></WrapperStyled>
      </>
    );
  }

  return (
    <WrapperStyled>
      <ProfileTemplate
        profileInfo={profileQuery.data || null}
        boards={boardsQuery.data || null}
        memberId={Number(memberId)}
      />
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export default ProfilePage;
