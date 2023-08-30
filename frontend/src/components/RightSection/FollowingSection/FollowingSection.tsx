import { styled } from "styled-components";
import { FollowerDTO, UserInfoDTO } from "@/types/dto/member.dto.ts";
import SearchItem from "@/components/RightSection/SearchSection/SearchItem";
import { userInfoState } from "@/recoil/atom";
import { useRecoilState } from "recoil";
import useFetch from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import { useParams } from "react-router-dom";

const FollowingSection = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const { fetchFollowingList } = useFetch(Number(memberId));
  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState); // isMine 체크, 나중에 다른 방법 없나 확인해보기
  const followingQuery = useQuery({
    queryKey: ["followingList", memberId || userInfo?.memberId],
    queryFn: fetchFollowingList, // debounce 추가할거면 추가하기
    refetchOnMount: "always",
  });

  if (followingQuery.isLoading) {
    return <LoadingAnimation />;
  }

  const handleUpdateFollowType = async () => {
    // 팔로우 상태 변경 후 최신 데이터를 가져옴
    await fetchFollowingList();
    followingQuery.refetch(); // 쿼리를 수동으로 다시 호출하여 데이터를 업데이트함
  };

  return (
    <WrapperStyled>
      <FollowerItemWrapperStyled>
        {followingQuery.data && followingQuery.data.length > 0 ? (
          followingQuery.data.map((user: FollowerDTO) => (
            <SearchItem
              key={user.memberId}
              memberId={user.memberId}
              memberName={user.memberName}
              intraName={user.intraName}
              profileImageUrl={user.profileImageUrl}
              country={user.country}
              statement={user.statement}
              relationship={user.relationship}
              updateFollowType={handleUpdateFollowType}
              isMine={userInfo?.memberId === user.memberId}
            />
          ))
        ) : (
          <NoSearchMessageStyled>팔로우를 해보세요.</NoSearchMessageStyled>
        )}
      </FollowerItemWrapperStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  overflow: hidden;
`;

const FollowerItemWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const NoSearchMessageStyled = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 1.3rem;
  color: var(--white);
  opacity: 0.7;
`;

export default FollowingSection;
