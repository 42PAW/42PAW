package proj.pet.testutil;

import jakarta.persistence.EntityManager;
import proj.pet.utils.domain.IdDomain;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class PersistHelper {
	private final EntityManager em;

	private PersistHelper(EntityManager em) {
		this.em = em;
	}

	public static PersistHelper start(EntityManager em) {
		return new PersistHelper(em);
	}

	public PersistHelper persist(IdDomain<?>... entities) {
		for (IdDomain<?> entity : entities) {
			this.em.persist(entity);
		}
		return this;
	}


	@SafeVarargs public final <E extends IdDomain<?>> PersistHelper persist(Collection<E>... entities) {
		for (Collection<E> entity : entities) {
			for (IdDomain<?> idDomain : entity) {
				this.em.persist(idDomain);
			}
		}
		return this;
	}

	public PersistHelper and() {
		return this;
	}

	public PersistHelper flush() {
		this.em.flush();
		return this;
	}

	public PersistHelper clear() {
		this.em.clear();
		return this;
	}


	public void flushAndClear() {
		this.flush().clear();
	}

	public <E extends IdDomain<?>> List<E> persistAndReturn(List<E> entities) {
		for (IdDomain<?> entity : entities) {
			this.em.persist(entity);
		}
		return entities;
	}

	@SafeVarargs public final <E extends IdDomain<?>> List<E> persistAndReturn(E... entities) {
		for (IdDomain<?> entity : entities) {
			this.em.persist(entity);
		}
		return Arrays.stream(entities).collect(Collectors.toList());
	}

	public <E extends IdDomain<?>> E persistAndReturn(E entity) {
		this.em.persist(entity);
		return entity;
	}
}

