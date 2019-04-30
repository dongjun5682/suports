package com.suports.web.mapper;

import org.springframework.stereotype.Repository;

@Repository
public interface TimeMapper {
	public void selectTimeList(); 
	public void selectTime();
	public String selectTime(String searchWord);
	public int countTime();
	public boolean existsTime(String searchword);
	public void updateTime(TimeMapper time);
	public void deleteTime(TimeMapper time);
}
