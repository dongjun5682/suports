package com.suports.web;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TimeController {
	
	@Autowired Map<String, Object> map;
	
	@GetMapping("/time/stadium/{stadiumIndex}")
	public Map<?, ?> timeStadium(@PathVariable String stadiumIndex){
		return map;
	}
}
