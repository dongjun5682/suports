package com.suports.web.mapper;

import org.springframework.stereotype.Repository;

@Repository
public interface PaymentMapper {
	
	public void insertPayment(String key);
}
