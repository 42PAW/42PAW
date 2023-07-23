export interface IBoardInfo {
  boardId: number;
  memberName: string;
  profileImage: string;
  images: IBoardImages[];
  categories: string[];
  reactionCount: number;
  commentCount: number;
  isScrapped: boolean;
  isReacted: boolean;
  content: string;
  previewComment: string;
  createdAt: string;
}

export interface IBoardImages {
  index: number;
  imageUrl: string;
}
