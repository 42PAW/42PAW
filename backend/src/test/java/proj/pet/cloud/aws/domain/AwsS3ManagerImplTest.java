package proj.pet.cloud.aws.domain;

import com.amazonaws.services.s3.AmazonS3;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.testutil.test.UnitTest;

import java.net.URL;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.mockito.Mockito.mock;

class AwsS3ManagerImplTest extends UnitTest {

	@InjectMocks
	private AwsS3ManagerImpl awsS3ManagerImpl;

	@Mock(strictness = Mock.Strictness.LENIENT)
	private AmazonS3 amazonS3;

	@DisplayName("MultipartFile을 받아서 S3에 업로드하고, 업로드된 이미지의 URL을 반환한다.")
	@Test
	void uplaodFileToBucket() {
		//given
		String bucketName = "bucket-name";
		String directory = "directory";
		String fileName = "fileName";
		MultipartFile multipartFile = mock(MultipartFile.class);
		URL s3FileUrl = mock(URL.class);
		given(amazonS3.getUrl(bucketName, fileName)).willReturn(s3FileUrl);

		//when
		String uploadedUrl = awsS3ManagerImpl.uploadFileToBucket(bucketName, directory, multipartFile, fileName);

		//then
		assertThat(uploadedUrl).isEqualTo("https://" + s3FileUrl.getHost() + "/" + directory + "/" + fileName);
	}

	@DisplayName("bucketName과 url을 받아서 S3에서 파일을 삭제한다.")
	@Test
	void deleteFileByUrl() {
		//given
		String bucketName = "bucket-name";
		String urlAsString = "https://bucket-name.s3.ap-northeast-2.amazonaws.com/directory/fileName";
		willDoNothing().given(amazonS3).deleteObject(any(), any());

		//when
		awsS3ManagerImpl.deleteFileByUrl(bucketName, urlAsString);

		//then
		/* anyString <- file key converted in method */
		then(amazonS3).should().deleteObject(eq(bucketName), anyString());
	}
}