package com.suports.web;


import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.suports.web.domain.StadiumDTO;
import com.suports.web.mapper.StadiumMapper;
import com.suports.web.service.StadiumServiceImpl;

@RestController
public class StadiumController {
	
	private static final Logger logger = LoggerFactory.getLogger(StadiumController.class);
	
	@Autowired StadiumServiceImpl stdServie;
	@Autowired StadiumDTO stdDTO;
	@Autowired Map<String,Object> map;
	@Autowired StadiumMapper staMap;
	@Autowired Proxy pxy;
	
	
	@GetMapping("/stadiums/page/{page}")
	public Map<?,?> list(@PathVariable String page){
		logger.info("=======list 진입 ======");
		//page_num.page_size,block_Size,totalCount
		map.clear();
		map.put("pageNum", page);
		map.put("pageSize", "9");
		map.put("blockSize", "3");
		ISupplier c = ()-> staMap.countStadium();
		map.put("totalCount", c.get());
		pxy.carryOut(map);
		IFunction i = (Object o)-> staMap.selectStadiumList(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("ls", ls);
		map.put("pxy", pxy);
		return map;
	}
	@GetMapping("/stadiums/search/{search}/{page}")
	public Map<?,?> search(	
			@PathVariable("search") String search,	
			@PathVariable("page") String page) {
		logger.info("=======경기장 리스트 진입 ======");
		String sa = "%"+search+"%";
		map.clear();
		map.put("search", sa);
		map.put("pageNum", page);
		map.put("pageSize", "9");
		map.put("blockSize", "3");
		map.put("totalCount", staMap.countStadium());
		pxy.carryOut(map);
		map.clear();
		map.put("pxy", pxy);
		map.put("srch", staMap.selectStadiumList(pxy));
		return map;
	}

	@GetMapping("/stadiums")
	public Map<?,?> list(){
		logger.info("=====홈 리스트 진입 ======");
		ISupplier s = ()-> staMap.selectAllStadium();
		List<?> allStadium = (List<?>) s.get();
		System.out.println(allStadium.toString());
		map.clear();
		map.put("home", allStadium);
		return map;
	}
}