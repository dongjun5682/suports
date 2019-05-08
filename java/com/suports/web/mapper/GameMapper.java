package com.suports.web.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface GameMapper {
	
	public List<?> selectGame(int index);
		
}
