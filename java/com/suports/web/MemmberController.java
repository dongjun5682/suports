package com.suports.web;


import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.suports.web.domain.MemberDTO;
import com.suports.web.service.MemberServiceImpl;

@RestController
public class MemmberController {
	private static final Logger logger = LoggerFactory.getLogger(MemmberController.class);

	@Autowired MemberDTO memberDTO;
	@Autowired MemberServiceImpl memberService;
	@Autowired Map<String, Object> map;
	
	@PostMapping("/members")
	public Map<?,?> join(@RequestBody MemberDTO param) {

		memberService.addAMember(param);
		
		map.clear();
		map.put("msg", "SUCCESS");
		
		return map;
	}
	
	@PostMapping("/members/{userid}")
	public MemberDTO login(@RequestBody MemberDTO param, @PathVariable String userid) {
		
		System.out.println("1========="+memberDTO);
		
		memberDTO = memberService.retrieveAMember(param);
		
		System.out.println("2========="+memberDTO);
		System.out.println("3========="+param);
		
		return memberDTO;
	
	
	}
	
	@PostMapping("/members/uploadFile")
	public Map<?,?> fileupload(@RequestParam("file") MultipartFile file) throws Exception {
		
		return map;
	}
}
