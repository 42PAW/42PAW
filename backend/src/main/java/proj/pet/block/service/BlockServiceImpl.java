package proj.pet.block.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.block.domain.Block;
import proj.pet.block.repository.BlockRepository;
import proj.pet.follow.repository.FollowRepository;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;
import proj.pet.utils.domain.MemberCompositeKey;

import java.time.LocalDateTime;

import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;

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
		followRepository.deleteById(MemberCompositeKey.of(memberId, blockMemberId));
//				.ifPresent(followRepository::delete);
		followRepository.deleteById(MemberCompositeKey.of(blockMemberId, memberId));
//				.ifPresent(followRepository::delete);
		Block block = Block.of(member, blockedMember, LocalDateTime.now());
		return blockRepository.save(block);
	}

	@Override
	public void deleteBlock(Long memberId, Long blockMemberId) {
		Block block = blockRepository.findByMemberCompositeKey(memberId, blockMemberId)
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		blockRepository.deleteByCompositeKey(block.getId());
	}
}
