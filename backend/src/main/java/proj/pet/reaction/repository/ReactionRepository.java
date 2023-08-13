package proj.pet.reaction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proj.pet.reaction.domain.Reaction;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {
}
