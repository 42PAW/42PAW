package proj.pet.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.category.domain.Species;

import java.util.List;

/**
 * 로그인 성공 이후에 첫 접속시 회원 정보를 생성하기 위한 Request DTO
 */
@Getter
@Builder
@AllArgsConstructor
public class MemberCreateRequestDto {

	private final String memberName;
	private final MultipartFile imageData;
	private final String statement;
	private final List<Species> categoryFilters;
}
