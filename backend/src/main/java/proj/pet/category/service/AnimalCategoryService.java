package proj.pet.category.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.category.repository.AnimalCategoryRepository;

@Service
@RequiredArgsConstructor
public class AnimalCategoryService {

	private final AnimalCategoryRepository animalCategoryRepository;

}
