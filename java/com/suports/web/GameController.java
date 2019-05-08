package com.suports.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.suports.web.domain.GameDTO;
import com.suports.web.mapper.GameMapper;

@RestController
public class GameController {

	@Autowired GameDTO gameDTO;
	@Autowired Map<String,Object> map;
	@Autowired GameMapper gameMap;

	@GetMapping("/game/position/{stadiumIndex}")
	public Map<?,?> positionList(@PathVariable int stadiumIndex){
		System.out.println(stadiumIndex);
		IFunction i = (Object o)  -> gameMap.selectGame(stadiumIndex);
		List<?> list= (List<?>) i.apply(stadiumIndex);
		
		System.out.println(list.toString());
		map.clear();
		map.put("position",list);
		return map;
	}
}
