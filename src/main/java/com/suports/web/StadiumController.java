package com.suports.web;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.suports.web.domain.StadiumDTO;
import com.suports.web.service.StadiumService;
import com.suports.web.service.StadiumServiceImpl;

@RestController
public class StadiumController {
	
	private static final Logger logger = LoggerFactory.getLogger(StadiumController.class);
	
	@Autowired StadiumServiceImpl stdServie;
	@Autowired StadiumDTO stdDTO;
	
	@GetMapping("/stadiums")
	public String list(){
		logger.info("\n ===============stadium List=================");
		stdDTO = stdServie.retrieveStadiums();
		System.out.println(stdDTO.getStadium_Name());
		return stdDTO.getStadium_Name();
	}
}
