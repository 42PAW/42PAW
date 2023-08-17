import ProfileTemplate from "@/pages/ProfilePage/Component/ProfileTemplate";
import useFetch from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
const MyProfilePage = () => {
  const { fetchMyProfile } = useFetch();
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["myProfile"],
    queryFn: fetchMyProfile,
  });

  if (isLoading) {
    return <LoadingAnimation />;
  }
  return <ProfileTemplate userInfo={profileData} />;
};

export default MyProfilePage;
