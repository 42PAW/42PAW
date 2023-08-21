import styled from "styled-components";
import PostListItem from "./PostListItem";
import { IBoardInfo } from "@/types/interface/board.interface";

const PostList = (props: any) => {
  const { posts, onClickItem } = props;

  return (
    <>
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
    </>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: calc(100% - 50px);
  //   img {
  //     width: calc(33.3%);
  //     border-radius: 1%;
  //   }
  //   border: 1px;
  // &::before {
  //   content: ""; /* 가상 요소 내용 없음 */
  //   position: absolute; /* 절대 위치 설정 */
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  // }
`;

export default PostList;
