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
import com.suports.web.domain.BoardDTO;
import com.suports.web.domain.ImageDTO;
import com.suports.web.service.BoardServiceImpl;
import com.suports.web.service.TransactionServiceImpl;

@RestController
public class BoardController {
	public static final String BOARD_PHOTO_PATH = "/Users/yirekim/suports_sourcetree/src/main/webapp/resources/img/board_photo//";
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

	@Autowired BoardDTO boardDTO;
	@Autowired ImageDTO imageDTO;
	@Autowired BoardServiceImpl boardService;
	@Autowired Proxy pxy;
	@Autowired IFunction i;
	@Autowired ISupplier c;
	@Autowired Map<String, Object> map;
	@Autowired TransactionServiceImpl tranService;
	
	@GetMapping("/boards/page/{page}")
	public Map<?,?> list(@PathVariable String page) 
	{
		logger.info("===BOARD LIST PARAM==={}", page);
		
		map.clear();
		c = ()-> boardService.countBoards();
		map.put("pageNum", page);
		map.put("pageSize", "12");
		map.put("blockSize", "5");
		map.put("totalCount", c.get());
		pxy.carryOutLimit(map);
		
		i = (Object o)-> boardService.retrieveListOfBoards(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		
		map.clear();
		map.put("board", ls);
		map.put("pxy", pxy);
		return map;
	}
	
	@GetMapping("/boards/article/{boardNo}")
	public BoardDTO read(@PathVariable int boardNo) 
	{
		logger.info("===BOARD READ PARAM==={}", boardNo);
		
		BoardDTO board = new BoardDTO();
		board.setBoardNo(boardNo);
		
		return boardService.retrieveABoard(board);
	}
	
	@PutMapping("/boards")
	public Map<?,?> write(@RequestBody BoardDTO board) {

		logger.info("===BOARD WRITE PARAM ==={}",board);
		
		boardService.addABoard(board);
		
		map.clear();
		map.put("msg", "SUCCESS");
		
		return map;
    }

	@PutMapping("/boards/{userid}")
	public Map<?,?> update(@RequestBody BoardDTO board, @PathVariable String userid) {

		logger.info("===BOARD UPDATE PARAM ==={}",board);
		map.clear();
		map.put("board", board);
		
		boardService.modifyABoard(board);
		map.put("msg","성공");
		return map;
	}
	
//	@Transactional
//	@PostMapping("/editorImg/{userid}")
//	public Map<?,?> fileUpload(MultipartHttpServletRequest request, @PathVariable String userid)throws Exception{
//		logger.info("=== FILE UPLOAD {}====", request);
//		String result = "";
//		Iterator<String> it = request.getFileNames();
//		map.clear();
//		if(it.hasNext()){
//			MultipartFile file = request.getFile(it.next());
//            logger.info("file upload result:{}", "success");
//            logger.info("upload file name:{}", file.getName());
//            logger.info("upload file size:{}", file.getSize());
//            logger.info("upload file exist:{}", file.isEmpty());
//            logger.info("upload file original name:{}", file.getOriginalFilename());
//            logger.info("upload file:{}", file.getOriginalFilename());
//            
//            String filename = file.getOriginalFilename();
//            map.put("filename", filename);
//            File dest = new File(BOARD_PHOTO_PATH + filename);
//            file.transferTo(dest);
//            result = "전송 완료";
//            
//            ImageDTO img = new ImageDTO();
//            img.setImageName(filename);
//            img.setImageOwner(userid);
//            boardService.addABoardPhoto(img);
//            
//        }else{
//            logger.info("file upload result: {}", "fail");
//            result = "전송 실패";
//        }
//		
//        map.put("result", result);
//        return map;
//	}
}
