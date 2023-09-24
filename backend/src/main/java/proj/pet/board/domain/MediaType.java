package proj.pet.board.domain;

import org.springframework.web.multipart.MultipartFile;
import proj.pet.exception.DomainException;

import static proj.pet.exception.ExceptionStatus.INVALID_ARGUMENT;

/**
 * 게시물의 미디어 타입
 */
public enum MediaType {
	IMAGE,
	VIDEO;

	/**
	 * contentType을 기반으로 MediaType을 반환한다.
	 *
	 * @param mediaData {@link MultipartFile}
	 * @return 미디어 타입
	 */
	public static MediaType from(MultipartFile mediaData) {
		if (mediaData == null || mediaData.getContentType() == null) {
			throw new DomainException(INVALID_ARGUMENT);
		}
		String contentType = mediaData.getContentType();
		if (contentType.startsWith("image")) {
			return IMAGE;
		}
		if (contentType.startsWith("video")) {
			return VIDEO;
		}
		throw new DomainException(INVALID_ARGUMENT);
	}
}
