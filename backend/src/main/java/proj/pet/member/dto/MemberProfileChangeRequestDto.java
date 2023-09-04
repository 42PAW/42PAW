package proj.pet.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MemberProfileChangeRequestDto {

	private String memberName;
	private MultipartFile profileImage;
	private String statement;
	private boolean profileImageChanged;
}
