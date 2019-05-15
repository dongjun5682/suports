package com.suports.web.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.suports.web.Proxy;
import com.suports.web.domain.ChatBotDTO;
import com.suports.web.domain.StadiumDTO;

@Repository
public interface StadiumMapper {
	
	public void insertStadium(StadiumDTO std);
	
	//stadium serch
	public List<?> selectListStadium(Proxy pxy);
	public List<?> searchStadium(Proxy pxy);
	public List<?> selectSeoulStadium(Proxy pxy);
	public List<?> selectIncheonStadium(Proxy pxy);
	public List<?> selectGyeonggiStadium(Proxy pxy);
	
	public Map<?,?> selectStadiums(StadiumDTO std);
	public Map<?,?> selectStadium(StadiumDTO std);
	
	public int countStadium();
	public int countSeoulSearch();
	public int countIncheonSearch();
	public int countGyeonggiSearch();
	
	
	public int countSearch(String search);
	
	public void updateStadium(StadiumDTO std);
	public void deleteStadium(StadiumDTO std);
	
	//home stadium list
	public List<?> selectAllStadium();
	
	public void chatBotAnswer(ChatBotDTO chd);
	
	public String selectStadiumName(int stadiumIndex);

	
}
