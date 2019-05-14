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

import com.suports.web.domain.ImageDTO;
import com.suports.web.domain.MemberDTO;
import com.suports.web.mapper.MemberMapper;
import com.suports.web.service.MemberServiceImpl;

@RestController
public class MemmberController {
	public static final String MEMBER_PHOTO_PATH = "/Users/yirekim/suports/src/main/webapp/resources/img/members_photo//";
	private static final Logger logger = LoggerFactory.getLogger(MemmberController.class);

	@Autowired MemberDTO memberDTO;
	@Autowired ImageDTO imageDTO;
	@Autowired MemberServiceImpl memberService;
	@Autowired Map<String, Object> map;
	@Autowired Proxy pxy;
	@Autowired MemberMapper memberMapper;
	
	@GetMapping("/members/page/{page}/{teamIndex}")
	public Map<?,?> aTeamMemberlist(@PathVariable String page, @PathVariable int teamIndex) 
	{
		logger.info("1=========MEMBER ! LIST========={} and {}", page, teamIndex);
		
		MemberDTO mem = new MemberDTO();
		mem.setTeamIndex(teamIndex);

		map.clear();
		map.put("pageNum", page);
		map.put("teamIndex", teamIndex);
		map.put("pageSize", "12");
		map.put("blockSize", "5");
		ISupplier c = ()-> memberMapper.countATeamMembers(teamIndex);
		map.put("totalCount", c.get());
		pxy.carryOut(map);
		
		IFunction i = (Object o)-> memberMapper.selectListOfMembers(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		
		map.clear();
		map.put("members", ls);
		map.put("pxy", pxy);
		
		System.out.println(" ls members : "+ls.toString());
	
		return map;
	}
	
	@PutMapping("/members")
	public Map<?,?> signup(@RequestBody MemberDTO mem) {

		memberService.addAMember(mem);
		
		map.clear();
		map.put("msg", "SUCCESS");
		
		return map;
    }

	@PostMapping("/members/{userid}")
	public MemberDTO login(@RequestBody MemberDTO mem, @PathVariable String userid) {
		
		MemberDTO loginData = new MemberDTO();
		loginData = memberService.retrieveAMember(mem);
		
		logger.info("Login in mem = {}",loginData);
		
		return loginData;
	}
	
	@PutMapping("/members/{trigger}/{userid}")
	public Map<?,?> update(@RequestBody MemberDTO mem, @PathVariable String trigger, String userid) {

		logger.info("update param ==trigger={} ==userid={}",trigger, userid);
		
		switch (trigger) {
		case "update":
			memberService.modifyAMember(mem);
			break;
		case "disable":
			memberService.disableAMember(mem);
			break;
		case "enable":
			memberService.enableAMember(mem);
			break;
		default:
			
			break;
		}
		map.clear();
		map.put("msg","성공");
		
		return map;
	}
	
	@Transactional
	@PostMapping("/uploadImg/{userid}")
	public Map<?,?> fileUpload(MultipartHttpServletRequest request, @PathVariable String userid)throws Exception{
		logger.info("============== fileUpload(){}=================", "ENTER");
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
