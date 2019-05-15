package com.suports.web;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.suports.web.cmm.IFunction;
import com.suports.web.domain.MemberDTO;
import com.suports.web.domain.TeamDTO;
import com.suports.web.mapper.TeamMapper;
import com.suports.web.mapper.TournamentMapper;

@RestController
public class TournamentController {

	@Autowired Map<String, Object> map;
	@Autowired TeamMapper teamMap;
	@Autowired TournamentMapper tourMap;
	@Autowired MemberDTO memDTO;
	@Autowired TeamDTO teamDTO;
	
	
	@GetMapping("/tournament/{userid}")
	public TeamDTO tourApply(@PathVariable String userid){
	
		System.out.println(userid);
		memDTO = new MemberDTO();
		memDTO.setMemberIndex(Integer.parseInt(userid));
		IFunction i = (Object o)-> teamMap.selectTeam(memDTO);
		teamDTO = (TeamDTO) i.apply(memDTO);
		//동적 으로 숫자값 던지기
		return teamDTO;
	}
}
