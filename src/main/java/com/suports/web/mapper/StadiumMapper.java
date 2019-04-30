package com.suports.web.mapper;

import org.springframework.stereotype.Repository;

@Repository
public interface StadiumMapper {
	public void selectStadiumList(); 
	public void selectStadium();
	public String selectStadium(String searchWord);
	public int countStadium();
	public boolean existsStadium(String searchword);
	public void updateStadium(StadiumMapper sta);
	public void deleteStadium(StadiumMapper sta);
}
