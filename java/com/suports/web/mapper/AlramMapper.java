package com.suports.web.mapper;

import org.springframework.stereotype.Repository;

import com.suports.web.domain.AlramDTO;

@Repository
public interface AlramMapper {

	public String selectReservation();
	public String selectPayment();
}
