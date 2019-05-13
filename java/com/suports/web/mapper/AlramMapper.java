package com.suports.web.mapper;

import org.springframework.stereotype.Repository;

@Repository
public interface AlramMapper {

	public String selectReservation();
	public String selectPayment();
}
