package com.suports.web.service;

import java.util.List;

import java.util.Map;

import org.springframework.stereotype.Component;

import com.suports.web.cmm.Proxy;
import com.suports.web.domain.BoardDTO;
import com.suports.web.domain.ImageDTO;

@Component
public interface BoardService {

	// CREATE
	public void addABoard(BoardDTO board);
	public void addABoardPhoto(ImageDTO img);
	
	// READ
	public List<?> retrieveListOfBoards(Proxy pxy);
	public List<BoardDTO> retrieveSomeOfBoards(Map<?,?> map);
	public Map<String, Object> retrieveABoardPic(BoardDTO board);
	public BoardDTO retrieveABoard(BoardDTO board);
	public int countBoards();
	public boolean existABoardNo(BoardDTO board);
	
	// UPDATE
	public void modifyABoard(BoardDTO board);
	public void modifyABoardPhoto(BoardDTO board);
	
	// DELETE
	public void removeABoard(BoardDTO board);
}