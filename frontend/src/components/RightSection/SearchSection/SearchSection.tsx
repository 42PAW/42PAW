import { styled, keyframes } from "styled-components";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { searchInputState } from "@/recoil/atom";
import { MemberSearchResponseDTO } from "@/types/dto/member.dto.ts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SearchItem from "@/components/RightSection/SearchSection/SearchItem";
import { axiosGetSearchResults } from "@/api/axios/axios.custom";
import LoadingCircleAnimation from "@/components/loading/LoadingCircleAnimation";
import useDebounce from "@/hooks/useDebounce";
import useToaster from "@/hooks/useToaster";

const SearchSection = () => {
  const [isInput, setIsInput] = useState(false); // 검색창에 입력이 되었는지 확인: if not, shake animation
  //   const { fetchSearchResults } = useFetch(); // 검색 결과를 가져오는 함수
  const [searchInput, setSearchInput] =
    useRecoilState<string>(searchInputState); // 검색어
  const queryClient = useQueryClient(); // 쿼리 클라이언트
  const { debounce } = useDebounce(); // 디바운스 훅
  const { popToast } = useToaster(); // 토스트 훅
  // const {
  // 	data: searchResults,
  // 	isLoading,
  // 	isError,
  // 	error,
  // } = useQuery({
  // 	queryKey: ["search"],
  // 	queryFn: fetchSearchResults,

  // }); // 검색 결과를 가져오는 함수
  const [searchResults, setSearchResults] = useState([]);

  const submitSearch = async () => {
    if (searchInput == "") return;
    const result = await axiosGetSearchResults(searchInput, 100, 0);
    setSearchResults(result);
  };
  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
    debounce("search", submitSearch, 300);
  };

  const handleInputState = () => {
    if (searchInput == "") {
      setIsInput(true);
      setTimeout(() => {
        setIsInput(false);
      }, 1000);
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key == "Enter") {
      handleInputState();
      submitSearch();
    }
  };
  console.log(searchResults);
  return (
    <WrapperStyled>
      <SearchBarStyled $isInput={isInput} onKeyDown={handleKeyDown}>
        <input
          type="text"
          placeholder="검색어를 입력해주세요..."
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => submitSearch()}>
          <img src="/src/assets/search.png" />
        </button>
      </SearchBarStyled>
      <SearchItemWrapperStyled>
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((user: MemberSearchResponseDTO) => (
            <SearchItem
              key={user.memberId} // Add this key prop
              memberId={user.memberId}
              memberName={user.memberName}
              intraName={user.intraName}
              profileImageUrl={user.profileImageUrl}
              country={user.country}
              statement={user.statement}
              relationship={user.relationship}
            />
          ))
        ) : (
          <NoSearchMessageStyled>검색 결과가 없습니다 🙈</NoSearchMessageStyled>
        )}
      </SearchItemWrapperStyled>
    </WrapperStyled>
  );
};

const shakeAnimation = keyframes`
	0% { transform: translateX(0); }
	20% { transform: translateX(-3px); }
	40% { transform: translateX(3px); }
	60% { transform: translateX(-3px); }
	80% { transform: translateX(3px); }
	100% { transform: translateX(0); }
`;

const SearchBarStyled = styled.div`
  display: flex;
  padding: 2%;
  margin: 10px;
  margin-top: 20px;
  width: 85%;
  border-radius: 30px;
  background: var(--transparent);
  animation: ${({ $isInput }) => ($isInput ? shakeAnimation : "none")} 0.5s;
  // 검색 입력창
  input {
    display: flex;
    border: none;
    background: none;
    outline: none;
    padding-left: 10px;
    caret-color: var(--white);
    color: var(--white);
    width: 90%;
    font-size: 1.6rem;
    &::placeholder {
      color: var(--white);
    }
  }
  // 검색 버튼
  button {
    display: flex;
    border: none;
    background: transparent;
    cursor: pointer;
    width: 22px;
    height: 22px;
    img {
      position: absolute;
      width: 22px;
    }
  }
`;

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  overflow: hidden;
`;

const SearchItemWrapperStyled = styled.div`
  margin-top: 1%;
  width: 100%;
  overflow-y: auto;
`;

const NoSearchMessageStyled = styled.div`
  display: flex;
  justify-content: center;
  padding: 2%;
  font-size: 16px;
  color: var(--white);
  opacity: 0.7;
`;

const SearchResultsStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 10px;
`;
export default SearchSection;
