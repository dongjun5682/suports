package com.suports.web.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.suports.web.Proxy;
import com.suports.web.domain.StadiumDTO;

@Repository
public interface StadiumMapper {
	
	public void insertStadium(StadiumDTO std);
	public List<StadiumDTO> selectStadiumList(Proxy pxy);
	public Map<?,?> selectStadiums(StadiumDTO std);
	public Map<?,?> selectStadium(StadiumDTO std);
	public int countStadium();
	public void updateStadium(StadiumDTO std);
	public void deleteStadium(StadiumDTO std);
	
}
