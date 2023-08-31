import { styled } from "styled-components";
import { FollowerDTO, UserInfoDTO } from "@/types/dto/member.dto.ts";
import SearchItem from "@/components/RightSection/SearchSection/SearchItem";
import { userInfoState } from "@/recoil/atom";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import { axiosGetBanList } from "@/api/axios/axios.custom";
import { MemberPreviewResponseDto } from "@/types/dto/member.dto.ts";

const BannedMemberSection = () => {
  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState);
  const BanListQuery = useQuery<MemberPreviewResponseDto[]>({
    queryKey: ["BanList"],
    queryFn: async () => {
      const response = await axiosGetBanList(1000, 0);
      return response.then(
        (res: { result: MemberPreviewResponseDto[] }) => res.result
      );
    }, // debounce 추가할거면 추가하기
    refetchOnMount: "always",
  });

  if (BanListQuery.isLoading) {
    return <LoadingAnimation />;
  }

  const handleUpdateFollowType = async () => {
    // 팔로우 상태 변경 후 최신 데이터를 가져옴
    await axiosGetBanList(1000, 0);
    BanListQuery.refetch(); // 쿼리를 수동으로 다시 호출하여 데이터를 업데이트함
  };

  return (
    <WrapperStyled>
      <BanListWrapperStyled>
        {BanListQuery.data && BanListQuery.data.length > 0 ? (
          BanListQuery.data.map((user: FollowerDTO) => (
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
          <NoSearchMessageStyled>차단한 계정이 없습니다.</NoSearchMessageStyled>
        )}
      </BanListWrapperStyled>
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

const BanListWrapperStyled = styled.div`
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

export default BannedMemberSection;
