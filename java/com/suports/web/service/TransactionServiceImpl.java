package com.suports.web.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransactionServiceImpl implements TransactionService{

	@Transactional
	@Override
	public Map<?, ?> reservationTransaction(Map<?, ?> map) {

		
		return null;
	}

}
