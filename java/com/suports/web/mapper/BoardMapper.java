package com.suports.web.mapper;

import com.suports.web.cmm.Proxy;
import com.suports.web.domain.BoardDTO;
import com.suports.web.domain.ImageDTO;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface BoardMapper {

	// CREATE
	public void insertABoard(BoardDTO board);
	public void insertABoardPhoto(ImageDTO img);

	// READ
	public List<?> selectListOfBoards(Proxy pxy);
	public List<BoardDTO> selectSomeOfBoards(Map<?, ?> map);
	public Map<String, Object> selectABoardPic(BoardDTO board);
	public BoardDTO selectABoard(BoardDTO board);
	public int countBoards();
	public boolean existABoardNo(BoardDTO board);
	
	// UPDATE
	public void updateABoard(BoardDTO board);
	public void updateABoardPhoto(BoardDTO board);

	// DELETE
	public void deleteABoard(BoardDTO board);
}
