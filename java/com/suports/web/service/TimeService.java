package com.suports.web.service;

import org.springframework.stereotype.Component;

import com.suports.web.mapper.TimeMapper;

@Component
public interface TimeService {
	public void selectTimeList(); 
	public void selectTime();
	public String selectTime(String searchWord);
	public int countTime();
	public boolean existsTime(String searchword);
	public void updateTime(TimeMapper time);
	public void deleteTime(TimeMapper time);
}
