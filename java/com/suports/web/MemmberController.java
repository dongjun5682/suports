package com.suports.web;


import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
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
	public Map<?,?> signup(@RequestBody MemberDTO param) {
		System.out.println(param);

		memberService.addAMember(param);
		
		map.clear();
		map.put("msg", "SUCCESS");
		
		System.out.println(param);
		
		return map;
	}
	
	@PostMapping("/members/{userid}")
	public MemberDTO login(@RequestBody MemberDTO param, @PathVariable String userid) {
		
		memberDTO = memberService.retrieveAMember(param);
		
		
		return memberDTO;
	
	
	}
	@PutMapping("/members/{userid}")
	public Map<?,?> update(@RequestBody MemberDTO param, @PathVariable String userid) {

		System.out.println("update param in ========="+param);

		memberService.modifyAMember(param);
		
		System.out.println("update param out ========="+param);
		
		return map;
	}
	
	@PostMapping("/members/uploadImg")
	public Map<?,?> fileupload(@RequestParam("file") MultipartFile file) throws Exception {
		
		System.out.println("===== file upload in =====");
		
		return map;
	}
}
