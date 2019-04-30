package com.suports.web.mapper;

import org.springframework.stereotype.Repository;

@Repository
public interface AreaMapper {
	public String txSupplier(String supplierID);
	public void selectAreaList(); 
	public void selectArea();
	public String selectArea(String searchWord);
	public int countArea();
	public boolean existsArea(String searchword);
	public void updateArea(AreaMapper area);
	public void deleteArea(AreaMapper area);
}
