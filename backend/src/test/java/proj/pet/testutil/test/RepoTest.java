package proj.pet.testutil.test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import proj.pet.testutil.JpaQueryFactoryConfig;

@DataJpaTest
@Import(JpaQueryFactoryConfig.class)
public class RepoTest {
	@PersistenceContext
	protected EntityManager em;
}
