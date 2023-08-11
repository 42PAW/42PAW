/**
 * @boardId 게시물의 id
 * @memberName 게시물 작성 유저 id
 * @profileImage 게시물 작성 유저의 프로필 이미지
 * @images 게시물 사진들을 담고 있는 배열
 * @categories 동물 필터 카테고리
 * @reactionCount 좋아요 수
 * @commentCount 댓글 수
 * @isScrapped 스크랩한 게시물인지에 대한 boolean
 * @isReacted 좋아요를 누른 게시물인지에 대한 boolean
 * @content 게시물 글(caption) 내용
 * @previewCommentUser 프리뷰 댓글 유저 id
 * @previewComment 프리뷰 댓글 내용
 * @createdAt 게시물 작성 날짜
 */
export interface IBoardInfo {
  boardId: number;
  memberId: number;
  memberName: string;
  intraName: string;
  profileImageURL: string;
  country: string;
  images: string[];
  categories: string[];
  reactionCount: number;
  commentCount: number;
  isScrapped: boolean;
  isReacted: boolean;
  content: string;
  previewCommentUser: string;
  previewComment: string;
  createdAt: string;
}
