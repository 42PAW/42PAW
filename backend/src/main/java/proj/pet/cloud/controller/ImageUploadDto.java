package proj.pet.cloud.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.member.validation.NicknameValidation;

@AllArgsConstructor
@Getter
public class ImageUploadDto {

	@NicknameValidation
	private final String nickname;
	private final MultipartFile profileImageData;
}
