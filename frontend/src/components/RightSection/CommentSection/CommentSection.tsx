import { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import CommentItem from "@/components/RightSection/CommentSection/CommentItem";
import { currentBoardIdState } from "@/recoil/atom";
import {
  axiosCreateComment,
  axiosGetSearchResults,
} from "@/api/axios/axios.custom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Board } from "@/types/enum/board.category.enum";
import { IBoardInfo } from "@/types/interface/board.interface";
import useFetch from "@/hooks/useFetch";
import LoadingCircleAnimation from "@/components/loading/LoadingCircleAnimation";
import { CommentInfoDTO } from "@/types/dto/board.dto";
import { languageState } from "@/recoil/atom";
import useDebounce from "@/hooks/useDebounce";
import { MemberSearchResponseDTO } from "@/types/dto/member.dto";
import { useCountryEmoji } from "@/hooks/useCountryEmoji";

const isOnlyWhitespace = (str: string) => {
  return str.trim() === "";
};

const CommentSection = () => {
  const commentRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const [language] = useRecoilState<any>(languageState);
  const [loading, setLoading] = useState(true);
  const [tagLoading, setTagLoading] = useState(true);
  const { debounce } = useDebounce();
  const { fetchComments } = useFetch();
  const [currentBoardId] = useRecoilState<number | null>(currentBoardIdState);
  const [comment, setComment] = useState<string>("");
  const queryClient = useQueryClient();
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", currentBoardId],
    queryFn: fetchComments,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  const [tagSearchInput, setTagSearchInput] = useState<string>("");
  const [tagSearchResults, setTagSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    setLoading(true);
    debounce("commentsLoading", () => setLoading(false), 400);
  }, [currentBoardId]);

  useEffect(() => {
    setTagLoading(true);
    if (tagSearchInput !== "") debounce("search", updateTagSearchResult, 400);
  }, [tagSearchInput]);

  useEffect(() => {
    window.addEventListener("resize", getDropdownPosition);
  }, []);

  useEffect(() => {
    if (showDropdown) {
      getDropdownPosition();
    }
  }, [showDropdown, comment]);

  useEffect(() => {
    const searchDropdown = document.getElementById("search-result");
    if (searchDropdown) {
      searchDropdown.scrollTop = searchDropdown.scrollHeight;
    }
  }, [showDropdown, tagSearchResults]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElement = document.getElementById("search-result");
      if (
        showDropdown &&
        dropdownElement &&
        !dropdownElement.contains(event.target as Node) &&
        commentRef.current &&
        !commentRef.current.contains(event.target as Node)
      ) {
        setTagSearchInput("");
        setTagSearchResults([]);
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, commentRef]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setTagSearchInput("");
        setTagSearchResults([]);
        setShowDropdown(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getDropdownPosition = () => {
    let top = commentRef.current?.offsetTop || 0;
    top -= 180;
    let left = commentRef.current?.offsetLeft || 0;
    if (commentRef.current && mirrorRef.current) {
      const mirrorDiv = mirrorRef.current;
      mirrorDiv.textContent = commentRef.current.value.substring(
        0,
        commentRef.current.value.lastIndexOf("@") + tagSearchInput.length + 1
      );
      const characterWidth = 6;
      left += mirrorDiv.textContent.length * characterWidth;
    }
    setDropdownPosition({ top, left });
  };

  const updateTagSearchResult = async () => {
    if (tagSearchInput === "") {
      setTagSearchResults([]);
      setTagLoading(false);
      return;
    }
    const result = await axiosGetSearchResults(tagSearchInput, 100, 0);
    setTagSearchResults(result.reverse());
    setTagLoading(false);
  };

  const handleOnchange = (e: any) => {
    const value = e.target.value;
    setComment(value);
    const lastWord = value.split(/[\s\n]+/).pop();
    if (lastWord.startsWith("@")) {
      const searchInput = lastWord.slice(1);
      setTagSearchInput(searchInput);
      setShowDropdown(true);
    } else {
      setTagSearchInput("");
      setTagSearchResults([]);
      setShowDropdown(false);
    }
  };

  const selectUsertoTag = (userName: string) => {
    const lastTag = comment.lastIndexOf("@" + tagSearchInput);
    const newComment = comment.slice(0, lastTag) + "@" + userName + " ";
    setComment(newComment);
    setTagSearchInput("");
    setTagSearchResults([]);
    setShowDropdown(false);
  };

  const uploadComment = async () => {
    if (comment === "" || isOnlyWhitespace(comment)) {
      setComment("");
      return;
    }
    try {
      await axiosCreateComment(currentBoardId, comment);
    } catch (error) {
      setComment("");
    }
    setTagSearchInput("");
    setTagSearchResults([]);
  };

  const commentMutation = useMutation(uploadComment, {
    onSuccess: async () => {
      if (comment === "" || isOnlyWhitespace(comment)) return;

      await queryClient.invalidateQueries(["comments", currentBoardId]);
      const newComments: CommentInfoDTO[] | undefined =
        await queryClient.getQueryData(["comments", currentBoardId]);

      const mainBoardCategories = [
        Board.DEFAULT,
        Board.TRENDING,
        Board.FOLLOWING,
        Board.MINE,
        Board.OTHER,
      ];

      for (let i = 0; i < mainBoardCategories.length; i++) {
        await queryClient.setQueryData(
          ["boards", mainBoardCategories[i]],
          (prevData: IBoardInfo[] | any) => {
            if (!prevData) return prevData;
            if (!newComments) return prevData;

            const updatedBoards = prevData.pages.map((page: IBoardInfo[]) =>
              page.map((board: IBoardInfo) => {
                if (board.boardId === currentBoardId && newComments) {
                  return {
                    ...board,
                    previewCommentUser:
                      newComments[newComments.length - 1].memberName,
                    previewComment: newComments[newComments.length - 1].comment,
                    commentCount: newComments.length,
                  };
                }
                return board;
              })
            );

            return { ...prevData, pages: updatedBoards };
          }
        );
      }

      setComment("");
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!event.nativeEvent.isComposing) {
        event.preventDefault();
        commentMutation.mutate();
      }
    }
  };
  if (loading || isLoading) {
    return (
      <WrapperStyled>
        <LoadingCircleAnimation />
      </WrapperStyled>
    );
  }

  return (
    <WrapperStyled>
      <CommentItemWrapperStyled>
        {comments.length > 0 ? (
          comments.map((comment: CommentInfoDTO) => (
            <CommentItem
              key={comment.commentId}
              commentId={comment.commentId}
              memberId={comment.memberId}
              memberName={comment.memberName}
              country={comment.country}
              comment={comment.comment}
              profileImageUrl={comment.profileImageUrl}
              createdAt={comment.createdAt}
              followType={comment.followType}
            />
          ))
        ) : (
          <NoCommentMessageStyled>
            {language.demandFirstComment}
          </NoCommentMessageStyled>
        )}
      </CommentItemWrapperStyled>
      <MirrorInputContainerStyled>
        <MirrorInputStyled ref={mirrorRef} />
      </MirrorInputContainerStyled>
      <CommentInputContainerStyled>
        <input
          id="expanding-input"
          ref={commentRef}
          value={comment}
          placeholder={language.enterComment}
          maxLength={50}
          onChange={handleOnchange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => commentMutation.mutate()}>
          {language.posting}
        </button>
        {showDropdown && tagLoading ? (
          <DropdownStyled
            id="search-result"
            top={dropdownPosition.top}
            left={dropdownPosition.left}
          >
            <LoadingCircleAnimation />
          </DropdownStyled>
        ) : (
          showDropdown &&
          tagSearchResults.length > 0 && (
            <DropdownStyled
              id="search-result"
              top={dropdownPosition.top}
              left={dropdownPosition.left}
            >
              {tagSearchResults.map((user: MemberSearchResponseDTO) => (
                <DropdownItemStyled
                  key={user.memberId}
                  onClick={() => selectUsertoTag(user.memberName)}
                >
                  <UserImageContainerStyled>
                    <img src={user.profileImageUrl || "/assets/userW.png"} />
                  </UserImageContainerStyled>
                  <SearchItemRightStyled>
                    <NameContainerStyled>
                      <MemberNameStyled>
                        {user.memberName} {useCountryEmoji(user.country)}
                      </MemberNameStyled>
                      <IntraNameStyled>{user.intraName}</IntraNameStyled>
                    </NameContainerStyled>
                  </SearchItemRightStyled>
                </DropdownItemStyled>
              ))}
            </DropdownStyled>
          )
        )}
      </CommentInputContainerStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  flex: 1;
  width: 100%;
`;

const CommentItemWrapperStyled = styled.div`
  padding-top: 5px;
  width: 100%;
  height: calc(100% - 40px);
  overflow-y: scroll;
  overflow-x: hidden;
`;

const NoCommentMessageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 40px);
  text-align: center;
  font-size: 2rem;
  color: var(--white);
  opacity: 0.7;
`;

const CommentInputContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 40px;
  @media screen and (display-mode: standalone) {
    margin-bottom: 40px;
  }
  font-size: 1.3rem;
  border-top: 1px solid var(--transparent);
  padding-top: 2%;
  padding-bottom: 2%;
  input {
    height: 50%;
    width: 68%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid var(--white);
    background-color: transparent;
    color: var(--white);
    outline: none;
    font-size: 13px;
    margin-top: 3px;
  }
  input::placeholder {
    font-size: 13px;
    color: var(--transparent);
  }
  button {
    font-size: 13px;
    cursor: pointer;
    height: 29px;
    width: 76px;
    border-radius: 5px;
    border: 1px solid var(--white);
    background-color: transparent;
    color: var(--white);
    transition: all 0.3s ease;
    &:hover {
      background-color: var(--white);
      color: var(--pink);
    }
  }
`;

const MirrorInputContainerStyled = styled.div`
  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 40px;
  @media screen and (display-mode: standalone) {
    margin-bottom: 40px;
  }
  font-size: 1.3rem;
  border-top: 1px solid var(--transparent);
  padding-top: 2%;
  padding-bottom: 2%;
  input {
    height: 50%;
    width: 68%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid var(--white);
    background-color: transparent;
    color: var(--white);
    outline: none;
    font-size: 13px;
    margin-top: 3px;
  }
  input::placeholder {
    font-size: 13px;
    color: var(--transparent);
  }
  button {
    font-size: 13px;
    cursor: pointer;
    height: 29px;
    width: 76px;
    border-radius: 5px;
    border: 1px solid var(--white);
    background-color: transparent;
    color: var(--white);
    transition: all 0.3s ease;
    &:hover {
      background-color: var(--white);
      color: var(--pink);
    }
  }
`;

const MirrorInputStyled = styled.div`
  visibility: hidden;
  height: 50%;
  width: 68%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid var(--white);
  background-color: transparent;
  color: var(--white);
  outline: none;
  font-size: 13px;
  margin-top: 3px;
  /* white-space: pre-wrap;
  position: absolute;
  height: auto;
  top: 0;
  left: 0;
  pointer-events: none;
  font-size: 13px;
  height: 50%;
  width: 68%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid var(--white);
  outline: none;
  margin-top: 3px;
  @media (max-width: 1023px) {
    width: 0%;
  } */
`;

const DropdownStyled = styled.div<{
  top: number;
  left: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 50%; */
  height: 160px;
  background-color: var(--lightpurple);
  border-radius: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 1;
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const DropdownItemStyled = styled.div`
  height: 55px;
  min-height: 52px;
  display: flex;
  align-items: center;
  width: 90%;
  margin: 5px 0px 5px 0px;
  padding: 5px 0 5px 0;
  border-radius: 15px;
  background: var(--transparent);
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const UserImageContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 11px;
  img {
    cursor: pointer;
    width: 34px;
    height: 34px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 100%;
    border: 1px solid var(--transparent);
  }
`;

const SearchItemRightStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
`;

const NameContainerStyled = styled.div`
  /* display: flex; */
  width: 60%;
  font-weight: 500;
  padding-left: 2px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MemberNameStyled = styled.div`
  cursor: pointer;
  font-size: 1.3rem;
  color: var(--white);
`;

const IntraNameStyled = styled.div`
  cursor: pointer;
  font-size: 1rem;
  color: var(--transparent2);
  transition: all 0.3s ease;
  &:hover {
    color: var(--white);
  }
`;

export default CommentSection;
