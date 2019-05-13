package com.suports.web;


import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

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
		logger.info("=======list  asdasd 진입 ======");
		System.out.println(page);
		map.clear();
		map.put("pageNum", page);
		map.put("pageSize", "12");
		map.put("blockSize", "5");
		ISupplier c = ()-> staMap.countStadium();
		map.put("totalCount", c.get());
		pxy.carryOut(map);
		IFunction i = (Object o)-> staMap.selectListStadium(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("ls", ls);
		map.put("pxy", pxy);
		System.out.println(ls.toString());
		return map;
	}
	@GetMapping("/stadiums/search/{search}/{page}")
	public Map<?,?> search(	
			@PathVariable("search") String search,	
			@PathVariable("page") String page) {
		logger.info("=======경기장 리스트 진입 ======");
		String se = search;
		System.out.println(search);
		ISupplier c = ()-> staMap.countSearch(se);
		map.clear();
		map.put("search", se);
		map.put("pageNum", page);
		map.put("pageSize", "12");
		map.put("blockSize", "5");
		map.put("totalCount",c.get());

		pxy.carryOut(map);
		IFunction i = (Object o)-> staMap.searchStadium(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("pxy", pxy);
		map.put("srch", ls);
		System.out.println(ls.toString());
		return map;
	}
	@GetMapping("/seoul/search/{search}/{page}")
	public Map<?,?> searchSeoul(	
			@PathVariable("search") String search,	
			@PathVariable("page") String page) {
		logger.info("=======서울 리스트 진입 ======");
		String se = search;
		System.out.println(search);
		ISupplier c = ()-> staMap.countSeoulSearch();
		map.clear();
		map.put("search", se);
		map.put("pageNum", page);
		map.put("pageSize", "12");
		map.put("blockSize", "5");
		map.put("totalCount",c.get());
		pxy.carryOut(map);
		IFunction i = (Object o)-> staMap.selectSeoulStadium(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("pxy", pxy);
		map.put("srch", ls);
		System.out.println(ls.toString());
		return map;
	}
	@GetMapping("/incheon/search/{search}/{page}")
	public Map<?,?> searchIncheon(	
			@PathVariable("search") String search,	
			@PathVariable("page") String page) {
		logger.info("=======인천 리스트 진입 ======");
		String se = search;
		System.out.println(search);
		ISupplier c = ()-> staMap.countSeoulSearch();
		map.clear();
		map.put("search", se);
		map.put("pageNum", page);
		map.put("pageSize", "12");
		map.put("blockSize", "5");
		map.put("totalCount",c.get());
		pxy.carryOut(map);
		IFunction i = (Object o)-> staMap.selectIncheonStadium(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("pxy", pxy);
		map.put("srch", ls);
		System.out.println(ls.toString());
		return map;
	}
	@GetMapping("/gyeonggi/search/{search}/{page}")
	public Map<?,?> searchGyeonggi(	
			@PathVariable("search") String search,	
			@PathVariable("page") String page) {
		logger.info("=======경기도 리스트 진입 ======");
		String se = search;
		System.out.println(search);
		ISupplier c = ()-> staMap.countSeoulSearch();
		map.clear();
		map.put("search", se);
		map.put("pageNum", page);
		map.put("pageSize", "12");
		map.put("blockSize", "5");
		map.put("totalCount",c.get());
		pxy.carryOut(map);
		IFunction i = (Object o)-> staMap.selectGyeonggiStadium(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("pxy", pxy);
		map.put("srch", ls);
		System.out.println(ls.toString());
		return map;
	}
	@GetMapping("/stadiums")
	public Map<?,?> list(){
		
		ISupplier s = ()-> staMap.selectAllStadium();
		List<?> allStadium = (List<?>) s.get();
		map.clear();
		System.out.println(allStadium.toString());
		map.put("home", allStadium);
		return map;
	}
	

	@GetMapping("/chatbot/value/{value}") 
	public Map<?,?> chat(@PathVariable String value){ 
		map.clear(); 
		String val = "%"+value+"%";
		System.out.println("여기탔다"+val);
		ChatBotDTO chat = new ChatBotDTO();
		chat.setMsg(val);
		IFunction i = (Object o) -> chaMap.Chatbot(chat);
		ChatBotDTO ch = (ChatBotDTO) i.apply(chat);
		map.put("value", ch);
		return map; 
		}
	/*
	 * @GetMapping("/chatbot/value/{list}") public Map<?,?> chat_list(@PathVariable
	 * String value){ map.clear(); String val = "%"+value+"%";
	 * System.out.println("여기탔다"+val); ChatBotDTO chat = new ChatBotDTO();
	 * chat.setMsg(val); IFunction i = (Object o) -> chaMap.Chatbot(chat);
	 * ChatBotDTO ch = (ChatBotDTO) i.apply(chat);
	 * System.out.println(i.apply(chat)); map.put("value", ch); return map; }
	 */
	
}
