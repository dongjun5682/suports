package com.suports.web.mapper;

import java.util.List;


import org.springframework.stereotype.Repository;

import com.suports.web.cmm.Proxy;
import com.suports.web.domain.MemberDTO;

@Repository
public interface AlramMapper {

	public void insertReservation(Proxy pxy);
	public void insertPayment(Proxy pxy);
	
	public void insertMember(MemberDTO mem);
	
	public List<?> seletMemberAlram(String mIndex);
}
