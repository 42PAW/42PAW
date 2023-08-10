import styled from "styled-components";
import React, { useState } from  "react";

interface SearchBarProps {
	onSearch: (query: string) => void;
  }

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [searchInput, setSearchInput] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	  setSearchInput(event.target.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key == "Enter")
			submitSearch();
	};

	const submitSearch = () => {
	  onSearch(searchInput);
	};

  return (
	<SearchContainerStyled>
		<SearchInputStyled
			type = "text"
			placeholder = "검색어를 입력해주세요..."
			value = {searchInput}
			onChange = {handleInputChange}
			onKeyDown = {handleKeyDown}
		/>
		<SearchButtonStyled
			onClick = {submitSearch}
		>
			<img src="/src/assets/search.png" />
		</SearchButtonStyled>
	</SearchContainerStyled>
  );
};

const SearchContainerStyled = styled.div`
	display: flex;
	justify-content: flex-start;
	padding: 1%;
	margin-right: 15%;
	width: 70%;
	height: 50%;
	border-radius: 30px;
	background: var(--transparent);
`;

const SearchInputStyled = styled.input`
	display: flex;
	border: none;
	background: none;
	outline: none;
	width: 90%;
	font-size: 1.6rem;
	&::placeholder {
		color: var(--white);
	  }
`;

const SearchButtonStyled = styled.button`
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
`;

export default SearchBar;