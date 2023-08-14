package proj.pet.cache.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cache")
public class CacheTestController {

	@GetMapping
	@Cacheable(value = "worldMapStatistics")
	public CacheTestDto get() {
		CacheTestDto data = new CacheTestDto("name", 10);
		System.out.println("데이터를 만들었삼~");
		return data;
	}

	@AllArgsConstructor
	@Getter
	private class CacheTestDto {
		private String name;
		private int age;
	}
}
