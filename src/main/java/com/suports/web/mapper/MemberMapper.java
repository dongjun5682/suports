package com.suports.web.mapper;


import com.suports.web.domain.MemberDTO;

import java.util.List;
import java.util.Map;

public interface MemberMapper {

	// CREATE
	public void insertAMember(MemberDTO mem);
	
	// READ
	public List<?> selectListOfMembers(Map<?,?> map);
	public List<MemberDTO> selectSomeOfMembers(Map<?,?> map);
	public Map<String, Object> selectAMemberPic(MemberDTO mem);
	public MemberDTO selectAMember(MemberDTO mem);
	public int countMembers();
	public boolean existAMemberId(MemberDTO mem);
	
	// UPDATE
	public void updateAMember(MemberDTO mem);
	public Map<String, Object> selectProfile(Map<?,?> map);
	
	// DELETE
	public void deleteAMember(MemberDTO mem);
}
