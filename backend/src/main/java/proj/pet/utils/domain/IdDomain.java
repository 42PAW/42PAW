package proj.pet.utils.domain;

import jakarta.persistence.*;
import org.springframework.data.domain.Persistable;

/**
 * Long인 단일 Id를 가지는 엔티티의 추상 클래스입니다.
 * <p>
 *     {@link Persistable} 인터페이스를 구현하여, {@link #isNew()} 메서드를 구현합니다.
 *     <br>
 *     {@link #isNew()} 메서드는 {@link #id}가 null인지 여부를 반환합니다.
 *     <br>
 *     {@link #id}가 null이면 새로운 엔티티로 판단합니다.
 *     <br>
 *     {@link #equals(Object)}와 {@link #hashCode()} 메서드를 구현합니다.
 */
@MappedSuperclass
public abstract class IdDomain implements Persistable<Long> {

	@Id @Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id = null;
	@Transient
	private boolean isNew = true;

	@Override
	public Long getId() {
		return id;
	};

	/**
	 * Long 타입 Id를 갖는 엔티티의 경우, Equals와 HashCode는 고정이므로, final로 선언합니다.
	 */
	@Override
	public final boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !getClass().equals(o.getClass())) return false;
		return getId() != null && getId().equals(((IdDomain) o).getId());
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
