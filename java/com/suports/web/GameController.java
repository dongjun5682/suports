package com.suports.web;

import java.util.List;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.suports.web.cmm.IFunction;
import com.suports.web.domain.GameDTO;
import com.suports.web.mapper.GameMapper;

@RestController
public class GameController {

	@Autowired GameDTO gmDTO;
	@Autowired Map<String,Object> map;
	@Autowired GameMapper gameMap;

	@GetMapping("/game/position/{timeIndex}")
	public Map<?,?> positionList(@PathVariable String timeIndex){
		IFunction i = (Object o)  -> gameMap.selectGame(timeIndex);
		List<?> list= (List<?>) i.apply(timeIndex);
		System.out.println(list.toString());
		System.out.println(timeIndex);
		map.clear();
		map.put("position",list);
		return map;
	}
	
	@GetMapping("/game/overlap/{timeIndex}/{memberIndex}")
	public Map<?, ?> overlap(@PathVariable int timeIndex,
			@PathVariable int memberIndex) {
		gmDTO.setTimeIndex(timeIndex);
		IFunction i = (Object o) -> gameMap.selectOverlap(gmDTO);
		List<?> list = (List<?>) i.apply(gmDTO);
		map.clear();
		map.put("ac", list);
		return map;
	}
}
