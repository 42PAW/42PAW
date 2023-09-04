import { useRecoilState } from "recoil";
import styled from "styled-components";
import PostListItem from "./PostListItem";
import { IBoardInfo } from "@/types/interface/board.interface";
import { userInfoState } from "@/recoil/atom";
import { UserInfoDTO } from "@/types/dto/member.dto";
import useNavigateCustom from "@/hooks/useNavigateCustom";
import { boardCategoryState } from "@/recoil/atom";
import { Board } from "@/types/enum/board.category.enum";

const PostList: React.FC<{ posts: IBoardInfo[] | null }> = ({ posts }) => {
  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState);
  const [boardCategory] = useRecoilState<Board>(boardCategoryState);
  const {
    moveToMyProfileBoards,
    moveToMyProfileScrapped,
    moveToProfileBoards,
  } = useNavigateCustom();

  const showBoardsInScroll = () => {
    if (boardCategory === Board.SCRAPPED) moveToMyProfileScrapped();
    else if (userInfo && userInfo.memberId === posts![0].memberId)
      moveToMyProfileBoards();
    else moveToProfileBoards(posts![0].memberId);
  };

  return (
    <WrapperStyled>
      {posts &&
        posts.map((post: IBoardInfo) => {
          return (
            <PostListItem
              key={post.boardId}
              post={post}
              showBoardsInScroll={showBoardsInScroll}
            />
          );
        })}
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: grid;
  max-height: calc(100% - 50px);
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  gap: 2px;
`;

export default PostList;
