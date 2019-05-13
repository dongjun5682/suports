package com.suports.web.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.suports.web.Proxy;
import com.suports.web.domain.AlramDTO;

@Repository
public interface AlramMapper {

	public void insertReservation(Proxy pxy);
	public void insertPayment(Proxy pxy);
	
	public List<?> seletMemberAlram(int memberIndex);
}
