package proj.pet.scrap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proj.pet.scrap.domain.Scrap;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, Long> {
}
