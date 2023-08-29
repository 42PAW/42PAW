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
  cursor: pointer;
  pointer-events: auto;
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  border-radius: 1%;
  transition: all 0.3s ease;
  &:hover {
    filter: brightness(0.8);
  }
`;

export default PostListItem;
