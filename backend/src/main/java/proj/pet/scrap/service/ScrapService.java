package proj.pet.scrap.service;

public interface ScrapService {

	void createScrap(Long memberId, Long boardId);


	void deleteScrap(Long memberId, Long boardId);
}
