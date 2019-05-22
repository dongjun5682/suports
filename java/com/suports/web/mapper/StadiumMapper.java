package com.suports.web.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.suports.web.cmm.Proxy;
import com.suports.web.domain.StadiumDTO;

@Repository
public interface StadiumMapper {
	
	public void insertStadium(StadiumDTO std);
	
	//stadium serch
	public List<?> allStadium(Proxy pxy);
	
	public List<?> searchStadium(Proxy pxy);
	public List<?> selectSeoulStadium(Proxy pxy);
	public List<?> selectIncheonStadium(Proxy pxy);
	public List<?> selectGyeonggiStadium(Proxy pxy);
	
	public int countStadium();
	public int countSeoulSearch();
	public int countIncheonSearch();
	public int countGyeonggiSearch();
	
	
	public int countSearch(Map<?, ?> map);
	
	public List<?> areaAllStadium();
	public String selectStadiumName(int stadiumIndex);
	public List<?> mapLocation();

	
}
