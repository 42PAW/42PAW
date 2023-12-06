package proj.pet.member.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.category.domain.Species;

import java.util.List;

/**
 * 로그인 성공 이후에 첫 접속시 회원 정보를 생성하기 위한 Request DTO
 */
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberCreateRequestDto {
	@NotNull
	private String memberName;
	private String imageUrl;
	private String statement;
	@NotNull
	private List<Species> categoryFilters;
}
