package category.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import proj.pet.category.repository.AnimalCategoryRepository;

@SpringBootTest
class AnimalCategoryServiceTest {

	@Autowired
	AnimalCategoryRepository animalCategoryRepository;

}