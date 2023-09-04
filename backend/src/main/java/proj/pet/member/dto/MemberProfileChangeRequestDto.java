package proj.pet.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberProfileChangeRequestDto {

	private String memberName;
	private MultipartFile profileImage;
	private String statement;
	private boolean profileImageChanged;
}
