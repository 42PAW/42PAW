package proj.pet.cloud.aws.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsConfig {

	@Value("${cloud.aws.credentials.access-key}")
	private String accessKey;

	@Value("${cloud.aws.credentials.secret-key}")
	private String secretKey;

	@Value("${cloud.aws.region.static}")
	private String region;

	private AWSStaticCredentialsProvider createAwsCredentialsProvider() {
		BasicAWSCredentials basicAWSCredentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
		return new AWSStaticCredentialsProvider(basicAWSCredentials);
	}

	@Bean
	public AmazonS3 amazonS3() {
		return AmazonS3Client.builder()
				.withRegion(region)
				.withCredentials(createAwsCredentialsProvider())
				.build();
	}
}
