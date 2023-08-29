import styled from "styled-components";
import { IBoardInfo } from "@/types/interface/board.interface";

interface PostListItemProps {
  post: IBoardInfo;
  onClick: () => void;
}

const PostListItem: React.FC<PostListItemProps> = ({ post, onClick }) => {
  return <ThumbnailStyled onClick={onClick} src={post.images[0]} />;
};

const ThumbnailStyled = styled.img`
  pointer-events: auto;
  width: calc(33.3%);
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  // background-color: var(--purple);
  border-radius: 1%;
`;

export default PostListItem;
