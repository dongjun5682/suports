package com.suports.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.suports.web.domain.MemberDTO;
import com.suports.web.service.MemberServiceImpl;

@RestController
public class MemmberController {
	private static final Logger logger = LoggerFactory.getLogger(MemmberController.class);

	@Autowired MemberDTO memberDTO;
	@Autowired MemberServiceImpl memberService;
	
	@PostMapping("/members/{userid}")
	public MemberDTO login(@RequestBody MemberDTO param, @PathVariable String userid) {
		
		System.out.println("1 param val : "+param);
	
		memberDTO = memberService.retrieveAMember(param);
		
		System.out.println("2 param val : "+memberDTO.getPhone());
		System.out.println("userid val : "+userid);
		
		return memberDTO;
	}
}
