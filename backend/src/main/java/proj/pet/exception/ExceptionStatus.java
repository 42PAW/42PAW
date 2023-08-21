package proj.pet.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
@RequiredArgsConstructor
@Getter
public enum ExceptionStatus {

	/*-----------------------------------CONTROLLER-----------------------------------*/
	INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 에러가 발생했습니다."),
	OAUTH_BAD_GATEWAY(HttpStatus.BAD_GATEWAY, "인증 서버와 통신 중 에러가 발생했습니다."),
	UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "로그인 정보가 유효하지 않습니다\n다시 로그인해주세요."),
	INCORRECT_ARGUMENT(HttpStatus.BAD_REQUEST, "잘못된 입력입니다."),

	/*-----------------------------------SERVICE-----------------------------------*/
	NOT_FOUND_MEMBER(HttpStatus.NOT_FOUND, "멤버가 존재하지 않습니다."),
	ALREADY_EXIST_MEMBER(HttpStatus.CONFLICT, "이미 존재하는 멤버입니다."),
	ALREADY_BLOCKED_MEMBER(HttpStatus.CONFLICT, "이미 차단된 멤버입니다."),
	UNAUTHENTICATED(HttpStatus.FORBIDDEN, "권한이 없는 요청입니다."),
	NOT_FOUND_BOARD(HttpStatus.NOT_FOUND, "존재하지 않는 게시물입니다."),
	NOT_FOUND_REACTION(HttpStatus.NOT_FOUND, "존재하지 않는 반응입니다."),
	NOT_FOUND_SCRAP(HttpStatus.NOT_FOUND, "존재하지 않는 스크랩입니다."),
	NOT_FOUND_COMMENT(HttpStatus.NOT_FOUND, "존재하지 않는 댓글입니다."),

	/*-----------------------------------DOMAIN-----------------------------------*/
	INVARIANT_VIOLENCE(HttpStatus.BAD_REQUEST, "불변식에 위배되는 생성 매개변수입니다."),
	INVALID_ARGUMENT(HttpStatus.BAD_REQUEST, "유효하지 않은 입력입니다."),
	MALFORMED_URL(HttpStatus.BAD_REQUEST, "잘못된 URL입니다.");

	private final int statusCode;
	private final String error;
	private String message;

	ExceptionStatus(HttpStatus status, String message) {
		this.statusCode = status.value();
		this.message = message;
		this.error = status.getReasonPhrase();
	}

	public ControllerException asControllerException() {
		return new ControllerException(this);
	}

	public ServiceException asServiceException() {
		return new ServiceException(this);
	}

	public DomainException asDomainException() {
		return new DomainException(this);
	}
}
