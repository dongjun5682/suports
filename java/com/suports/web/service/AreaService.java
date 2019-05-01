package com.suports.web.service;

import org.springframework.stereotype.Component;

import com.suports.web.mapper.AreaMapper;

@Component
public interface AreaService {
	public void selectAreaList(); 
	public void selectArea();
	public String selectArea(String searchWord);
	public int countArea();
	public boolean existsArea(String searchword);
	public void updateArea(AreaMapper area);
	public void deleteArea(AreaMapper area);
}
