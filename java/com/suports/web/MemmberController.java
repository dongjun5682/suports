package com.suports.web;

import java.io.File;
import java.util.Iterator;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.suports.web.cmm.IFunction;
import com.suports.web.cmm.ISupplier;
import com.suports.web.cmm.Proxy;
import com.suports.web.domain.ImageDTO;
import com.suports.web.domain.MemberDTO;
import com.suports.web.service.MemberServiceImpl;

@RestController
public class MemmberController {
	public static final String MEMBER_PHOTO_PATH = "/Users/yirekim/suports_sourcetree/src/main/webapp/resources/img/members_photo//";
	private static final Logger logger = LoggerFactory.getLogger(MemmberController.class);

	@Autowired MemberDTO memberDTO; // hum..
	@Autowired ImageDTO imageDTO;
	@Autowired MemberServiceImpl memberService;
	@Autowired Proxy pxy;
	@Autowired IFunction i;
	@Autowired ISupplier c;
	@Autowired Map<String, Object> map;
	
	@GetMapping("/members/details/{teamIndex}")
	public Map<?,?> detailList(@PathVariable int teamIndex) 
	{
		logger.info("===MEMBER DETAIL LIST=== and {}", teamIndex);
		
		memberDTO.setTeamIndex(teamIndex);

		map.clear();
		map.put("teamIndex", teamIndex);
		pxy.carryOut(map);
		
		i = (Object o)-> memberService.retrieveListOfMembers(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		
		map.clear();
		map.put("members", ls);
		
		return map;
	}
	@GetMapping("/members/page/{page}/{teamIndex}")
	public Map<?,?> list(@PathVariable String page, @PathVariable int teamIndex) 
	{
		logger.info("===MEMBER LIST==={} and {}", page, teamIndex);
		
		memberDTO.setTeamIndex(teamIndex);

		map.clear();
		c = ()-> memberService.countATeamMembers(teamIndex);
		map.put("pageNum", page);
		map.put("teamIndex", teamIndex);
		map.put("pageSize", "12");
		map.put("blockSize", "5");
		map.put("totalCount", c.get());
		pxy.carryOut(map);
		
		i = (Object o)-> memberService.retrieveListOfMembers(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		
		map.clear();
		map.put("members", ls);
		map.put("pxy", pxy);
		return map;
	}
	@GetMapping("/members/detail/{memberIndex}")
	public MemberDTO detail(@PathVariable int memberIndex) 
	{
		logger.info("===MEMBER Detail==={}", memberIndex);
		
		MemberDTO mem = new MemberDTO();
		mem.setMemberIndex(memberIndex);
		
		return memberService.retrieveAMemberDetail(mem);
	}
	@GetMapping("/members/{incase}/{searching}")
	public MemberDTO find(@PathVariable String incase, @PathVariable String searching) 
	{
		logger.info("===MEMBER FIND A MEMBER ==={},{}", incase, searching);
		
		MemberDTO mem = new MemberDTO();
	
		if(searching != null) {
			switch (incase) {
			case "name":
				mem.setName(searching);
				break;
			case "email":
				mem.setEmail(searching);
				break;
			case "phone":
				mem.setPhone(searching);
				break;
			default:
				
				break;
			}
		}
		System.out.println(memberService.retrieveAMemberDetail(mem).toString());
		return memberService.retrieveAMemberDetail(mem);

	}
	@PutMapping("/members")
	public Map<?,?> signup(@RequestBody MemberDTO mem) {

		memberService.addAMember(mem);
		
		map.clear();
		map.put("msg", "SUCCESS");
		
		return map;
    }

	@PutMapping("/members/login/{userid}")
	public MemberDTO login(@RequestBody MemberDTO mem, @PathVariable String userid)throws Exception {
		
		logger.info("===LOGIN DTO ==={}",mem);
		
		return memberService.retrieveAMember(mem);
	}
	
	@PutMapping("/members/{userid}")
	public Map<?,?> updates(@RequestBody MemberDTO mem, @PathVariable String userid) {

		logger.info("===UPDATE DTO ==={}",mem);
		
		memberService.modifyAMember(mem);
		map.clear();
		map.put("msg","성공");
		
		return map;
	}
	
	@Transactional
	@PostMapping("/uploadImg/{userid}")
	public Map<?,?> fileUpload(MultipartHttpServletRequest request, @PathVariable String userid)throws Exception{
		logger.info("=== FILE UPLOAD {}====", request);
		String result = "";
		Iterator<String> it = request.getFileNames();
		map.clear();
		if(it.hasNext()){
			MultipartFile file = request.getFile(it.next());
            logger.info("file upload result:{}", "success");
            logger.info("upload file name:{}", file.getName());
            logger.info("upload file size:{}", file.getSize());
            logger.info("upload file exist:{}", file.isEmpty());
            logger.info("upload file original name:{}", file.getOriginalFilename());
            logger.info("upload file:{}", file.getOriginalFilename());
            
            String filename = file.getOriginalFilename();
            map.put("filename", filename);
            File dest = new File(MEMBER_PHOTO_PATH + filename);
            file.transferTo(dest);
            result = "전송 완료";
            
            ImageDTO img = new ImageDTO();
            img.setImageName(filename);
            img.setImageOwner(userid);
            memberService.addAMemberPhoto(img);
            
            MemberDTO mem = new MemberDTO();
            mem.setId(userid);
            mem.setPhoto(filename);
            memberService.modifyAMemberPhoto(mem);
        }else{
            logger.info("file upload result: {}", "fail");
            result = "전송 실패";
        }
		
        map.put("result", result);
        return map;
	}
}
