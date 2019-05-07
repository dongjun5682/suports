package com.suports.web.mapper;

import com.suports.web.Proxy;
import com.suports.web.domain.MemberDTO;
import com.suports.web.domain.TeamDTO;

import java.util.List;
import java.util.Map;


public interface TeamMapper {

	// CREATE
	public void insertATeam(TeamDTO team);
	
	// READ
	public List<?> selectListOfTeams(Proxy pxy);
	public List<TeamDTO> selectSomeOfTeams(Map<?,?> map);
	public Map<String, Object> selectATeamPic(TeamDTO team);
	public TeamDTO selectATeam(TeamDTO team);
	
	//tournament apply access
	public TeamDTO selectTeam(MemberDTO memDTO);
	
	public int countTeams();
	public boolean existATeamId(TeamDTO team);
	
	// UPDATE
	public void updateATeam(TeamDTO team);
	public Map<String, Object> selectProfile(Map<?,?> map);
	
	// DELETE
	public void deleteATeam(TeamDTO team);
}
