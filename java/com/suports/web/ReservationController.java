package com.suports.web;

import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.suports.web.domain.GameDTO;
import com.suports.web.domain.ReservationDTO;
import com.suports.web.mapper.GameMapper;
import com.suports.web.mapper.PaymentMapper;
import com.suports.web.mapper.ReservationMapper;

@RestController
public class ReservationController {

	@Autowired Map<String, Object> map;
	@Autowired GameMapper gmMap;
	@Autowired PaymentMapper payMap;
	@Autowired ReservationMapper resMap;
	@Autowired GameDTO gmDTO;
	@Autowired Proxy pxy;
	@Autowired ReservationDTO resDTO;
	
	@GetMapping("/reservation/payment/{timeIndex}/{positionName}/{memberIndex}")
	public ReservationDTO reservation(@PathVariable int timeIndex,
								@PathVariable String positionName,
								@PathVariable int memberIndex){
		Random random = new Random();
		System.out.println("time : "+ timeIndex );
		System.out.println("position : "+ positionName);
		System.out.println("member : "+memberIndex);
		gmDTO.setTimeIndex(timeIndex);
		gmDTO.setPositionName(positionName);
		IFunction i = (Object o) -> gmMap.selectGameIndex(gmDTO);
		String reservationNumber = String.valueOf(random.nextInt((9000000)+1000000));
		map.clear();
		map.put("resNumber", reservationNumber);
		map.put("gmNumber",i.apply(gmDTO));
		map.put("mIndex", memberIndex);
		map.put("totalCount", 0);
		pxy.carryOut(map);
		
		//RESERVATION INSERT
		IConsumer c = (Object o) -> resMap.insertReservation(pxy);
		c.accept(pxy);
		
		//PAYMENT INSERT
		String paymentKey= String.valueOf(random.nextInt((9000000)+1000000));
		c = (Object o) -> payMap.insertPayment(paymentKey);
		c.accept(paymentKey);
		
		// GAME UPDATE
	
		System.out.println(	pxy.getMIndex());
		System.out.println(pxy.getGmNumber());
		c = (Object o) -> gmMap.updateMember(pxy);
		c.accept(pxy);
		
		i = (Object o) -> resMap.selectReservation(pxy);
		resDTO = (ReservationDTO) i.apply(pxy);
		
		System.out.println(resDTO.toString());
		return resDTO;
	}
}
