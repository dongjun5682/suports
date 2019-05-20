package com.suports.web.service;

import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public interface TransactionService {

	public Map<?, ?> reservationTransaction(Map<?, ?> map);
	public void teamJoinMember(Map<?,?> map);
}
