package proj.pet.board.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.cloud.aws.config.AwsS3Properties;
import proj.pet.cloud.aws.domain.AwsS3Manager;
import proj.pet.exception.DomainException;
import proj.pet.exception.ExceptionStatus;

import java.net.MalformedURLException;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class BoardMediaManager {

	private final AwsS3Properties awsS3Properties;
	private final AwsS3Manager awsS3Manager;

	public String uploadMedia(MultipartFile mediaData) {
		String fileName = UUID.randomUUID().toString();
		return awsS3Manager.uploadFileToBucket(
				awsS3Properties.getBucketName(),
				awsS3Properties.getBoardImageDirectory(),
				mediaData,
				fileName);
	}

	public void deleteMediaByList(List<BoardMedia> mediaList) {
		mediaList.forEach(media -> {
					try {
						awsS3Manager.deleteFileByUrl(awsS3Properties.getBucketName(), media.getMediaUrl());
					} catch (MalformedURLException e) {
						throw new DomainException(ExceptionStatus.MALFORMED_URL);
					}
				}
		);
	}
}
