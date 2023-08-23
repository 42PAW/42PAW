package proj.pet.testutil;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.cloud.aws.domain.AwsS3Manager;
import proj.pet.cloud.aws.domain.AwsS3ManagerImpl;

/**
 * 외부 의존성을 끊어내는 설정
 */
@TestConfiguration
public class ExternalDependenciesBreaker {

	@Bean
	public AwsS3Manager AwsS3Manger() {
		return new AwsS3ManagerImpl(null) {
			@Override
			public String uploadFileToBucket(String bucketName, String directory, MultipartFile file, String filename) {
				return null;
			}

			@Override
			public String deleteFileByUrl(String bucketName, String UrlAsString) {
				return null;
			}
		};
	}
}
