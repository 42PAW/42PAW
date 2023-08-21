package proj.pet.board.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import proj.pet.cloud.aws.config.AwsS3Properties;
import proj.pet.cloud.aws.domain.AwsS3Manager;

import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class BoardMediaManagerTest {

	@Mock
	private AwsS3Manager awsS3Manager;

	@Mock
	private AwsS3Properties awsS3Properties;

	@BeforeEach
	void setUp() {
		given(awsS3Properties.getBucketName()).willReturn("bucket-name");
		given(awsS3Properties.getBoardImageDirectory()).willReturn("board-image-directory");
	}

	@Test
	@DisplayName("MultipartFile을 받아서 S3에 업로드하고, 업로드된 이미지의 URL을 반환한다.")
	void uploadMedia() {

	}

	@Test
	@DisplayName("")
	void deleteMediaByList() {
	}
}