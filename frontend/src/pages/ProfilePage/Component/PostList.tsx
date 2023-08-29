import styled from "styled-components";
import PostListItem from "./PostListItem";
import { IBoardInfo } from "@/types/interface/board.interface";

const PostList = (props: any) => {
  const { posts, onClickItem } = props;
  return (
    <WrapperStyled>
      {posts.map((post: IBoardInfo) => {
        return (
          <PostListItem
            key={post.boardId}
            post={post}
            onClick={() => {
              onClickItem();
            }}
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
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
  gap: 2px;
`;

export default PostList;
