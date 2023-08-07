package proj.pet.cloud.aws.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.cloud.aws.config.AwsS3Properties;
import proj.pet.cloud.aws.domain.AwsS3Manager;
import proj.pet.dto.ImageUploadRequest;

import java.net.MalformedURLException;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/s3")
@RequiredArgsConstructor
public class S3TestController {

	/**
	 * TODO: 이미지 사이즈 외부변수화 및 다른 계층에서 관리
	 */
	private static final long IMAGE_BYTE_SIZE_LIMIT = 1024L * 1024L * 100L;
	private final AwsS3Properties s3Properties;
	private final AwsS3Manager awsS3Manager;

	@PostMapping(value = "/upload",
			consumes = MediaType.MULTIPART_FORM_DATA_VALUE
	)
	public void uploadImageFile(@Valid ImageUploadRequest dto) {
		/**
		 * 이 부분은 Facade가 진행할 부분입니다.
		 */
		MultipartFile profileImageData = dto.getProfileImageData();
		if (profileImageData.getSize() >= IMAGE_BYTE_SIZE_LIMIT) {
			throw new RuntimeException("이미지 사이즈가 너무 큽니다."); // TODO: Custom Exception
		}
		String bucketName = s3Properties.getBucketName();
		String directory = s3Properties.getProfileImageDirectory();
		String s = awsS3Manager.uploadFileToBucket(bucketName, directory, profileImageData, affixUuid(dto.getNickname()));
	}

	@PostMapping
	public void deleteImageFile(
			@RequestBody Map<String, String> body) throws MalformedURLException {
		/**
		 * 이 부분은 Facade가 진행할 부분입니다.
		 */
		String bucketName = s3Properties.getBucketName();
		awsS3Manager.deleteFileByUrl(bucketName, body.get("fileUrl"));
	}

	// 비즈니스 로직
	private String affixUuid(String originalFilename) {
		return UUID.randomUUID().toString().concat(originalFilename);
	}
}
