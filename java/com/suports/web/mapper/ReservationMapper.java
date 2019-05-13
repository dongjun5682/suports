package com.suports.web.mapper;

import org.springframework.stereotype.Repository;

import com.suports.web.Proxy;
import com.suports.web.domain.ReservationDTO;

@Repository
public interface ReservationMapper {
	
	public void insertReservation(Proxy pxy);
	public ReservationDTO selectReservation(Proxy pxy);
}
