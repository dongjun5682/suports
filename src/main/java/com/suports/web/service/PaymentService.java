package com.suports.web.service;

import org.springframework.stereotype.Component;

import com.suports.web.mapper.PaymentMapper;

@Component
public interface PaymentService {
	public void selectPaymentList(); 
	public void selectPayment();
	public String selectPayment(String searchWord);
	public int countPayment();
	public boolean existsPayment(String searchword);
	public void updatePayment(PaymentMapper pay);
	public void deletePayment(PaymentMapper pay);
}
