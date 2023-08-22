package proj.pet.utils.domain;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PostLoad;
import jakarta.persistence.PostPersist;
import jakarta.persistence.Transient;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.data.domain.Persistable;

import java.io.Serializable;

/**
 * Long인 단일 Id를 가지는 엔티티의 추상 클래스입니다.
 * <p>
 * {@link Persistable} 인터페이스를 구현하여, {@link #isNew()} 메서드를 구현합니다.
 * <br>
 * {@link #isNew()} 메서드는 {@link #id}가 null인지 여부를 반환합니다.
 * <br>
 * {@link #id}가 null이면 새로운 엔티티로 판단합니다.
 * <br>
 * {@link #equals(Object)}와 {@link #hashCode()} 메서드를 구현합니다.
 */
@MappedSuperclass
public abstract class IdDomain<ID extends Serializable> implements Persistable<ID> {

	@Transient
	private boolean isNew = true;

	/**
	 * Long 타입 Id를 갖는 엔티티의 경우, Equals와 HashCode는 고정이므로, final로 선언합니다.
	 */
	@Override
	public boolean equals(Object o) {
		if (o == null || getId() == null) {
			return false;
		}
		if (!(o instanceof HibernateProxy)
				&& this.getClass() != o.getClass()) {
			return false;
		}
		@SuppressWarnings("unchecked")
		Serializable oid = o instanceof HibernateProxy
				? (Serializable) ((HibernateProxy) o).getHibernateLazyInitializer().getIdentifier() :
				((IdDomain<ID>) o).getId();
		return getId().equals(oid);
	}

	@Override
	public final int hashCode() {
		return getId() == null ? 0 : getId().hashCode();
	}

	@Override
	public boolean isNew() {
		return this.isNew;
	}

	@PostLoad
	@PostPersist
	protected void markNotNew() {
		this.isNew = false;
	}
}
