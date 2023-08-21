package proj.pet.cloud.aws.domain;

import org.springframework.web.multipart.MultipartFile;

public interface AwsS3Manager {

	String uploadFileToBucket(String bucketName, String directory, MultipartFile file, String filename);

	String deleteFileByUrl(String bucketName, String UrlAsString);
}
