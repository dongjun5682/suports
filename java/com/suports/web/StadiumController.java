package com.suports.web;


import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.suports.web.cmm.IFunction;
import com.suports.web.cmm.ISupplier;
import com.suports.web.cmm.Proxy;
import com.suports.web.domain.ChatBotDTO;
import com.suports.web.domain.StadiumDTO;
import com.suports.web.mapper.ChatBotMapper;
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
	@Autowired ChatBotMapper chaMap;
	
	
	@GetMapping("/stadiums/page/{page}")
	public Map<?,?> list(@PathVariable String page){
		map.clear();
		map.put("pageNum", page);
		map.put("pageSize", "8");
		map.put("blockSize", "5");
		ISupplier c = ()-> staMap.countStadium();
		map.put("totalCount", c.get());
		pxy.carryOut(map);
		IFunction i = (Object o)-> staMap.allStadium(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("ls", ls);
		map.put("pxy", pxy);
		return map;
	} 
	@GetMapping("/stadiums/search/{word}/{page}/{time}")
	public Map<?,?> search(	
			@PathVariable String word,	
			@PathVariable String page,
			@PathVariable String time) {
		logger.info("=======경기장 리스트 진입 ======");
		String search = word;
		map.clear();
		map.put("search", word);
		map.put("time", time);
		ISupplier c = ()-> staMap.countSearch(map);
		map.clear();
		map.put("search", search);
		map.put("pageNum", page);
		map.put("pageSize", "8");
		map.put("blockSize", "5");
		map.put("time",time);
		map.put("totalCount",c.get());
		pxy.search(map);
		IFunction i = (Object o)-> staMap.searchStadium(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("pxy", pxy);
		map.put("srch", ls);
		return map;
	}
	@GetMapping("/seoul/search/{search}/{page}")
	public Map<?,?> searchSeoul(	
			@PathVariable("search") String search,	
			@PathVariable("page") String page) {
		logger.info("=======서울 리스트 진입 ======");
		String se = search;
		ISupplier c = ()-> staMap.countSeoulSearch();
		map.clear();
		map.put("search", se);
		map.put("pageNum", page);
		map.put("pageSize", "8");
		map.put("blockSize", "5");
		map.put("totalCount",c.get());
		pxy.carryOut(map);
		IFunction i = (Object o)-> staMap.selectSeoulStadium(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("pxy", pxy);
		map.put("srch", ls);
		return map;
	}
	@GetMapping("/incheon/search/{search}/{page}")
	public Map<?,?> searchIncheon(	
			@PathVariable("search") String search,	
			@PathVariable("page") String page) {
		logger.info("=======인천 리스트 진입 ======");
		String se = search;
		ISupplier c = ()-> staMap.countSeoulSearch();
		map.clear();
		map.put("search", se);
		map.put("pageNum", page);
		map.put("pageSize", "8");
		map.put("blockSize", "5");
		map.put("totalCount",c.get());
		pxy.carryOut(map);
		IFunction i = (Object o)-> staMap.selectIncheonStadium(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("pxy", pxy);
		map.put("srch", ls);
		return map;
	}
	@GetMapping("/gyeonggi/search/{search}/{page}")
	public Map<?,?> searchGyeonggi(	
			@PathVariable("search") String search,	
			@PathVariable("page") String page) {
		String se = search;
		ISupplier c = ()-> staMap.countSeoulSearch();
		map.clear();
		map.put("search", se);
		map.put("pageNum", page);
		map.put("pageSize", "8");
		map.put("blockSize", "5");
		map.put("totalCount",c.get());
		pxy.carryOut(map);
		IFunction i = (Object o)-> staMap.selectGyeonggiStadium(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("pxy", pxy);
		map.put("srch", ls);
		return map;
	}
	@GetMapping("/stadiums")
	public Map<?,?> list(){
		ISupplier s = ()-> staMap.areaAllStadium();
		List<?> allStadium = (List<?>) s.get();
		map.clear();
		map.put("home", allStadium);
		return map;
	}	
	@GetMapping("/map")
	public Map<?,?> map_list(){
		map.clear();
		ISupplier c = ()-> staMap.countStadium();
		map.put("totalCount", c.get());
		IFunction i = (Object o)-> staMap.areaAllStadium();
		List<?> ls = (List<?>) i.apply(c);
		map.put("map_lo", ls);
		return map;
	}
	@GetMapping("/chatbot/value/{value}") 
	public Map<?,?> chat(@PathVariable String value){ 
		map.clear(); 
		String val = "%"+value+"%";
		ChatBotDTO chat = new ChatBotDTO();
		chat.setMsg(val);
		IFunction i = (Object o) -> chaMap.chatBot(chat);
		ChatBotDTO ch = (ChatBotDTO) i.apply(chat);
		map.put("value", ch);
		return map; 
		}
	
	
}
