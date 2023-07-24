package proj.pet.cloud.aws.domain;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class AwsS3Manager {

	private final AmazonS3 s3;

	/**
	 * 오직 이미지 파일을 충실히 업로드하는 데에만 집중할 것.
	 * -> UUID를 심는 부분은 도메인 로직이므로 이름을 인자로 받을 것.
	 * @param bucketPath
	 * @param file
	 */
	public void uploadFileToBucket(String bucketPath, MultipartFile file, String filename) {
		System.out.println("filename = " + filename);
		try {
			s3.putObject(createPutObjectRequest(bucketPath, file, filename));
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("업로드 완료!");
	}

	private ObjectMetadata createObjectMetadata(MultipartFile file) {
		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentType(file.getContentType());
		objectMetadata.setContentLength(file.getSize());
		System.out.println("업로드 할 오브젝트 메타데이터 생성 완료!");
		return objectMetadata;
	}

	private PutObjectRequest createPutObjectRequest(String bucketPath, MultipartFile file, String filename) throws IOException {
		System.out.println("업로드 시작!");
		return new PutObjectRequest(bucketPath, filename, file.getInputStream(), createObjectMetadata(file));
	}
}
