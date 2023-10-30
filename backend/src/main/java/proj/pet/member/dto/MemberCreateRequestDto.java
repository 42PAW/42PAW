package proj.pet.member.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import proj.pet.category.domain.Species;

import java.util.List;

/**
 * 로그인 성공 이후에 첫 접속시 회원 정보를 생성하기 위한 Request DTO
 */
@Getter
@Builder
@AllArgsConstructor
public class MemberCreateRequestDto {
	@NotNull
	private final String memberName;
	private final String imageUrl;
	private final String statement;
	@NotNull
	private final List<Species> categoryFilters;
}
