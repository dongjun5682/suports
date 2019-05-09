package com.suports.web.service;

import java.util.List;

import java.util.Map;

import org.springframework.stereotype.Component;

import com.suports.web.domain.ImageDTO;
import com.suports.web.domain.MemberDTO;

@Component
public interface MemberService {

	// CREATE
	public void addAMember(MemberDTO mem);
	public void addAMemberPhoto(ImageDTO img);
	
	// READ
	public List<?> retrieveListOfMembers(Map<?,?> map);
	public List<MemberDTO> retrieveSomeOfMembers(Map<?,?> map);
	public Map<String, Object> retrieveAMemberPic(MemberDTO mem);
	public MemberDTO retrieveAMember(MemberDTO mem);
	public int countMembers();
	public boolean existAMemberId(MemberDTO mem);
	
	// UPDATE
	public void modifyAMember(MemberDTO mem);
	public void modifyAMemberPhoto(MemberDTO mem);
	public Map<String, Object> retrieveProfile(Map<?,?> map);
	
	// DELETE
	public void removeAMember(MemberDTO mem);
}