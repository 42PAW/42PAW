package proj.pet.cloud.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.cloud.config.AwsS3Properties;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AwsS3Service {

	private final AwsS3Properties awsS3Properties;
	private final AmazonS3 s3;

	/**
	 * 오직 이미지 파일을 충실히 업로드하는 데에만 집중할 것.
	 * -> UUID를 심는 부분은 도메인 로직이므로 이름을 인자로 받을 것.
	 * @param imageData
	 */
	public void uploadImageToBucket(MultipartFile imageData, String filename) {
		System.out.println("filename = " + filename);
		try {
			s3.putObject(createPutObjectRequest(imageData, filename));
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("업로드 완료!");
	}

	private ObjectMetadata createObjectMetadata(MultipartFile imageData) {
		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentType(imageData.getContentType());
		objectMetadata.setContentLength(imageData.getSize());
		System.out.println("업로드 할 오브젝트 메타데이터 생성 완료!");
		return objectMetadata;
	}

	private PutObjectRequest createPutObjectRequest(MultipartFile imageData, String filename) throws IOException {
		System.out.println("업로드 시작!");
		return new PutObjectRequest(awsS3Properties.getBucket() + "/profile-images", filename, imageData.getInputStream(), createObjectMetadata(imageData));
	}
}
