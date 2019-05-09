package com.suports.web.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface TimeMapper {

	public List<?> selectTimeStadium(String stadiumIndex);
}
