package proj.pet.board.domain;

import proj.pet.exception.DomainException;

import static proj.pet.exception.ExceptionStatus.INVALID_ARGUMENT;

public enum MediaType {
	IMAGE,
	VIDEO;

	public static MediaType from(String contentType) {
		if (contentType.startsWith("image")) {
			return IMAGE;
		}
		if (contentType.startsWith("video")) {
			return VIDEO;
		}
		throw new DomainException(INVALID_ARGUMENT);
	}
}
