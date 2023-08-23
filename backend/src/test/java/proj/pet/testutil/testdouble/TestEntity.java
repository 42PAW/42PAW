package proj.pet.testutil.testdouble;

import proj.pet.utils.domain.IdDomain;

public interface TestEntity<E extends IdDomain<?>> {

	E asEntity();

}
