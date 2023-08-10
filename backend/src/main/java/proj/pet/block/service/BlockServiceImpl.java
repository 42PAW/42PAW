package proj.pet.block.service;

import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;

import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.block.domain.Block;
import proj.pet.block.repository.BlockRepository;
import proj.pet.follow.repository.FollowRepository;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;

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
				.orElseThrow(NOT_FOUND_MEMBER::toServiceException);
		Member blockedMember = memberRepository.findById(blockMemberId)
				.orElseThrow(NOT_FOUND_MEMBER::toServiceException);
		followRepository.findByMemberCompositeKey(memberId, blockMemberId)
				.ifPresent(followRepository::delete);
		followRepository.findByMemberCompositeKey(blockMemberId, memberId)
				.ifPresent(followRepository::delete);
		Block block = Block.of(member, blockedMember, LocalDateTime.now());
		return blockRepository.save(block);
	}

	@Override
	public void deleteBlock(Long memberId, Long blockMemberId) {
		Block block = blockRepository.findByMemberCompositeKey(memberId, blockMemberId)
				.orElseThrow(NOT_FOUND_MEMBER::toServiceException);
		blockRepository.deleteByCompositeKey(block.getId());
	}
}
