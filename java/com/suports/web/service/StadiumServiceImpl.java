package com.suports.web.service;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.suports.web.cmm.Proxy;
import com.suports.web.domain.StadiumDTO;
import com.suports.web.mapper.StadiumMapper;

@Service
public class StadiumServiceImpl implements StadiumService{

	@Autowired StadiumMapper stdMap;
	@Autowired Proxy pxy;
	
	@Override
	public void addStadium(StadiumDTO std) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<?> retrieveListStadium(Map<?, ?> map) {
		return null;
	}

	@Override
	public StadiumDTO retrieveStadium(StadiumDTO std) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int countStadium() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public boolean existStadium(StadiumDTO std) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void modifyStadium(StadiumDTO std) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeStadium(StadiumDTO std) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public int countStadiums() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<StadiumDTO> retrieveSomeOfStadium(Map<?, ?> map) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<?> retrieveStadiums(Proxy pxy) {
		// TODO Auto-generated method stub
		return null;
	}
}