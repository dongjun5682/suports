package com.suports.web.service;

import java.util.List;

import java.util.Map;

import org.springframework.stereotype.Component;

import com.suports.web.domain.TeamDTO;

@Component
public interface TeamService {

	// CREATE
	public void addATeam(TeamDTO team);
	
	// READ
	public List<?> retrieveListOfTeams(Map<?,?> map);
	public List<TeamDTO> retrieveSomeOfTeams(Map<?,?> map);
	public Map<String, Object> retrieveATeamPic(TeamDTO team);
	public TeamDTO retrieveATeam(TeamDTO team);
	public int countTeams();
	public boolean existATeamId(TeamDTO team);
	
	// modify
	public void modifyATeam(TeamDTO team);
	public Map<String, Object> retrieveProfile(Map<?,?> map);
	
	// remove
	public void removeATeam(TeamDTO team);
}