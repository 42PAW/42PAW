package proj.pet.cloud.aws.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * 실제 비즈니스 로직에 사용되는 S3 버켓의 상세 정보를 담은 클래스입니다.
 */
@Component
@Getter
public class AwsS3Properties {

	@Value("${cloud.aws.s3.main-bucket}")
	private String mainBucket;

	@Value("${cloud.aws.s3.profile-image-bucket}")
	private String profileImageBucket;

	@Value("${cloud.aws.s3.board-media-bucket}")
	private String boardImageBucket;
}
