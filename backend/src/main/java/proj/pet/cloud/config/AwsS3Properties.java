package proj.pet.cloud.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class AwsS3Properties {

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@Value("${cloud.aws.s3.profile-image-folder}")
	private String profileImageFolder;

	@Value("${cloud.aws.s3.board-image-folder}")
	private String boardImageFolder;
}
