import { IBoardInfo } from "@/types/interface/board.interface";
import { AnimalSpecies } from "@/types/enum/animal.filter.enum";

/**
 * @result 불러올 각 Board에 대한 정보를 담고 있는 배열
 * @totalLength Boards의 전체 개수
 */
export interface BoardsInfoDTO {
  result: IBoardInfo[];
  totalLength: number;
}

/**
 * @commentId 댓글의 id
 * @memberId 댓글 작성 유저 id
 * @memberName 댓글 작성 유저 닉네임
 * @comment 댓글 내용
 * @profileImage 댓글 작성 유저 프로필 이미지
 * @createdAt 댓글 작성 날짜
 */
export interface CommentInfoDTO {
  commentId: number;
  memberId: number;
  memberName: string;
  comment: string;
  profileImage: string;
  createdAt: string;
}

export interface CreateBoardDTO {
  mediaDataList: Blob[];
  categoryList: AnimalSpecies[];
  content: string;
}
