package com.suports.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.suports.web.cmm.IFunction;
import com.suports.web.cmm.Proxy;
import com.suports.web.domain.ReservationDTO;
import com.suports.web.mapper.ReservationMapper;
import com.suports.web.service.TransactionServiceImpl;

@RestController
public class ReservationController {

	@Autowired Map<String, Object> map;
	@Autowired ReservationMapper resMap;
	@Autowired Proxy pxy;
	@Autowired ReservationDTO resDTO;
	@Autowired IFunction i;
	@Autowired TransactionServiceImpl tranService;
	
	@SuppressWarnings("unchecked")
	@GetMapping("/reservation/payment/{timeIndex}/{positionName}/{memberIndex}/{stadiumIndex}")
	public Map<?, ?> reservation(@PathVariable int timeIndex,
								@PathVariable String positionName,
								@PathVariable int memberIndex,
								@PathVariable int stadiumIndex
								){
		map.clear();
		map.put("timeIndex",timeIndex );
		map.put("positionName", positionName);
		map.put("memberIndex", memberIndex);
		map.put("stadiumIndex", stadiumIndex);
		map = (Map<String, Object>) tranService.reservationTransaction(map);
		return map;
	}
	@GetMapping("/reservation/list/{memberIndex}")
	public Map<?, ?> list(@PathVariable String memberIndex){
		i = (Object o) -> resMap.selectReservationList(memberIndex);
		List<?> list = (List<?>) i.apply(memberIndex);
		map.clear();
		map.put("res", list);
		return map;
	}
}
