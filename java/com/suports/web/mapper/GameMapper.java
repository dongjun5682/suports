package com.suports.web.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.suports.web.Proxy;
import com.suports.web.domain.GameDTO;

@Repository
public interface GameMapper {
	
	public List<?> selectGame(int index);
	public int selectGameIndex(GameDTO gmDTO);
	public void updateMember(Proxy pxy);
}
