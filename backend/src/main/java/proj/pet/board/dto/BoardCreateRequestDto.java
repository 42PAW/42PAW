package proj.pet.board.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.category.domain.Species;

import java.util.List;

@AllArgsConstructor
@Getter
public class BoardCreateRequestDto {
	private final List<MultipartFile> mediaDataList;
	@Enumerated(EnumType.STRING)
	private final List<Species> categoryList;
	private final String content;
}
