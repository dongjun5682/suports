package com.suports.web.mapper;



import com.suports.web.domain.TournamentDTO;

import java.util.List;
import java.util.Map;

public interface TournamentMapper {

	// CREATE
	public void insertATournament(TournamentDTO tour);
	
	// READ
	public List<?> selectListOfTournaments(Map<?,?> map);
	public List<TournamentDTO> selectSomeOfTournaments(Map<?,?> map);
	public Map<String, Object> selectATournamentPic(TournamentDTO tour);
	public TournamentDTO selectATournament(TournamentDTO tour);
	public int countTournaments();
	public boolean existATournamentId(TournamentDTO tour);
	
	// UPDATE
	public void updateATournament(TournamentDTO tour);
	public Map<String, Object> selectProfile(Map<?,?> map);
	
	// DELETE
	public void deleteATournament(TournamentDTO tour);
}
