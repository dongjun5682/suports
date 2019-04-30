package com.suports.web.service;
import org.springframework.stereotype.Component;

import com.suports.web.mapper.StadiumMapper;

@Component
public interface StadiumService {
	public void selectStadiumList(); 
	public void selectStadium();
	public String selectStadium(String searchWord);
	public int countStadium();
	public boolean existsStadium(String searchword);
	public void updateStadium(StadiumMapper sta);
	public void deleteStadium(StadiumMapper sta);
}
