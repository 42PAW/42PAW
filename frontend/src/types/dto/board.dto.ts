export interface CommentInfoDTO {
  commentId: number;
  memberId: number;
  memberName: string;
  comment: string;
  statement: string | null;
  profileImage: string;
  createdAt: string;
}
