package com.suports.web;


import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.suports.web.domain.TeamDTO;
import com.suports.web.mapper.TeamMapper;
import com.suports.web.service.TeamServiceImpl;

@RestController
public class TeamController {
	private static final Logger logger = LoggerFactory.getLogger(TeamController.class);

	@Autowired TeamDTO teamDTO;
	@Autowired TeamServiceImpl teamService;
	@Autowired Map<String, Object> map;
	@Autowired ProxyTwo pxy;
	@Autowired TeamMapper teamMap;
	
	@PostMapping("/teams")
	public Map<?,?> createATeam(@RequestBody TeamDTO param) {

		System.out.println("team create in ===="+param);
		
		teamService.addATeam(param);
		
		map.clear();
		map.put("msg", "SUCCESS");
		
		return map;
	}
	
	@PostMapping("/teams/{userid}")
	public TeamDTO check(@RequestBody TeamDTO param, @PathVariable String userid) {
				
		return teamDTO;
	
	}
	
	@PostMapping("/teams/uploadFile")
	public Map<?,?> fileupload(@RequestParam("file") MultipartFile file) throws Exception {
		
		return map;
	}
	
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
