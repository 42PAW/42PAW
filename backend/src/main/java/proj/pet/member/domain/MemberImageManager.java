package proj.pet.member.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.cloud.aws.config.AwsS3Properties;
import proj.pet.cloud.aws.domain.AwsS3ManagerImpl;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class MemberImageManager {

	private final AwsS3ManagerImpl awsS3ManagerImpl;
	private final AwsS3Properties awsS3Properties;

	public String uploadMemberProfileImage(MultipartFile profileImageData) {
		String filename = UUID.randomUUID().toString();
		return awsS3ManagerImpl.uploadFileToBucket(
				awsS3Properties.getBucketName(),
				awsS3Properties.getProfileImageDirectory(),
				profileImageData,
				filename);
	}

	public void deleteMemberProfileImage(String profileImageUrl) {
		try {
			awsS3ManagerImpl.deleteFileByUrl(awsS3Properties.getBucketName(), profileImageUrl);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
