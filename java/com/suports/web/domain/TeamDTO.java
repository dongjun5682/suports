package com.suports.web.domain;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component @Lazy
public class TeamDTO {
	private int teamIndex, tournamentIndex, captain;
	private String name, emblem, sport, sort, address, info, avgage, style;
}
