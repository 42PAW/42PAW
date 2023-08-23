import { styled, keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { searchInputState } from "@/recoil/atom";
import { MemberSearchResponseDTO } from "@/types/dto/member.dto.ts";
import SearchItem from "@/components/RightSection/SearchSection/SearchItem";
import { axiosGetSearchResults } from "@/api/axios/axios.custom";
import useDebounce from "@/hooks/useDebounce";

const SearchSection = () => {
  const [isInput, setIsInput] = useState(false);
  const [searchInput, setSearchInput] =
    useRecoilState<string>(searchInputState);
  const { debounce } = useDebounce();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const myInput = document.getElementById("search-input") as HTMLInputElement;

    const inputChangeHandler = () => {
      setSearchInput(myInput.value);
      submitSearch();
    };

    if (myInput) {
      myInput.addEventListener("input", inputChangeHandler);
    }

    return () => {
      if (myInput) {
        myInput.removeEventListener("input", inputChangeHandler);
      }
    };
  }, []);

  useEffect(() => {
    debounce("search", submitSearch, 500);
  }, [searchInput]);

  const submitSearch = async () => {
    if (searchInput == "") {
      setSearchResults([]);
      return;
    }
    const result = await axiosGetSearchResults(searchInput, 100, 0);
    setSearchResults(result);
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.currentTarget.value);
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
      setSearchInput(searchInput);
    }
  };

  return (
    <WrapperStyled>
      <SearchBarStyled $isInput={isInput}>
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
              key={user.memberId}
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

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  overflow: hidden;
`;

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
  justify-content: space-between;
  padding: 13px;
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
    font-size: 1.6rem;
    &::placeholder {
      color: var(--white);
    }
  }
  // 검색 버튼
  button {
    display: flex;
    justify-content: flex-end;
    border: none;
    background: transparent;
    cursor: pointer;
    width: 22px;
    height: 22px;
    img {
      width: 22px;
      height: 22px;
    }
  }
`;

const SearchItemWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  overflow-y: auto;
`;

const NoSearchMessageStyled = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 16px;
  color: var(--white);
  opacity: 0.7;
`;

export default SearchSection;
