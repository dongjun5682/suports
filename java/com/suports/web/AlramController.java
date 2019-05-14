package com.suports.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.suports.web.domain.AlramDTO;
import com.suports.web.mapper.AlramMapper;

@RestController
public class AlramController {
	
	@Autowired Map<String,Object> map;
	@Autowired AlramMapper alMap;
	@Autowired AlramDTO alDTO;
	@Autowired IFunction i;
	
	@GetMapping("alram/{memberIndex}")
	public Map<?, ?> message(@PathVariable int memberIndex){
		String mIndex = String.valueOf(memberIndex);
		i = (Object o) -> alMap.seletMemberAlram(mIndex);
		List<?> list =  (List<?>) i.apply(mIndex);
		map.clear();
		map.put("alram", list);
		System.out.println("alram : "+ list.toString());
		return map;
	}
}
