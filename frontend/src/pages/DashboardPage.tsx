import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { axiosGetWorldStatistics } from "@/api/axios/axios.custom";

const DashboardPage = () => {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["worldStatistics"],
  //   queryFn: axiosGetWorldStatistics,
  // });
  // console.log(data);
  return <WrapperStyled></WrapperStyled>;
};

const WrapperStyled = styled.div`
  overflow: scroll;
  width: 100%;
  height: 100vh;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default DashboardPage;
