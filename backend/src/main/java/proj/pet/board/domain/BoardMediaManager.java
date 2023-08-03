package proj.pet.board.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.cloud.aws.domain.AwsS3Manager;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class BoardMediaManager {

	@Value("${cloud.aws.s3.board-media-bucket}")
	private static String MEDIA_DIRECTORY;
	private final AwsS3Manager awsS3Manager;

	public String uploadMedia(MultipartFile mediaData) {
		String fileName = UUID.randomUUID().toString();
		return awsS3Manager.uploadFileToBucket(MEDIA_DIRECTORY, mediaData, fileName);
	}
}
