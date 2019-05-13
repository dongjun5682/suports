package com.suports.web.service;

import java.util.List;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.suports.web.Proxy;
import com.suports.web.domain.ImageDTO;
import com.suports.web.domain.MemberDTO;
import com.suports.web.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired MemberMapper memberMapper;

	@Override
	public void addAMember(MemberDTO mem) {
		memberMapper.insertAMember(mem);
	}

	@Override
	public List<?> retrieveListOfMembers(Proxy pxy) {
		return memberMapper.selectListOfMembers(pxy);
	}

	@Override
	public List<MemberDTO> retrieveSomeOfMembers(Map<?, ?> map) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> retrieveAMemberPic(MemberDTO mem) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MemberDTO retrieveAMember(MemberDTO mem) {
		return memberMapper.selectAMember(mem);
	}

	@Override
	public int countMembers() {
		return memberMapper.countMembers();
	}

	@Override
	public boolean existAMemberId(MemberDTO mem) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void modifyAMember(MemberDTO mem) {
		memberMapper.updateAMember(mem);
		
	}

	@Override
	public Map<String, Object> retrieveProfile(Map<?, ?> map) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addAMemberPhoto(ImageDTO img) {
		memberMapper.insertAMemberPhoto(img);
		
	}

	@Override
	public void modifyAMemberPhoto(MemberDTO mem) {
		memberMapper.updateAMemberPhoto(mem);
		
	}

	@Override
	public void modifyAMemberTeamIndex(MemberDTO mem) {
		memberMapper.updateAMemberTeamIndex(mem);
		
	}

	@Override
	public void disableAMember(MemberDTO mem) {
		memberMapper.disableAMember(mem);
		
	}
	@Override
	public void enableAMember(MemberDTO mem) {
		memberMapper.enableAMember(mem);
		
	}


	
}
