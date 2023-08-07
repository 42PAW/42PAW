package proj.pet.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor
public class MemberProfileChangeRequestDto {

	private final String memberName;
	private final MultipartFile profileImage;
	private final String statement;
}
