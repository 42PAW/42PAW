package proj.pet.board.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.cloud.aws.config.AwsS3Properties;
import proj.pet.cloud.aws.domain.AwsS3ManagerImpl;

import java.util.List;

/**
 * 게시글의 이미지를 관리하는 클래스
 */
@Component
@RequiredArgsConstructor
public class BoardMediaManager {

	private final AwsS3Properties awsS3Properties;
	private final AwsS3ManagerImpl awsS3ManagerImpl;

	/**
	 * 이미지를 업로드하고, 업로드된 이미지의 URL을 반환한다.
	 *
	 * @param mediaData 이미지 데이터
	 * @param fileName
	 * @return 업로드된 이미지의 URL
	 */
	public String uploadMedia(MultipartFile mediaData, String fileName) {
		return awsS3ManagerImpl.uploadFileToBucket(
				awsS3Properties.getBucketName(),
				awsS3Properties.getBoardImageDirectory(),
				mediaData,
				fileName);
	}

	/**
	 * 이미지를 삭제한다.
	 *
	 * @param mediaList 삭제할 이미지의 목록
	 */
	public void deleteMediaByList(List<BoardMedia> mediaList) {
		mediaList.forEach(media -> {
					awsS3ManagerImpl.deleteFileByUrl(awsS3Properties.getBucketName(), media.getMediaUrl());
				}
		);
	}
}
