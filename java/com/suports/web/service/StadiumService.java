package com.suports.web.service;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.suports.web.domain.StadiumDTO;


@Component
public interface StadiumService {
	
	// CREATE
	public void addStadium(StadiumDTO std);
	
	// READ
	public List<?> retrieveListStadium(Map<?,?> map);
	public List<StadiumDTO> retrieveSomeOfStadium(Map<?,?> map);
	public StadiumDTO retrieveStadiums();
	public StadiumDTO retrieveStadium(StadiumDTO std);
	
	
	public int countStadium();
	public boolean existStadium(StadiumDTO std);
	
	// modify
	public void modifyStadium(StadiumDTO std);
	// remove
	public void removeStadium(StadiumDTO std);
}