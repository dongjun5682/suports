package com.suports.web.mapper;

import org.springframework.stereotype.Repository;

@Repository
public interface PaymentMapper {
	public void selectPaymentList(); 
	public void selectPayment();
	public String selectPayment(String searchWord);
	public int countPayment();
	public boolean existsPayment(String searchword);
	public void updatePayment(PaymentMapper pay);
	public void deletePayment(PaymentMapper pay);
}
