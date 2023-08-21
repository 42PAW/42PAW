package proj.pet.cloud.aws.domain;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import static proj.pet.exception.ExceptionStatus.INVALID_ARGUMENT;


@Component
@RequiredArgsConstructor
public class AwsS3ManagerImpl implements AwsS3Manager {

	private final AmazonS3 s3;

	/**
	 * 오직 이미지 파일을 충실히 업로드하는 데에만 집중할 것.
	 * -> UUID를 심는 부분은 도메인 로직이므로 이름을 인자로 받을 것.
	 *
	 * @param bucketName 버킷 이름
	 * @param directory  버킷 내부 디렉토리
	 * @param file       업로드 할 파일
	 * @param filename   업로드 될 파일 이름
	 * @return 업로드 된 파일의 URL
	 * @throws IOException 파일을 업로드하는 과정에서 발생할 수 있는 IO 예외
	 */
	public String uploadFileToBucket(String bucketName, String directory, MultipartFile file, String filename) {
		try {
			s3.putObject(createPutObjectRequest(bucketName, directory, file, filename));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return createFileUrl(s3.getUrl(bucketName, filename), directory, filename);
	}

	/**
	 * @param bucketName  버킷 이름
	 * @param UrlAsString 삭제할 파일의 URL
	 * @return 삭제된 파일의 URL
	 * @throws MalformedURLException URL이 올바르지 않을 경우 발생할 수 있는 예외
	 */
	public String deleteFileByUrl(String bucketName, String UrlAsString) {
		URL fileUrl = null;
		try {
			fileUrl = new URL(UrlAsString);
		} catch (MalformedURLException e) {
			throw INVALID_ARGUMENT.asDomainException();
		}
		String key = extractKeyFromUrl(fileUrl);
		s3.deleteObject(bucketName, key);
		return fileUrl.toString();
	}

	/**
	 * S3에 업로드 된 파일의 URL을 생성하는 메서드
	 *
	 * @param s3FileUrl S3의 getUrl API를 이용한 URL - directory가 포함돼있지 않음
	 * @param directory 버킷 내부 디렉토리
	 * @param filename  업로드 된 파일 이름
	 * @return
	 */
	private String createFileUrl(URL s3FileUrl, String directory, String filename) {
		return "https://" + s3FileUrl.getHost() + "/" + directory + "/" + filename;
	}

	/**
	 * S3에 업로드 된 파일의 키를 추출하는 메서드
	 *
	 * @param fileUrl ex) https://[host]/[directory]/filename
	 * @return S3에 업로드 된 파일의 키 ex) [directory]/filename
	 */
	private String extractKeyFromUrl(URL fileUrl) {
		return fileUrl.getPath().substring(1);
	}

	/**
	 * 파일의 메타데이터를 생성하는 메서드
	 *
	 * @param file 업로드 할 파일
	 * @return 파일의 메타데이터
	 */
	private ObjectMetadata createObjectMetadata(MultipartFile file) {
		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentType(file.getContentType());
		objectMetadata.setContentLength(file.getSize());
		return objectMetadata;
	}

	/**
	 * 파일을 업로드하는 메서드
	 *
	 * @param bucketName 버킷 이름
	 * @param directory  버킷 내부 디렉토리
	 * @param file       업로드 할 파일
	 * @param filename   업로드 될 파일 이름
	 * @return 파일을 업로드하는 요청
	 * @throws IOException 파일을 업로드하는 과정에서 발생할 수 있는 IO 예외
	 */
	private PutObjectRequest createPutObjectRequest(String bucketName, String directory, MultipartFile file, String filename) throws IOException {
		return new PutObjectRequest(bucketName + "/" + directory, filename, file.getInputStream(), createObjectMetadata(file));
	}
}