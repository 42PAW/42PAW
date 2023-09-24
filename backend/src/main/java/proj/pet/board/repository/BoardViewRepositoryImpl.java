package proj.pet.board.repository;

import static proj.pet.board.domain.QBoardMedia.boardMedia;
import static proj.pet.category.domain.QBoardCategoryFilter.boardCategoryFilter;
import static proj.pet.comment.domain.QComment.comment;
import static proj.pet.reaction.domain.QReaction.reaction;
import static proj.pet.scrap.domain.QScrap.scrap;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import proj.pet.board.domain.BoardMedia;
import proj.pet.board.dto.BoardReactionCountDto;
import proj.pet.board.dto.BoardViewSubDto;
import proj.pet.category.domain.BoardCategoryFilter;
import proj.pet.comment.domain.Comment;
import proj.pet.reaction.domain.Reaction;
import proj.pet.scrap.domain.Scrap;

@RequiredArgsConstructor
public class BoardViewRepositoryImpl implements BoardViewRepository {

	private final JPAQueryFactory queryFactory;

	@Override
	public BoardViewSubDto getBoardViewWithBoardIdList(Long loginUserId, List<Long> boardIdList) {
		List<BoardMedia> images = queryFactory
				.selectFrom(boardMedia)
				.where(boardMedia.board.id.in(boardIdList))
				.fetch();
		List<BoardReactionCountDto> reactionCounts = queryFactory
				.from(reaction)
				.select(Projections.constructor(BoardReactionCountDto.class,
						reaction.board.id, reaction.count()))
				.where(reaction.board.id.in(boardIdList))
				.groupBy(reaction.board.id)
				.fetch();
		List<Reaction> myReaction = queryFactory
				.selectFrom(reaction)
				.where(reaction.board.id.in(boardIdList).and(reaction.member.id.eq(loginUserId)))
				.fetch();
		List<Comment> comments = queryFactory
				.selectFrom(comment)
				.where(comment.board.id.in(boardIdList))
				.fetch();
		List<Scrap> myScrap = queryFactory
				.selectFrom(scrap)
				.where(scrap.board.id.in(boardIdList).and(scrap.member.id.eq(loginUserId)))
				.fetch();
		List<BoardCategoryFilter> boardCategoryFilters = queryFactory
				.selectFrom(boardCategoryFilter)
				.where(boardCategoryFilter.board.id.in(boardIdList))
				.fetch();
		return new BoardViewSubDto(
				images, reactionCounts, myReaction, comments, myScrap, boardCategoryFilters);
	}
}
