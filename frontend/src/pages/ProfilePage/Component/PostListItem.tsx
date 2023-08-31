import styled from "styled-components";
import { IBoardInfo } from "@/types/interface/board.interface";
import { currentProfileBoardIdState } from "@/recoil/atom";
import { useSetRecoilState } from "recoil";

interface PostListItemProps {
  post: IBoardInfo;
  showBoardsInScroll: () => void;
}

const PostListItem: React.FC<PostListItemProps> = ({
  post,
  showBoardsInScroll,
}) => {
  const setCurrentProfileBoardId = useSetRecoilState(
    currentProfileBoardIdState
  );

  const moveToProfileBoards = () => {
    setCurrentProfileBoardId(post.boardId);
    showBoardsInScroll();
  };

  return (
    <WrapperStyled>
      <ThumbnailStyled src={post.images[0]} />
      <ThumbnailInfoStyled onClick={moveToProfileBoards}>
        <div>
          <img src="/assets/thumbnailLike.png" />
          <div>{post.reactionCount}</div>
        </div>
        <div>
          <img src="/assets/thumbnailComment.png" />
          <div>{post.commentCount}</div>
        </div>
      </ThumbnailInfoStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  position: relative;
`;

const ThumbnailStyled = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 1%;
`;

const ThumbnailInfoStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  color: white;
  opacity: 0;
  transition: all 0.3s ease;
  &:hover {
    background-color: #00000074;
    opacity: 1;
  }
  div {
    cursor: pointer;
    display: flex;
    align-items: center;
    div {
      margin-left: 8px;
    }
    img {
      width: 20px;
    }
  }
`;

export default PostListItem;
