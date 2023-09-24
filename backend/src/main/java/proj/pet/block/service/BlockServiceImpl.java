package proj.pet.block.service;

import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;

import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.block.domain.Block;
import proj.pet.block.repository.BlockRepository;
import proj.pet.exception.ExceptionStatus;
import proj.pet.exception.ServiceException;
import proj.pet.follow.repository.FollowRepository;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;
import proj.pet.utils.domain.MemberCompositeKey;
import proj.pet.utils.domain.RuntimeExceptionThrower;

@Service
@RequiredArgsConstructor
@Transactional
public class BlockServiceImpl implements BlockService {

	private final BlockRepository blockRepository;
	private final FollowRepository followRepository;
	private final MemberRepository memberRepository;

	@Override
	public Block blockMember(Long memberId, Long blockMemberId) {
		Member member = memberRepository.findById(memberId)
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		Member blockedMember = memberRepository.findById(blockMemberId)
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		MemberCompositeKey key = MemberCompositeKey.of(memberId, blockMemberId);
		RuntimeExceptionThrower.ifTrue(blockRepository.findByMemberCompositeKey(key).isPresent(),
				new ServiceException(ExceptionStatus.ALREADY_BLOCKED_MEMBER));
		followRepository.deleteById(key);
		followRepository.deleteById(MemberCompositeKey.of(blockMemberId, memberId));
		Block block = Block.of(member, blockedMember, LocalDateTime.now());
		return blockRepository.save(block);
	}

	@Override
	public void deleteBlock(Long memberId, Long blockMemberId) {
		MemberCompositeKey key = MemberCompositeKey.of(memberId, blockMemberId);
		Optional<Block> blocked = blockRepository.findByMemberCompositeKey(key);
		Block block = blockRepository.findByMemberCompositeKey(key)
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		blockRepository.delete(block);
	}
}
