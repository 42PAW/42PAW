import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { axiosGetWorldStatistics } from "@/api/axios/axios.custom";

const dummy = [
  {
    country: "KOREA",
    boardCount: 100,
    commentCount: 1234,
    reactionCount: 369,
  },
  {
    country: "USA",
    boardCount: 100,
    commentCount: 1234,
    reactionCount: 369,
  },
  {
    country: "JAPAN",
    boardCount: 100,
    commentCount: 1234,
    reactionCount: 369,
  },
];

const DashboardPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["worldStatistics"],
    queryFn: axiosGetWorldStatistics,
  });
  console.log(data);
  return <WrapperStyled>hello</WrapperStyled>;
};

const WrapperStyled = styled.div`
  width: 100%;
  height: 100vh;
  background-color: blue;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default DashboardPage;
