import { styled, keyframes } from "styled-components";
import { useEffect, useState } from "react";
import {
  MemberSearchResponseDTO,
  UserInfoDTO,
} from "@/types/dto/member.dto.ts";
import SearchItem from "@/components/RightSection/SearchSection/SearchItem";
import { axiosGetSearchResults } from "@/api/axios/axios.custom";
import useDebounce from "@/hooks/useDebounce";
import useToaster from "@/hooks/useToaster";
import LoadingDotsAnimation from "@/components/loading/LoadingDotsAnimation";
import { userInfoState, languageState } from "@/recoil/atom";
import { useRecoilState } from "recoil";

const SearchSection = () => {
  const [language] = useRecoilState<any>(languageState);
  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState);
  const [isInput, setIsInput] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const { debounce } = useDebounce();
  const { popToast } = useToaster();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const myInput = document.getElementById("search-input") as HTMLInputElement;

    const inputChangeHandler = () => {
      setSearchInput(myInput.value);
      updateSearchResult();
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
    if (searchInput !== "") setIsLoading(true);
    debounce("search", updateSearchResult, 500);
  }, [searchInput]);

  const updateSearchResult = async () => {
    if (searchInput == "") {
      setIsLoading(false);
      setSearchResults([]);
      return;
    }
    const result = await axiosGetSearchResults(searchInput, 100, 0);
    setSearchResults(result);
    setIsLoading(false);
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.currentTarget.value);
  };

  const handleInputState = () => {
    if (isInput) return;
    if (searchInput == "") {
      const demandSearchInputMsg = language.demandSearchInput;
      popToast(demandSearchInputMsg, "N");
      setIsInput(true);
      debounce("noSearchInput", () => setIsInput(false), 1000);
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
          placeholder={language.enterUsername}
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => updateSearchResult()}>
          <img src="/assets/search.svg" />
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
              updateFollowType={updateSearchResult}
              isMine={userInfo?.memberId === user.memberId}
            />
          ))
        ) : (
          <NoSearchMessageStyled>
            {isLoading ? (
              <div style={{ marginTop: "20px" }}>
                <LoadingDotsAnimation />
              </div>
            ) : searchInput === "" ? (
              <div>{language.enterIntranameOrNickname}</div>
            ) : (
              <div>{language.noSearchResults}</div>
            )}
          </NoSearchMessageStyled>
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

const SearchBarStyled = styled.div<{ $isInput: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 85%;
  border-radius: 30px;
  background: var(--transparent);
  animation: ${({ $isInput }) => ($isInput ? shakeAnimation : "none")} 0.5s;
  input {
    width: 90%;
    display: flex;
    border: none;
    background: none;
    outline: none;
    padding-left: 10px;
    caret-color: var(--white);
    color: var(--white);

    font-size: 1.3rem;
    &::placeholder {
      color: var(--transparent2);
    }
  }
  // 검색 버튼
  button {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
    padding-right: 5px;
    img {
      width: 15px;
      height: 15px;
    }
  }
`;

const SearchItemWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const NoSearchMessageStyled = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 1.3rem;
  color: var(--white);
  opacity: 0.7;
`;

export default SearchSection;
