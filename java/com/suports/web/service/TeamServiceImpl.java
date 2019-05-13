package com.suports.web.service;

import java.util.List;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.suports.web.domain.TeamDTO;
import com.suports.web.mapper.TeamMapper;

@Service
public class TeamServiceImpl implements TeamService {

	@Autowired TeamMapper teamMapper;
	
	@Override
	public void addATeam(TeamDTO team) {
		teamMapper.insertATeam(team);
	}

	@Override
	public List<?> retrieveListOfTeams(Map<?, ?> map) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<TeamDTO> retrieveSomeOfTeams(Map<?, ?> map) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> retrieveATeamPic(TeamDTO team) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TeamDTO retrieveATeam(TeamDTO team) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int countTeams() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public boolean existATeamId(TeamDTO team) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void modifyATeam(TeamDTO team) {
		teamMapper.updateATeam(team);
		
	}

	@Override
	public Map<String, Object> retrieveProfile(Map<?, ?> map) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void removeATeam(TeamDTO team) {
		// TODO Auto-generated method stub
		
	}
}
