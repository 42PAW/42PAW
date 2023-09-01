import { styled } from "styled-components";
import { FollowerDTO, UserInfoDTO } from "@/types/dto/member.dto.ts";
import SearchItem from "@/components/RightSection/SearchSection/SearchItem";
import { userInfoState } from "@/recoil/atom";
import { useRecoilState } from "recoil";
import useFetch from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import { useParams } from "react-router-dom";

const FollowerSection = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const { fetchFollowerList } = useFetch(Number(memberId));
  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState);
  const followerQuery = useQuery({
    queryKey: ["followerList", memberId || userInfo?.memberId],
    queryFn: fetchFollowerList, // debounce 추가할거면 추가하기
    refetchOnMount: "always",
  });

  if (followerQuery.isLoading) {
    return <LoadingAnimation />;
  }

  const handleUpdateFollowType = async () => {
    await fetchFollowerList();
    followerQuery.refetch(); // 쿼리를 수동으로 다시 호출하여 데이터를 업데이트함
  };

  return (
    <WrapperStyled>
      <FollowerItemWrapperStyled>
        {followerQuery.data && followerQuery.data.length > 0 ? (
          followerQuery.data.map((user: FollowerDTO) => (
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
          <NoSearchMessageStyled>팔로워가 없습니다.</NoSearchMessageStyled>
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

export default FollowerSection;
