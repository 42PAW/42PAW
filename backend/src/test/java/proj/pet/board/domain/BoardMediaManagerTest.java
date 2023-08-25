package proj.pet.board.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.cloud.aws.config.AwsS3Properties;
import proj.pet.cloud.aws.domain.AwsS3ManagerImpl;
import proj.pet.testutil.test.UnitTest;

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.mock;


class BoardMediaManagerTest extends UnitTest {

	@Mock
	private AwsS3ManagerImpl awsS3ManagerImpl;

	@Mock(strictness = Mock.Strictness.LENIENT)
	private AwsS3Properties awsS3Properties;

	@InjectMocks
	private BoardMediaManager boardMediaManager;

	@BeforeEach
	void setUp() {
		given(awsS3Properties.getBucketName()).willReturn("bucket-name");
		given(awsS3Properties.getBoardImageDirectory()).willReturn("board-image-directory");
	}

	@Test
	@DisplayName("MultipartFile을 받아서 S3에 업로드하고, 업로드된 이미지의 URL을 반환한다.")
	void uploadMedia() {
		// given
		String fileName = "fileName";
		MultipartFile mediaData = mock(MultipartFile.class);

		// when
		boardMediaManager.uploadMedia(mediaData, fileName);

		// then
		then(awsS3ManagerImpl).should().uploadFileToBucket("bucket-name", "board-image-directory", mediaData, fileName);
	}

	@Test
	@DisplayName("BoardMedia의 목록을 받아서 S3에서 삭제할 수 있다.")
	void deleteMediaByList() {
		// given
		BoardMedia boardMedia = mock(BoardMedia.class);

		// when
		boardMediaManager.deleteMediaByList(List.of(boardMedia));

		// then
		then(awsS3ManagerImpl).should().deleteFileByUrl("bucket-name", boardMedia.getMediaUrl());
	}
}