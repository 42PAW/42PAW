// import { useState } from "react";
import styled from "styled-components";
import React, { useState } from  "react";
import test from "./test.json";
import SearchBar from "./SearchBar.tsx";
import SearchItem from "./SearchItem.tsx";

interface UserData {
	memberId: number;
	memberName: string;
	intraName: string;
	statement : string;
	country: string;
	relationship: string;
	profileImageUrl: string;
  }

interface SearchResultsProps {
	results: string[];
}

const SearchSection: React.FC<SearchResultsProps> = ({ results }) => {
	const [searchResults, setSearchResults] = useState<UserData[]>([]);

	const handleSearch = (searchQuery: string) => {
		const filteredResults = test.filter((user: UserData) => {
		  const memberNameMatch = user.memberName.includes(searchQuery.toLowerCase());
		  const intraNameMatch = user.intraName.includes(searchQuery.toLowerCase());
		  return memberNameMatch || intraNameMatch;
		});
		setSearchResults(filteredResults);
	  };

  	return (
		<WrapperStyled>
			<SearchBar onSearch={handleSearch} />
			<SearchItemWrapperStyled>
			{searchResults.length === 0 ? (
			<NoSearchMessageStyled>검색 결과가 없습니다 🙈</NoSearchMessageStyled>
			) : (
				<SearchResultsStyled>
					{ searchResults.map((user: UserData) => (
						<SearchItem user={user} />
					)) }
				</SearchResultsStyled>
			)}
			</SearchItemWrapperStyled>
		</WrapperStyled>
  	);
};

const WrapperStyled = styled.div`
	display: flex;
	flex-direction:column;
	justify-content: space-between;
	height: 100%;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
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