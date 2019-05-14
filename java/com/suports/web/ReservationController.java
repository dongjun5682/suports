package com.suports.web;

import java.util.ArrayList;

import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.suports.web.domain.AlramDTO;
import com.suports.web.domain.GameDTO;
import com.suports.web.domain.ReservationDTO;
import com.suports.web.mapper.AlramMapper;
import com.suports.web.mapper.GameMapper;
import com.suports.web.mapper.PaymentMapper;
import com.suports.web.mapper.ReservationMapper;
import com.suports.web.mapper.StadiumMapper;

@RestController
public class ReservationController {

	@Autowired Map<String, Object> map;
	@Autowired GameMapper gmMap;
	@Autowired PaymentMapper payMap;
	@Autowired ReservationMapper resMap;
	@Autowired GameDTO gmDTO;
	@Autowired Proxy pxy;
	@Autowired ReservationDTO resDTO;
	@Autowired AlramMapper alMap;
	@Autowired ISupplier s;
	@Autowired AlramDTO alDTO;
	@Autowired IConsumer c;
	@Autowired StadiumMapper stMap;
	@Autowired IFunction i;
	
	@Transactional
	@GetMapping("/reservation/payment/{timeIndex}/{positionName}/{memberIndex}/{stadiumIndex}")
	public Map<?, ?> reservation(@PathVariable int timeIndex,
								@PathVariable String positionName,
								@PathVariable int memberIndex,
								@PathVariable int stadiumIndex
								){
		Random random = new Random();
		int member = 0;
		System.out.println("time : "+ timeIndex );
		System.out.println("position : "+ positionName);
		System.out.println("member : "+memberIndex);
		gmDTO.setTimeIndex(timeIndex);
		gmDTO.setPositionName(positionName);
		System.out.println("게임번호 가져오기 1");
		i = (Object o) -> gmMap.selectGameIndex(gmDTO);
		String reservationNumber = String.valueOf(random.nextInt((9000000)+1000000));
		map.clear();
		map.put("resNumber", reservationNumber);
		map.put("gmNumber",i.apply(gmDTO));
		map.put("mIndex", memberIndex);
		map.put("totalCount", 0);
		pxy.reservation(map);
		
		//RESERVATION INSERT
		System.out.println("예약 등록 2");
		IConsumer c = (Object o) -> resMap.insertReservation(pxy);
		c.accept(pxy);
		
		//PAYMENT INSERT
		System.out.println("결제 대기 3");
		String paymentKey= String.valueOf(random.nextInt((9000000)+1000000));
		c = (Object o) -> payMap.insertPayment(paymentKey);
		c.accept(paymentKey);
		
		// GAME UPDATE
		System.out.println("게임 포지션 등록 4");
		System.out.println(	pxy.getMIndex());
		System.out.println(pxy.getGmNumber());
		c = (Object o) -> gmMap.updateMember(pxy);
		c.accept(pxy);
		
		System.out.println("예약한거 선택 5");
		i = (Object o) -> resMap.selectReservation(pxy);
		resDTO = (ReservationDTO) i.apply(pxy);
		
		List<?> list = null;
	
		System.out.println("경기장 예약 인원수 체크 6");
		i = (Object o) -> gmMap.countMember(timeIndex);
		int count = (int) i.apply(timeIndex);
		
		
		i = (Object o) -> stMap.selectStadiumName(stadiumIndex);
		String name = (String) i.apply(stadiumIndex);
		
		if(count == 22) {
			System.out.println("22명 다 찼으면 결제!!7 ");
			c = (Object o) -> alMap.insertPayment(pxy);
			c.accept(memberIndex);
			String mIndex = String.valueOf(memberIndex);
			//알림 보내줄 MEMBER_INDEX 리스트로뽑아오기
			i = (Object o) -> gmMap.selectGameMember(timeIndex);
			list = (List<?>) i.apply(timeIndex);
			
			map.clear();
			map.put("name",name);
			for (int j = 0; j < list.size(); j++) {
				member = Integer.parseInt(list.get(j).toString().substring(list.get(j).toString().lastIndexOf("=")+1).replaceAll("}",""));
				map.put("mIndex",member);
				pxy.alram(map);
				c = (Object o) -> alMap.insertPayment(pxy);
				c.accept(pxy);
			}
			
			i = (Object o) -> alMap.seletMemberAlram(mIndex);
			list = (List<?>) i.apply(mIndex);
			
			String time = String.valueOf(timeIndex);
			i = (Object o) -> payMap.selectPayments(time);
			List<?> pay = (List<?>) i.apply(time);
		
			for (int j = 0; j < pay.size(); j++) {
				String num = pay.get(j).toString().substring(pay.get(j).toString().lastIndexOf("=")+1).replaceAll("}","");
				c = (Object o) -> payMap.updateAccessCode(num);
				c.accept(num);
			}
			/*
			 * 경기장의 타임인덱스 같은 경기장에 멤버들을 뽑아와서 예약확정 해주기
			 * SELECT MEMBER_INDEX FROM GAME WHERE TIME_INDEX = 1;
			 * 
			 * */
		}else {
			System.out.println("결제 대기 7");
			map.clear();
			map.put("name",name);
			map.put("mIndex", memberIndex);
			pxy.alram(map);
			c = (Object o) -> alMap.insertReservation(pxy);
			c.accept(pxy);
			String mIndex = String.valueOf(memberIndex);
			i = (Object o) -> alMap.seletMemberAlram(mIndex);
			list = (List<?>) i.apply(mIndex);
			
		}
		System.out.println(resDTO.toString());
		map.clear();
		map.put("alram",list);
		map.put("res", resDTO);
		return map;
	}
	@GetMapping("/reservation/list/{memberIndex}")
	public Map<?, ?> list(@PathVariable String memberIndex){
		
		i = (Object o) -> resMap.selectReservationList(memberIndex);
		List<?> list = (List<?>) i.apply(memberIndex);
		
		System.out.println("resList : " + list.toString());
		map.clear();
		map.put("res", list);
		return map;
	}
}
