package com.suports.web.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface PaymentMapper {
	
	public void insertPayment(String key);
	public List<?> selectPayments(String timeIndex);
	public void updateAccessCode(String memberNum);
}
