import { useRecoilState } from "recoil";
import ProfileTemplate from "@/pages/ProfilePage/Component/ProfileTemplate";
import useFetch from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import { currentMemberIdState } from "@/recoil/atom";

const ProfilePage = () => {
  const [currentMemberId] = useRecoilState<number | null>(currentMemberIdState);
  const { fetchProfile } = useFetch();
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile", currentMemberId],
    queryFn: fetchProfile,
    refetchOnMount: "always",
  });

  if (isLoading) {
    return <LoadingAnimation />;
  }
  return <ProfileTemplate userInfo={profileData || null} />;
};

export default ProfilePage;
