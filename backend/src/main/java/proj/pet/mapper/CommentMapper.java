package proj.pet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;
import proj.pet.comment.domain.Comment;
import proj.pet.comment.dto.CommentDto;
import proj.pet.comment.dto.CommentResponseDto;
import proj.pet.member.domain.Member;

import java.util.List;

import static org.mapstruct.factory.Mappers.getMapper;

@Mapper(componentModel = "spring")
@Component
public interface CommentMapper {
	CommentMapper INSTANCE = getMapper(CommentMapper.class);

	@Mapping(target = "commentId", source = "comment.id")
	@Mapping(target = "memberId", source = "member.id")
	@Mapping(target = "memberName", source = "member.nickname")
	@Mapping(target = "comment", source = "comment.content")
	@Mapping(target = "createdAt", source = "comment.createdAt")
	@Mapping(target = "country", source = "member.country")
	CommentDto toCommentDto(Comment comment, Member member);

	CommentResponseDto toCommentResponseDto(List<CommentDto> result, int totalLength);
}
