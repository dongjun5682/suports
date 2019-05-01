package com.suports.web.service;

import org.springframework.stereotype.Component;

import com.suports.web.mapper.ReservationMapper;

@Component
public interface ReservationService {
	public void selectReservationList(); 
	public void selectReservation();
	public String selectReservation(String searchWord);
	public int countReservation();
	public boolean existsPayment(String searchword);
	public void updateReservation(ReservationMapper res);
	public void deleteReservation(ReservationMapper res);
}
