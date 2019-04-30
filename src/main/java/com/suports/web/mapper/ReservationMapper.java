package com.suports.web.mapper;

import org.springframework.stereotype.Repository;

@Repository
public interface ReservationMapper {
	public void selectReservationList(); 
	public void selectReservation();
	public String selectReservation(String searchWord);
	public int countReservation();
	public boolean existsPayment(String searchword);
	public void updateReservation(ReservationMapper res);
	public void deleteReservation(ReservationMapper res);
}
