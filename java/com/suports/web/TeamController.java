package com.suports.web;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.suports.web.cmm.IFunction;
import com.suports.web.cmm.ISupplier;
import com.suports.web.cmm.Proxy;
import com.suports.web.domain.MemberDTO;
import com.suports.web.domain.TeamDTO;
import com.suports.web.mapper.TeamMapper;
import com.suports.web.service.MemberServiceImpl;
import com.suports.web.service.TeamServiceImpl;

@RestController
public class TeamController {
	private static final Logger logger = LoggerFactory.getLogger(TeamController.class);

	@Autowired TeamDTO teamDTO;
	@Autowired MemberDTO memberDTO;
	@Autowired TeamServiceImpl teamService;
	@Autowired MemberServiceImpl memberService;
	@Autowired Map<String, Object> map;
	@Autowired Proxy pxy;
	@Autowired TeamMapper teamMap;
	
	@Transactional
	@PostMapping("/teams")
	public Map<?,?> newTeam(@RequestBody TeamDTO team) {

		System.out.println("team create in ===="+team);
		
		teamService.addATeam(team);
		
		memberDTO.setMemberIndex(team.getCaptain());
		memberService.modifyAMemberTeamIndex(memberDTO);
		
		map.clear();
		map.put("msg","성공");
		
		return map;
	}
	@PutMapping("/teams/myteam/{userid}")
	public TeamDTO select(@RequestBody TeamDTO team, @PathVariable String userid){
		
		logger.info("===TEAM SELECT ==={}",team);
		
		return teamService.retrieveATeam(team);
	}
	
	@PutMapping("/teams/{userid}")
	public Map<?,?> updates(@RequestBody TeamDTO team, @PathVariable String userid) {

		logger.info("update param ={}========"+team);
		
		teamService.modifyATeam(team);
		
		map.clear();
		map.put("msg","성공");
		return map;
	}
	@Transactional
	@PutMapping("/teams/dissolve/{userid}")
	public Map<?,?> dissolve(@RequestBody TeamDTO team, @PathVariable String userid) {

		logger.info("dissolve param ={}========"+team);
		
		MemberDTO mem = new MemberDTO();
		mem.setTeamIndex(team.getTeamIndex());
		
		memberService.modifyAMemberTeamIndex(mem);
		teamService.removeATeam(team);
		
		map.clear();
		map.put("msg","성공");
		return map;
	}
	
//	team pagenation (dongjun)!
	@GetMapping("/teams/page/{page}")
	public Map<?,?> list(@PathVariable String page){
		System.out.println("team pagenation");
		map.clear();
		map.put("pageNum", page);
		map.put("pageSize", "12");
		map.put("blockSize", "5");
		ISupplier c = ()-> teamMap.countTeams();
		map.put("totalCount", c.get());
		pxy.carryOut(map);
		IFunction i = (Object o)-> teamMap.selectListOfTeams(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("team", ls);
		map.put("pxy", pxy);
		System.out.println(" ls team : "+ls.toString());
		return map;
	}
}
