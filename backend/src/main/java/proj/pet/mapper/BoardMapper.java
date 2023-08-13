package proj.pet.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;
import proj.pet.board.domain.Board;
import proj.pet.board.dto.BoardInfoDto;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.category.domain.Species;
import proj.pet.member.domain.Member;

import java.util.List;

import static org.mapstruct.factory.Mappers.getMapper;

@Mapper(componentModel = "spring")
@Component
public interface BoardMapper {

	final static String TO_BOARD_INFO_DTO = "toBoardInfoDto";
	BoardMapper INSTANCE = getMapper(BoardMapper.class);

	@Named(TO_BOARD_INFO_DTO)
	@Mapping(target = "boardId", source = "board.id")
	@Mapping(target = "memberId", source = "member.id")
	@Mapping(target = "memberName", source = "member.nickname")
	@Mapping(target = "intraName", source = "member.oauthProfile.name")
	@Mapping(target = "createdAt", source = "board.createdAt")
	BoardInfoDto toBoardInfoDto(
			Board board, Member member,
			List<String> images, List<Species> categories,
			boolean isScrapped, boolean isReacted,
			int reactionCount, int commentCount,
			String previewCommentUser, String previewComment);

	BoardsResponseDto toBoardsResponseDto(List<BoardInfoDto> result, int totalLength);
}
