export interface IRightSectionContentInfo {
  search: boolean;
  comment: boolean;
  follower: boolean;
  following: boolean;
  animalFilter: boolean;
}

export interface ICommentInfo {
  commentId: number;
  memberId: number;
  memberName: string;
  comment: string;
  statement: string | null;
  profileImage: string;
  createdAt: string;
}
