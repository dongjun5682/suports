package com.suports.web.service;

import java.util.List;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.suports.web.cmm.Proxy;
import com.suports.web.domain.BoardDTO;
import com.suports.web.domain.ImageDTO;
import com.suports.web.mapper.BoardMapper;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired BoardMapper boardMapper;

	@Override
	public void addABoard(BoardDTO board) {
		boardMapper.insertABoard(board);
		
	}

	@Override
	public void addABoardPhoto(ImageDTO img) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<?> retrieveListOfBoards(Proxy pxy) {
		return boardMapper.selectListOfBoards(pxy);
	}

	@Override
	public List<BoardDTO> retrieveSomeOfBoards(Map<?, ?> map) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> retrieveABoardPic(BoardDTO board) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BoardDTO retrieveABoard(BoardDTO board) {
		return boardMapper.selectABoard(board);
	}

	@Override
	public int countBoards() {
		return boardMapper.countBoards();
	}

	@Override
	public boolean existABoardNo(BoardDTO board) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void modifyABoard(BoardDTO board) {
		boardMapper.updateABoard(board);
		
	}

	@Override
	public void modifyABoardPhoto(BoardDTO board) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeABoard(BoardDTO board) {
		boardMapper.deleteABoard(board);
		
	}

	

	
}
