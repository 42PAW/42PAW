package proj.pet.cloud.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.cloud.service.AwsS3Service;

import java.util.UUID;

@RestController
@RequestMapping("/s3")
@RequiredArgsConstructor
public class S3TestController {

	/**
	 * TODO: 이미지 사이즈 외부변수화 및 다른 계층에서 관리
	 */
	private static final long IMAGE_BYTE_SIZE_LIMIT = 1024L * 1024L * 100L;
	private final AwsS3Service awsS3Service;

	@PostMapping(
			consumes = MediaType.MULTIPART_FORM_DATA_VALUE
	)
	public void uploadImageFile(@Valid ImageUploadDto dto) {
		/**
		 * 이 부분은 Facade가 진행할 부분입니다.
		 */
		System.out.println("dto.getNickname() = " + dto.getNickname());
		MultipartFile profileImageData = dto.getProfileImageData();
		if (profileImageData.getSize() >= IMAGE_BYTE_SIZE_LIMIT) {
			throw new RuntimeException("이미지 사이즈가 너무 큽니다."); // TODO: Custom Exception
		}
		System.out.println("적합한 용량입니다!");
		awsS3Service.uploadImageToBucket(profileImageData, affixUuid(dto.getNickname()));
	}

	private String affixUuid(String originalFilename) {
		return UUID.randomUUID().toString().concat(originalFilename);
	}
}
