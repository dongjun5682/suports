package com.suports.web.service;

import java.util.List;

import java.util.Map;

import org.springframework.stereotype.Component;

import com.suports.web.domain.TournamentDTO;

@Component
public interface TournamentService {

	// CREATE
	public void addATournament(TournamentDTO tour);
	
	// READ
	public List<?> retrieveListOfTournaments(Map<?,?> map);
	public List<TournamentDTO> retrieveSomeOfTournaments(Map<?,?> map);
	public Map<String, Object> retrieveATournamentPic(TournamentDTO tour);
	public TournamentDTO retrieveATournament(TournamentDTO tour);
	public int countTournaments();
	public boolean existATournamentId(TournamentDTO tour);
	
	// modify
	public void modifyATournament(TournamentDTO tour);
	public Map<String, Object> retrieveProfile(Map<?,?> map);
	
	// remove
	public void removeATournament(TournamentDTO tour);
}